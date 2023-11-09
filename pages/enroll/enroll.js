// pages/enroll/enroll.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading : false
  },

  chooseAvatar(){
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
    }).then(res=>{
      console.log(res)
      this.setData({
        avatar : res.tempFiles[0].tempFilePath
      })
    }).catch(err=>{
      console.log(err)
    })
  },

  enroll(res){
    console.log(res.detail.value)
    var account = ""
    // 获取用户输入内容
    var password = res.detail.value.password
    var passwordTwice = res.detail.value.passwordTwice
    var nickName = res.detail.value.nickName
    var avatar = this.data.avatar,
        cloudAvatar = "" 
    var time = new Date().toJSON()
    var that = this
    async function load(){
      await wx.showLoading({
        title: '数据提交中',
      })
      that.setData({
        loading : true
      })
      await wx.cloud.uploadFile({
        filePath : avatar,
        cloudPath : "userAvatar" + "/" + nickName + "/" + time
      }).then(res=>{
        console.log(res)
        cloudAvatar = res.fileID
      })
      //注册成功，生成未认证账号
      await db.collection("undefinedUser").count()
      .then(res=>{
        var num = res.total
        var zero = ""
        num = num.toString()
        if(num.length<4){
          for(var i = 1; i <= 4-num.length; i++){
            zero = zero + '0'
          }
        }
        account = '0' + zero + num
        console.log(account)
        that.setData({
          account : account
        })
        app.globalData.userInfo.account = account
      }).then(res=>{
        // 注册成功，向未认证库里添加新用户
        db.collection("undefinedUser").add({
          data:{
            password : password,
            hasIdentity : 0,
            nickName : nickName,
            account : account,
            avatar : cloudAvatar
          }
        }).then(res=>{
          var _id = res._id
          wx.showModal({
            title: '是否立即进行身份绑定',
            content: '身份绑定后解锁更多功能',
            success: function (res) {
              if (res.confirm) {//这里是点击了确定以后
                console.log('用户点击确定')
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
              } else {//这里是点击了取消以后
                console.log('用户点击取消')
                wx.navigateBack({
                  delta : 1,
                })
              }
            }
          })
        })
      }) 
      await wx.hideLoading()
      that.setData({
        loading : false
      })              
    }

    // 判断两次密码是否一致
    db.collection('undefinedUser').where({
      _openid : app.globalData.openid
    }).get().then(res=>{
      console.log(res,app.globalData.openid)
      if(res.data.length!=0){
        wx.showToast({
          title: '同一用户最多注册一个账号',
          icon : 'error',
          duration: 1000
        })
      }else{
        if(password!=passwordTwice){
          wx.showToast({
            title: '两次输入密码不一致',
            icon : 'error',
            duration: 1000
          })
        }else{
          db.collection("undefinedUser").where({
            nickName : nickName
          }).get().then(res=>{
            console.log(res)
            if(res.data.length!=0){
              wx.showToast({
                title: '该用户名已被占用',
                icon : 'error',
                duration: 1000
              })
            }else{
              var oriAvatar = "cloud://cloud1-5g9hej0jd2e2ade0.636c-cloud1-5g9hej0jd2e2ade0-1313474790/userAvatar/unRegistered/1.jpg"
              if(avatar!=oriAvatar){
                load()
              }else{
                wx.showToast({
                  title: '请选择头像',
                  icon : "error",
                  duration : 1000
                })
              }    
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
    this.setData({
      avatar : "cloud://cloud1-5g9hej0jd2e2ade0.636c-cloud1-5g9hej0jd2e2ade0-1313474790/userAvatar/unRegistered/1.jpg"
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