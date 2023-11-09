const db = wx.cloud.database()
const app = getApp()
var student_likes 
Page({
  data: {
    student_likes : -1
  },
  
  // onShow: function(options){
  //   if(this.data.student_likes!=-1){
  //     this.setData({
  //       studentInfo : studentInfo.data,
  //       student_likes : studentInfo.data.likes
  //     })
  //   }
    
  // },

  onLoad: function(options) {
    // 获取id参数，并根据id从后端服务器获取学员信息
    const eventChannel = this.getOpenerEventChannel()
    // 监听'delivery'事件，并获取数据包
    eventChannel.on('delivery', studentInfo => {
      console.log('on - delivery', studentInfo)
      this.setData({
        studentInfo : studentInfo.data,
        student_likes : studentInfo.data.likes
      })
    })
    
  },

  likeStudent: function() {
    // 点赞逻辑，将点赞数加一并更新到后端服务器
    

    db.collection('definedStudent').doc(
      this.data.studentInfo._id
      ).get().then(res=>{
//console.log(res)
//console.log(account)
      this.setData({
        student_likes:res.data.likes+1,
      }) 
      db.collection('definedStudent').doc(
        this.data.studentInfo._id
        ).update({
        // data 字段表示需新增的 JSON 数据
        data: {
         likes:this.data.student_likes
        }
      })
      .then(res => {
        //成功的处理
        console.log(res)
      }).catch(err => {
        //失败的处理
      })
    })
   
    
  }
})