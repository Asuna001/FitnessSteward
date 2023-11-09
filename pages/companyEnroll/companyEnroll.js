// pages/companyEnroll/companyEnroll.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyName: '',
    companyContact: '',
    companyLogoUrl: '',
    companyProfile: '',
    account: '',
  },

  // 监听输入框输入事件
  inputCompanyName(event) {
    this.setData({
      companyName: event.detail.value
    })
  },
  
  inputCompanyContact(event) {
    this.setData({
      companyContact: event.detail.value
    })
  },
  
  inputCompanyProfile(event) {
    this.setData({
      companyProfile: event.detail.value
    })
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 建立数据通道
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

  },

 // 监听输入框输入事件
 inputCompanyName(event) {
  this.setData({
    companyName: event.detail.value
  })
},

inputCompanyContact(event) {
  this.setData({
    companyContact: event.detail.value
  })
},

inputCompanyProfile(event) {
  this.setData({
    companyProfile: event.detail.value
  })
},

// 选择头像
chooseImage() {
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePaths = res.tempFilePaths
      this.uploadImage(tempFilePaths[0])
    }
  })
},

// 上传头像并获取图片链接
uploadImage(tempFilePath) {
  wx.cloud.uploadFile({
    cloudPath: `company-logo/${Date.now()}-${Math.floor(Math.random() * 10000000)}.png`,
    filePath: tempFilePath,
    success: (res) => {
        // 获取上传成功后的文件 ID 和 URL
        const imageUrl = res.fileID

        this.setData({
          companyLogoUrl: imageUrl
        })
        wx.hideLoading()
        wx.showToast({
          title: '上传成功', 
        })       
    },
    fail: (err) => {
      console.error('[上传文件] 失败：', err)
      wx.hideLoading()
      wx.showToast({
        icon: 'none',
        title: '上传失败',
      })
    }
  })
},

// 提交表单
submitForm() {
  var _id=this.data._id
  var companyName=this.data.companyName
  var companyLogoUrl=this.data.companyLogoUrl
  var companyProfile=this.data.companyProfile
  var companyContact=this.data.companyContact
  var account=this.data.account 
  if (!this.data.companyName || !this.data.companyContact || !this.data.companyLogoUrl || !this.data.companyProfile) {
    wx.showToast({
      title: '请填写完整信息',
      icon: 'none'
    })
    return
  }
  // TODO: 将表单数据提交到后台
  // 生成企业账号
  db.collection("undefinedUser").doc(_id)
  .get().then(res=>{  
    account = res.data.account 
    account = "0" + account.substring(1)
    console.log(account)  
    // 更新用户认证状态
    db.collection("undefinedUser").doc(_id).update({
      data:{
        hasIdentity : 5
      }
    }).then(res=>{
      console.log("success,",account)
    })
    //添加数据进入待认证企业库
    db.collection("unauditedCompany").add({
      data:{
        companyName : companyName,
        companyContact : companyContact,
        companyLogoUrl : companyLogoUrl,
        companyProfile : companyProfile,        
        account : account, 
        hasIdentity : 5
      }
    }).then(res=>{
      wx.showToast({
        title: '认证成功',
        icon : 'success',
        duration: 1000
      })
    })
    wx.showToast({
      title: '注册成功',
      icon: 'success'
    })
    setTimeout(()=>
      {
        wx.navigateBack({
          delta: 3
        })
      }, 1000)
    })


  // 清空表单数据
  this.setData({
    companyName: '',
    companyContact: '',
    companyLogoUrl: '',
    companyProfile: ''
  })
}

})