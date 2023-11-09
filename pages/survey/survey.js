// pages/survey/survey.js
const db=wx.cloud.database();

Page({
submitForm:function(e){
  //获取表单数据
  const name=e.detail.value.name;
  const age=Number(e.detail.value.age);

  //向数据库中添加学生信息
  db.collection('student').add({
    data:{
      name:name,
      age:age
    },
    success:function(res){
      wx.showToast({
        title: '提交成功',
        icon:"success"
      });
    },
    fail:function(res){
      console.error(err);
      wx.showToast({
        title: '提交失败',
        icon:'none'
      });
    }
  });
},
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

  }
})