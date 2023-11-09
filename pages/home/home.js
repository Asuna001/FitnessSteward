const db = wx.cloud.database()
const app = getApp()
Page({
    data: {
      
      //navigation bar's icon and text
      iconArray: [
            {
                "iconUrl": 'https://img.freepik.com/free-photo/sports-results_1098-15670.jpg?size=626&ext=jpg',
                "iconText": '教练'
            },
            {
                "iconUrl": 'https://img.freepik.com/free-photo/children-playing-grass_1098-504.jpg?size=626&ext=jpg',
                "iconText": '学员'
            },
            {
                "iconUrl": 'https://img.freepik.com/free-photo/two-confident-business-man-shaking-hands-during-meeting-office-success-dealing-greeting-partner-concept_1423-185.jpg?size=626&ext=jpg',
                "iconText": '企业'
            }
        ],


        

      

    },
  gotoCoach: function (options) {
      wx.navigateTo({
            url: '/pages/coach/coach',//要跳转到的页面路径
   })  
   },
  gotoStudent: function (options) {
    wx.navigateTo({
          url: '/pages/class_schedule/class_schedule',//要跳转到的页面路径
  })  
  },
  gotoShopping: function (options) {
  wx.navigateTo({
        url: '/pages/shopping/shopping',//要跳转到的页面路径
  })  
  },
  gotoDetecting: function (options) {
    wx.navigateTo({
          url: '/pages/detect/detect',//要跳转到的页面路径
    })  
    },
  gotoSearch: function (options) {
  wx.navigateTo({
        url: '/pages/search/search',//要跳转到的页面路径
  })  
  },
  gotoevent: function (options) {
  wx.navigateTo({
        url: '/pages/event_information/event_information',//要跳转到的页面路径
  })  
  },
  goStudentClass(){
    wx.navigateTo({
      url: '/pages/studentClass/studentClass',
    })
  },
  goChooseClass(){
    wx.navigateTo({
      url: '/pages/class_schedule/class_schedule',
    })
    // wx.showToast({
    //   title: '功能暂未开放',
    //   icon : 'error',
    //   duration: 1000
    // })
  },
  goStudentToCoach(){
    wx.navigateTo({
      url: '/pages/studentToCoach/studentToCoach',
    })
  },
  goCompanyToCoach(){
    wx.navigateTo({
      url: '/pages/companyToCoach/companyToCoach',
    })
  },
  addData:function(){
    wx.cloud.callFunction({
      name:'addData',
      data:{
        name :'张三',
        age:18
      },
      success:function(res){
        console.log(res)
        wx.showToast({
          title:'上传成功',
        })
      },
      fail:function(err){
        console.error (err)
          wx.showToast({
            title:'上传失败',
            icon:'none'
        })
      }
    })
  },
  gotoList:function(){
    wx.navigateTo({
      url: '/pages/dataList/dataList',
    })
  },
  gotoSurvey:function(){
  wx.navigateTo({
    url: '/pages/survey/survey',
  })
  },
  gotoaccess_coach: function (options) {
    wx.navigateTo({
          url: '/pages/access_coach/access_coach',//教练评价
 })  
 },
 gotomystudents :function (options) {
  wx.navigateTo({
        url: '/pages/mystudentsList/mystudentsList',//学生信息
})  
},

gotocompanyInformation :function (options) {
  wx.navigateTo({
        url: '/pages/companyInformation/companyInformation',//企业直通
})  
},

studentEnroll(){
  db.collection("undefinedUser").where({
    account : this.data.userInfo.account
  }).get().then(res=>{
    console.log(res)
    var _id = res.data[0]._id
    wx.navigateTo({
      url: '/pages/studentEnroll/studentEnroll',
      success: (res) => {
        // 跳转成功后，触发事件'delivery', 并可携带数据（即第一个参数是事件名，第二个参数是数据包）
        res.eventChannel.emit('delivery', {
            data: _id
          })
        }
    })
  })
},

coachEnroll(){
  db.collection("undefinedUser").where({
    account : this.data.userInfo.account
  }).get().then(res=>{
    console.log(res)
    var _id = res.data[0]._id
    wx.navigateTo({
      url: '/pages/coachEnroll/coachEnroll',
      success: (res) => {
        // 跳转成功后，触发事件'delivery', 并可携带数据（即第一个参数是事件名，第二个参数是数据包）
        res.eventChannel.emit('delivery', {
            data: _id
          })
        }
    })
  })
},

companyEnroll(){
  db.collection("undefinedUser").where({
    account : this.data.userInfo.account
  }).get().then(res=>{
    console.log(res)
    var _id = res.data[0]._id
    wx.navigateTo({
      url: '/pages/companyEnroll/companyEnroll',
      success: (res) => {
        // 跳转成功后，触发事件'delivery', 并可携带数据（即第一个参数是事件名，第二个参数是数据包）
        res.eventChannel.emit('delivery', {
            data: _id
          })
        }
    })
  })
},


  /**
   * 生命周期函数--监听页面显示
   */
   //教练身份认证弹窗
   certification:function(){
    wx.showModal({
      title: '请用户登录', //提示的标题
      content: '注意：登录成功后可以继续使用', //提示的内容
      success: function(res) {
        if(res.confirm) {
          console.log('用户点击了确定')
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } else if (res.cancel) {
          console.log('用户点击了取消')
        }
      }
    })
  
  },
  onShow() {
    db.collection("undefinedUser").count()
    .then(res=>{
      this.setData({
        msgList: [
          { url: 'url', title: "CEPF青少年应急避险体适能受众累计" + res.total.toString() + "人"},
          { url: "url", title: "恭喜第十四届跆拳道大赛在西安成功举行" },
          { url: "url", title: "祝贺苏炳添打破亚洲100米记录" }
        ],
        goodsList:[
          {
            goods_id:1,
            goods_title:'CEPF专项教练员培训',
            goods_img:'https://avatars.mds.yandex.net/i?id=efee91cbd3e52a3c64caed43124196d614add1cb-8389306-images-thumbs&n=13',
          },{
            goods_id:1,
            goods_title:'游泳教练员培训',
            goods_img:'https://th.bing.com/th/id/OIP.hVp6A_euqY4aY8loPyXVaQHaEo?w=280&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
          }
        ],
        
      })
      
    })
    console.log(app.globalData)
    this.setData({
      userInfo : app.globalData.userInfo,
      hasUserInfo : app.globalData.hasUserInfo
    })
  },

  async onLoad() {
     await wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  })
  