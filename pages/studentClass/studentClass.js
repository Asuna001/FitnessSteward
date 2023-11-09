// pages/studentClass/studentClass.js
const db = wx.cloud.database()
const app = getApp()
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
    db.collection('definedStudent').where({
      account : app.globalData.userInfo.account
    }).get().then(res=>{
      console.log(res)
      this.setData({
        class : res.data[0].studentClass
      })
    }).then(res=>{
      console.log("class",this.data.class)
      db.collection('definedStudent').where({
        studentClass : this.data.class
      }).get().then(res=>{
        console.log(res)
        this.setData({
          studentList : res.data 
        }) 
      })
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