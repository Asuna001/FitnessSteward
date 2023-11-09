// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo : {
      data:false
    },
    mode: ['我的订单','服务评价','会员权益','我的报名','线上咨询','设置']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },

  preview(){
    wx.previewImage({
      urls: [this.data.avatar]
    }).then(res=>{
      console.log("预览成功",res)
    }).catch(err=>{
      console.log("预览失败",err)
    })
  },

  login(){
    console.log('login')
     wx.navigateTo({
       url: '/pages/login/login',
     }) 

  },
  
  set(){
    if(this.data.hasUserInfo==true){
      wx.navigateTo({
        url: '/pages/set/set',
        // success: function(res) {
        //   // 通过eventChannel向被打开页面传送数据
        //   // res.eventChannel.emit('userName',tempdata)
        //   // res.eventChannel.emit('delivery', {
        //   //   data: account
        //   // })
        // }
      })
    }else{
      wx.showToast({
        title: '请先登陆',
        icon : 'error',
        duration: 1000
      })
    }
      
  },
  
  order:function (){
    //订单
    wx.navigateTo({url: "/pages/studentShow/studentShow"})
  },
  keep:function () {
    //收藏
  },
  share:function (){
    //分享
  },
  manager(){
    if(app.globalData.userInfo.nickName==10086){
      wx.navigateTo({
      url: '/pages/manager/manager',
      })
    }
  },

  quit(){
    var that = this
    wx.showActionSheet({
      itemList: ['退出登陆'],
      success: function (res) {
        if (res.tapIndex==0) {
          app.globalData.hasUserInfo = false
        }
        that.setData({
          hasUserInfo : app.globalData.hasUserInfo
        })
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
    this.setData({
      hasUserInfo : app.globalData.hasUserInfo,
    })
    if(app.globalData.hasUserInfo){
      this.setData({
        userName : app.globalData.userInfo.nickName,
        avatar : app.globalData.userInfo.avatar
      })
    }else{
      this.setData({
        userName : "游客",
        avatar : "cloud://cloud1-5g9hej0jd2e2ade0.636c-cloud1-5g9hej0jd2e2ade0-1313474790/userAvatar/unRegistered/1.jpg"
      })
    }
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