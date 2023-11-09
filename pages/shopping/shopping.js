// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://m.qpic.cn/psc?/V50qjiew0VVd8v0fo3Yq0aCdZG2mFv8m/ruAMsa53pVQWN7FLK88i5vUoikW2B5oTvIGhPAKfCS7y5SVP5*NhDzRHCLLt7IlFpuH203LadaG*EnLAQpf9gQDpjE8u*wN.GeBOL10jlHk!/mnull&bo=YAlABmAJQAYBByA!&rf=photolist&t=5',
      'https://m.qpic.cn/psc?/V50qjiew0VVd8v0fo3Yq0aCdZG2mFv8m/ruAMsa53pVQWN7FLK88i5qqJFv66epEo6w2lYEM*3V*6QrHgn7L.8bBMsCY9oo0cLVleqiFe3nyPlpqoFA7YYaeDq4hqQgrilSPfhzv7JLI!/mnull&bo=YAlABmAJQAYBByA!&rf=photolist&t=5',
      'https://m.qpic.cn/psc?/V50qjiew0VVd8v0fo3Yq0aCdZG2mFv8m/ruAMsa53pVQWN7FLK88i5qqJFv66epEo6w2lYEM*3V*p.XkNhOl9oiNCxKEiG0AgOawc8puAuX7ktdGPS70WLCbKfm9qo21sejH9hTGqTv8!/mnull&bo=YwlABmMJQAYBByA!&rf=photolist&t=5'
    ],
    iconArray: [
      {
          "iconUrl": 'https://m.qpic.cn/psc?/V50qjiew0VVd8v0fo3Yq0aCdZG2mFv8m/ruAMsa53pVQWN7FLK88i5jE2bEfzr58nchkCdQfpv34RQOK*L.vU27*nyQAa4obs8lBfWDmrrm5ejdKWRC2fwcxuKkWOhV.0a.3*Hfng9x8!/mnull&bo=QABAAEAAQAADByI!&rf=photolist&t=5',
          "iconText": '跑步'
      },
      {
          "iconUrl": 'https://m.qpic.cn/psc?/V50qjiew0VVd8v0fo3Yq0aCdZG2mFv8m/ruAMsa53pVQWN7FLK88i5jE2bEfzr58nchkCdQfpv36wrbmmDt.8QcG9*AakANnG6yzCsDdR5mjxj97hTcFbORAarcMarZ0Qoz*0LNMoEzs!/mnull&bo=QABAAEAAQAADByI!&rf=photolist&t=5',
          "iconText": '登山'
      },
      {
          "iconUrl": 'https://m.qpic.cn/psc?/V50qjiew0VVd8v0fo3Yq0aCdZG2mFv8m/ruAMsa53pVQWN7FLK88i5lfUGiGx5b2ubi91ZkyO06gjjIWoL.t2z99jvPcyRHpbN.zkV2k2p5K16CqpgyBibVPciUz5WQrmS2smeBSUQWI!/mnull&bo=QABAAEAAQAADByI!&rf=photolist&t=5',
          "iconText": '篮球'
      },
      {
          "iconUrl": 'https://m.qpic.cn/psc?/V50qjiew0VVd8v0fo3Yq0aCdZG2mFv8m/ruAMsa53pVQWN7FLK88i5lfUGiGx5b2ubi91ZkyO06jciBJ7k2kEp8J5MZVsI6xhBRAiJ7Dp*TwOrHIItHlPhDwEba4xrYhOPuF3yTpX0fA!/mnull&bo=QABAAEAAQAADByI!&rf=photolist&t=5',
          "iconText": '亲子'
      }
  ],
  },

  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
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