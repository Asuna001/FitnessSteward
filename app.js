
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    wx.cloud.init({
      traceUser:true,
    })
    this.globalData = {
      userInfo : {},
      hasUserInfo: false
    }
  },

  refreshScore: function () {
    const self = this;
    const db = wx.cloud.database();
    const coachesCollection = db.collection('coachesCompanyView');
    
    // 获取所有教练的信息
    let coaches = [];
    coachesCollection.get().then(res => {
      res.data.forEach(coach => {
        coaches.push(coach);
      });
      
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
                return parseFloat((num / companyCount).toFixed(2));
              });
              db.collection('coachesCompanyView').doc(coach._id).update({
                data: {
                  companyScore: companyScoreAverage
                } 
              }).then(res => {
                console.log('成功更新教练 ' + coach.name + ' 的公司评分为'+companyScoreAverage);
                
                // 更新页面数据
              }).catch(err => {
                console.error('更新企业评分失败：', err);
              });
            }
            
            if (parentCount > 0) { // 如果有家长评价，则更新家长评分
              const parentScoreAverage = parentScoreSum.map(function (num) {
                return parseFloat((num / parentCount).toFixed(2));
              });
              
              db.collection('coachesCompanyView').doc(coach._id).update({
                data: {
                  parentScore: parentScoreAverage
                }
              }).then(res => {
                console.log('成功更新教练 ' + coach.name + ' 的家长评分');
                
                // 更新页面数据
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
    });
  }
  
})