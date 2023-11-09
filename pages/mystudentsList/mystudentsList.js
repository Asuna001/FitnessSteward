const db = wx.cloud.database()
const app = getApp()
Page({
  data: {

  },
  onShow(){
    db.collection('coachesCompanyView').where({
      account : app.globalData.userInfo.account
    }).get().then(res=>{
      console.log(res)
      this.setData({
        class : res.data[0].class
      })
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
  onLoad(options) {
    
    
  },

  gotoDetail(res){
    var choose = res.currentTarget.dataset.choose
    wx.navigateTo({
      url: '/pages/mystudentsDetails/mystudentsDetails' ,
      success:(res)=>{
        res.eventChannel.emit("delivery",{
          data : choose
        })
      }
    })
   
  }
})