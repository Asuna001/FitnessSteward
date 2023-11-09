// pages/studentEnroll/studentEnroll.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account : '',
    loading : false
  },

  studentEnroll(res){
    var value = res.detail.value
    var studentName = value.studentName,
        studentGender = value.studentGender,
        studentAge = value.studentAge,
        studentWeight = value.studentWeight,
        parentPhone = value.parentPhone,
        parentVx = value.parentVx
    var num = [0,0,0,0],
        studentClass = 0,
        account = "",
        _id = this.data._id
    var that = this
    async function studentEnroll(){
      //防止用户多次点击
      await wx.showLoading({
        title: '注册中',
      })
      that.setData({
        loading : true
      })
      //  自动分班
      await db.collection("definedStudent").count()
      .then(res=>{
        console.log("count",res)
        var count = res.total + 1
        studentClass = count % 4
      }).then(res=>{
        db.collection("undefinedUser").doc(_id)
        .get().then(res=>{  
          //生成学生账号
          account = res.data.account 
          account = "1" + account.substring(1)
          console.log(account)
          //传入认证学生库
          db.collection("definedStudent").add({
            data:{
              studentName : studentName,
              studentGender : studentGender,
              studentAge : studentAge,
              studentWeight : studentWeight,
              parentPhone : parentPhone,
              parentVx : parentVx,
              account : account, 
              studentClass : studentClass,
              likes : 0
            }
          }).then(res=>{
            wx.showToast({
              title: '认证成功',
              icon : 'success',
              duration: 1000
            })
          })
          //回传ID到未认证信息库
          db.collection("undefinedUser").doc(_id).update({
            data:{
              account : account,
              hasIdentity : 1
            }
          }).then(res=>{
            console.log("success,",res)
            setTimeout(()=>
            {
              wx.navigateBack({
              delta: 3
              })
            }, 1000)
          }) 
        })
      })
      that.setData({
        loading : false
      })
      await wx.hideLoading()
    }   
    studentEnroll() 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 建立数据通道，获取当前用户ID
    const eventChannel = this.getOpenerEventChannel()
    // 监听'delivery'事件，并获取数据包
    eventChannel.on('delivery', userInfo => {
      console.log('on - delivery', userInfo)
      this.setData({
        _id : userInfo.data
      })
    })
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