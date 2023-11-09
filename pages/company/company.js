// 引入云开发SDK
const db = wx.cloud.database()


Page({
    /**
     * 页面的初始数据
     */
    data: {
      coach: {},
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getCoachInfo(options.id);
    },
  
    /**
     * 获取教练信息
     */
    getCoachInfo: function (id) {
// 查询coachesCompanyView集合中的所有文档数据
db.collection('coachesCompanyView').get().then(res => {
  this.setData({
    coaches: res.data // 将查询到的教练信息存放到data中的数组中
          });
        });
    },
  
    /**
     * 刷新教练评分按钮点击事件处理函数
     */
    refreshScore: function () {
    const self = this;
    // 获取所有教练的信息
    const coaches = this.data.coaches;
    
    // 遍历每个教练
    coaches.forEach(function (coach) {
      const coachId = coach.account; // 获取当前教练的 ID
      
      // 查询 evaluate 数据集中与当前教练 ID 相同的数据
      db.collection('evaluate').where({
        coachId: coachId,
      }).get().then(res => {
        const evaluateData = res.data;
        
        if (evaluateData.length > 0) { // 如果存在评价数据，则进行计算并更新
          const companyScoreSum = [0, 0, 0]; // 保存企业评分之和（三个维度）
          const parentScoreSum = [0, 0, 0]; // 保存家长评分之和（三个维度）
          let companyCount = 0; // 企业评价数
          let parentCount = 0; // 家长评价数
          
          // 计算评分之和及评价数量
          evaluateData.forEach(function (eData) {
            const source = eData.source;
            const score = eData.score;
            
            if (source === 1) { // 企业评价
              for (let i = 0; i < 3; i++) {
                companyScoreSum[i] += score[i];
              }
              companyCount++;
            } else if (source === 0) { // 家长评价
              for (let i = 0; i < 3; i++) {
                parentScoreSum[i] += score[i];
              }
              parentCount++;
            }
          });
          
          // 更新评分
          if (companyCount > 0) { // 如果有企业评价，则更新公司评分
            const companyScoreAverage = companyScoreSum.map(function (num) {
              return num / companyCount;
            });
            
            db.collection('coachesCompanyView').doc(coach._id).update({
              data: {
                companyScore: companyScoreAverage
              }
            }).then(res => {
              console.log('成功更新教练 ' + coach.name + ' 的公司评分');
                  // 更新页面数据
    self.setData({
      coaches: coaches
    });
            }).catch(err => {
              console.error('更新企业评分失败：', err);
            });
          }
          
          if (parentCount > 0) { // 如果有家长评价，则更新家长评分
            const parentScoreAverage = parentScoreSum.map(function (num) {
              return num / parentCount;
            });
            
            db.collection('coachesCompanyView').doc(coach._id).update({
              data: {
                parentScore: parentScoreAverage
              }
            }).then(res => {
              console.log('成功更新教练 ' + coach.name + ' 的家长评分');
                  // 更新页面数据
    self.setData({
      coaches: coaches
    });
            }).catch(err => {
              console.error('更新家长评分失败：', err);
            });
          }
        } else {
          console.warn('教练 ' + coach.name + ' 暂无评价数据');
        }
      }).catch(err => {
        console.error('查询 evaluate 集合失败：', err);
      });
    });
  }
  
  });
  
  
