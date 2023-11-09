// pages/login/login.js
const db = wx.cloud.database()
const app = getApp()
// const _ = wx.cloud.command()
var tempdata = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //showPop: true
  },

  login(res){
    console.log(res.detail.value)
    // 获取用户输入
    var password = res.detail.value.password
    var nickName = res.detail.value.nickName
    db.collection("undefinedUser").where({
      nickName : nickName
    }).get().then(res=>{
      console.log(res)
      // 判断账号是否存在
      if(res.data.length==0){
        wx.showToast({
          title: '请先注册',
          icon : 'error',
          duration: 1000
        })
      }else{
        if(res.data[0].password==password){
          wx.showToast({
            title: '登陆成功',
            icon : 'success',
            duration: 1000
          })
          // 同步用户登录信息到全局
          app.globalData.userInfo.hasIdentity = res.data[0].hasIdentity
          app.globalData.userInfo.nickName = res.data[0].nickName
          app.globalData.userInfo.account = res.data[0].account
          app.globalData.userInfo.avatar = res.data[0].avatar
          app.globalData.hasUserInfo = true
          console.log(app.globalData.userInfo.hasIdentity,app.globalData.userInfo.nickName,app.globalData.userInfo.account)
          wx.navigateBack({
            delta: 1,
          })
        }else{
          wx.showToast({
            title: '账号或密码错误',
            icon : 'error',
            duration: 1000
          })
        }
      }
    })
  },
  enroll(){
    wx.navigateTo({
      url: '/pages/enroll/enroll',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

 
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  // async onLoad() {
  //   const privacySettingRes = await this.getPrivacySetting();
  //   console.log("privacySettingRes :>> ", privacySettingRes);
  //   this.setData({
  //     showPop: privacySettingRes.needAuthorization,
  //   });
  // },

  // /**
  //  * 按钮点击回调
  //  */
  // popBtnTap(res) {
  //   console.log("授权结果返回数据 :>> ", res);
  //   console.log("授权结果 :>> ", res.detail);
  //   if (res.detail.result) {
  //     wx.showToast({
  //       title: "同意授权",
  //       icon: "success",
  //     });
  //   } else {
  //     wx.showToast({
  //       title: "拒绝授权",
  //       icon: "error",
  //     });
  //   }
  // },

  // /**
  //  * 获取隐私协议授权信息
  //  * @returns {object} {needAuthorization: true/false, privacyContractName: '《xxx隐私保护指引》'}
  //  */
  // getPrivacySetting() {
  //   const res = {
  //     needAuthorization: false,
  //     privacyContractName: "基础库过低，不需要授权",
  //   };
  //   if (!wx.getPrivacySetting) return res;
  //   return new Promise((resolve, reject) => {
  //     wx.getPrivacySetting({
  //       success(res) {
  //         resolve(res);
  //       },
  //       fail(err) {
  //         reject(err);
  //       },
  //     });
  //   });
  // },
  

  async onLoad() {
    await db.collection("temp").add({
      data : {
        temp : 'temp'
      }
    }).then(res=>{
      console.log(res)
      var _id = res._id
      db.collection("temp").doc(_id).get()
      .then(res=>{
        console.log(res)
        app.globalData.openid = res.data._openid
        db.collection("temp").doc(_id).remove()
        .then(res=>{
          console.log(res)
        })
      })
    })
    //wx.openPrivacyContract()
    wx.getPrivacySetting({
      success: res=> {
        console.log(res)
        //用户同意过就不需要再次同意了
        if (res.needAuthorization){ //!需要去掉
          this.setData({
            showPrivacy: true
          })
        }
      }
    })
  },
  handleOpenPrivacyContract() {
    // 打开隐私协议页面
    wx.openPrivacyContract({
      
    })
  },
  disagree(){
   wx.navigateBack()
  },
  handleAgreePrivacyAuthorization() {
    // 用户同意隐私协议事件回调
    this.setData({
      showPrivacy : false
    })
  },
})