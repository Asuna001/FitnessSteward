const app=getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    coach: {},
    attitudeScore: 0,
    professionalSkillScore: 0,
    serviceQualityScore: 0
  },

/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    db.collection("coachesCompanyView")
      .doc(options.id)
      .get()
      .then((res) => {
        this.setData({
          coach: res.data,
        });
      });
  },

  onPullDownRefresh() {
    app.refreshScore();
},

/**
   * 评价教练
   */
  evaluateCoach: function () {
    const db = wx.cloud.database();
    db.collection("evaluate")
      .add({
        data: {
          coachId: this.data.coach.account,
          source: 1,
          score: [
            this.data.attitudeScore*10,
            this.data.professionalSkillScore*10,
            this.data.serviceQualityScore*10
          ]
        },
        success: (res) => {
          wx.showToast({
            title: '评价成功',
            icon: 'success',
            duration: 2000
          });
          app.refreshScore();
          wx.showToast({
            title: '评价、更新数据成功',
            icon: 'success',
            duration: 2000
          });
 
        },
        fail: (err) => {
          console.error(err);
          wx.showToast({
            title: '评价失败',
            icon: 'none',
            duration: 2000
          });
        },

      });
 
      wx.navigateBack({
        delta: 1
      })
  },

  reloadCurrentPage: function() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    currentPage.onLoad(currentPage.options);
  },

/**
   * 更新态度分数
   */
  updateAttitudeScore: function (e) {
    this.setData({
      attitudeScore: e.detail.value
    });
  },

/**
   * 更新专业技能分数
   */
  updateProfessionalSkillScore: function (e) {
    this.setData({
      professionalSkillScore: e.detail.value
    });
  },

/**
   * 更新服务质量分数
   */
  updateServiceQualityScore: function (e) {
    this.setData({
      serviceQualityScore: e.detail.value
    });
  }
});