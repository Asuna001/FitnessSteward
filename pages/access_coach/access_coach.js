import wxCharts from '../../API/wxcharts.js'
const db = wx.cloud.database()//初始化(调用获取默认环境的数据库的引用)
const app = getApp()
// 直接引用
Page({
data:{
  
},

onLoad(){
  var company_score=[0,0,0]
  var parent_score=[0,0,0]
   db.collection('coachesCompanyView').where({
    account : app.globalData.userInfo.account
  }).get().then(res=>{
    console.log(app.globalData.userInfo.account)
    console.log(res)
    this.setData({
      company_score:res.data[0].companyScore,
      parent_score:res.data[0].parentScore,
      message_parent0:res.data[0].parentScore[0],
      message_parent1:res.data[0].parentScore[1],
      message_parent2:res.data[0].parentScore[2],
      message_company0:res.data[0].companyScore[0],
      message_company1:res.data[0].companyScore[1],
      message_company2:res.data[0].companyScore[2]

      

    }) 
    
    new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['态度', '专业技能', '服务质量'],
      series: [{
          name: '家长评价得分',
          color:'#458B00',
          //data:this.data.parent_score
          data:[30,40,50]
      }],
      width: 320,
      height: 200,
      extra: {
          radar: {
              max: 100,
              
          }
      }
    });
   new wxCharts({
    canvasId: 'radarCanvas2',
    type: 'radar',
    categories: ['态度', '专业技能', '服务质量'],
    series: [{
        name: '企业评价得分',
       //data:this.data.
       color:'#458B00',
       data:[30,40,50]
  
    }],
    width: 320,
    height: 200,
    extra: {
        radar: {
            max: 100,
            gridcolor:'#EEC900'
          }
        }
      });
    })
  }
})

