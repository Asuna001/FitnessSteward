// pages/changePassword/changePassword.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  changePassword(res){
    var value = res.detail.value
    var account = app.globalData.userInfo.account
    var _id , password
    db.collection("undefinedUser").where({
        account : account
    }).get().then(res=>{
      _id = res.data[0]._id
      password = res.data[0].password
      if(value.first==value.second&&value.old==password){
        db.collection("undefinedUser").doc(_id).update({
          data:{
            password : value.first
          }
        }).then(res=>{
          console.log("success",res)
          wx.showToast({
            title: '修改成功',
            icon : 'success',
            duration: 1000
          })
        })
      }else{
        wx.showToast({
          title: '输入有误',
          icon : 'error',
          duration: 1000
        })
      } 
    })
    
    
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

  }
})