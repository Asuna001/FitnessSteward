// pages/set/set.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id : ""
  },
  identityEnroll(){
    var _id = this.data._id
    wx.showActionSheet({
      itemList: ['家长', '教练', '企业'],
      success(res){
        if (res.tapIndex==0){
          console.log(res.tapIndex)
          // 前往学生注册页面
          wx.navigateTo({
            url: '/pages/studentEnroll/studentEnroll',
            success: (res) => {
              // 跳转成功后，触发事件'delivery', 并可携带数据（即第一个参数是事件名，第二个参数是数据包）
              res.eventChannel.emit('delivery', {
                  data: _id
                })
              }
          })
        }else if(res.tapIndex==1){
          console.log(res.tapIndex)
          // 前往教练注册页面
          wx.navigateTo({
            url: '/pages/coachEnroll/coachEnroll',
            success: (res) => {
              // 跳转成功后，触发事件'delivery', 并可携带数据（即第一个参数是事件名，第二个参数是数据包）
              res.eventChannel.emit('delivery', {
                  data: _id
                })
              }
          })
        }else if(res.tapIndex==2){
          console.log(res.tapIndex)
          // 前往企业注册界面
          wx.navigateTo({
            url: '/pages/companyEnroll/companyEnroll',
            success: (res) => {
              // 跳转成功后，触发事件'delivery', 并可携带数据（即第一个参数是事件名，第二个参数是数据包）
              res.eventChannel.emit('delivery', {
                  data: _id
                })
              }
          })
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(app.globalData.userInfo.nickName)
    //获取用户状态
    db.collection("undefinedUser").where({
      nickName : app.globalData.userInfo.nickName
    }).get().then(res=>{
      // 判断是否提供信息绑定接口
      if(res.data[0].hasIdentity != 0){
        this.setData({
          definedStatus : true
        })
      }else{
        this.setData({
          definedStatus : false,
          //获取用户ID
          _id : res.data[0]._id
        })
      }
    })


  },

  changePassword(){
    wx.navigateTo({
      url: '/pages/changePassword/changePassword',
    })
  },

  quitAccount(){
    let nickName = app.globalData.userInfo.nickName
    let account = app.globalData.userInfo.account
    let hasIdentity = app.globalData.userInfo.hasIdentity
    wx.showModal({
      title: '提示',
      content: '确定要注销账号'+nickName+"吗",
      success(res) {
        if (res.confirm) {
          console.log('用户点击了确定')
          if(hasIdentity==1){
            db.collection("definedStudent").where({
              account : account
            }).remove().then(res=>{
              console.log(res)
            })
          }else if(hasIdentity==2){
            db.collection("coachesCompanyView").where({
              account : account
            }).remove().then(res=>{
              console.log(res)
            })
          }else if(hasIdentity==3){
            db.collection("definedCompany").where({
              account : account
            }).remove().then(res=>{
              console.log(res)
            })
          }else if(hasIdentity==4){
            db.collection("unauditedCoach").where({
              account : account
            }).remove().then(res=>{
              console.log(res)
            })
          }else if(hasIdentity==5){
            db.collection("unauditedCompany").where({
              account : account
            }).remove().then(res=>{
              console.log(res)
            })
          }
          db.collection("undefinedUser").where({
            account : account
          }).get().then(res=>{
            console.log(res)
            var _id = res.data[0]._id
            db.collection("undefinedUser").doc(_id)
            .update({
              data:{
                nickName : "delete",
                hasIdentity : 0 ,
                passWord : "delete",
              }
            }).then(res=>{
              console.log(res)
              app.globalData.hasUserInfo = false
              wx.navigateBack()
            })
            
          })   
            
        } else if (res.cancel) {
          console.log('用户点击了取消')
        }
      }
    })    
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
    console.log(app.globalData)
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

  }
})