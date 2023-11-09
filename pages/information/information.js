// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
 GotoInformationinner (){//进入咨询页面
    wx.navigateTo({url: "/pages/information_inner/information_inner"})
  },
  GotoInformationinner2 (){//进入咨询页面
    wx.navigateTo({url: "/pages/information_inner2/information_inner2"})
  },
 gotoevent: function (options) {
    wx.navigateTo({
          url: '/pages/event_information/event_information',//要跳转到的页面路径
  })  
  },
  gotoShopping: function (options) {
    wx.navigateTo({
          url: '/pages/shopping/shopping',//要跳转到的页面路径
  })  
  },
})