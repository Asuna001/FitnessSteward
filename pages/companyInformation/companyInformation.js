// pages/companyInformation/companyInformation.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    unauditedCompany: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        this.getCompanyInfo(options.id);
},
  getCompanyInfo: function () {
  // 查询coachesCompanyView集合中的所有文档数据
  db.collection('definedCompany').get().then(res => {
    this.setData({
      unauditedCompany: res.data // 将查询到的企业信息存放到data中的数组中
            });
          });
      },
  // goToDetailPage(event) {
  //   const companyId = event.currentTarget.dataset._id
  //   wx.navigateTo({
  //     url: `/pages/companyInformationDetail/companyInformationDetail?id=${companyId}`
  //   })
  // },

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