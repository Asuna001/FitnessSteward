// pages/detect/detect.js
 // 姿态识别界面
 const db=wx.cloud.database();
 const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
 
  data: {
    videoUrl: '', // 用于展示视频的URL
    uploadStatus: '', // 用于展示视频处理结果
  },
// 选择视频
chooseVideo: function () {
  var that = this;
  wx.chooseMedia({
    sourceType: ['album', 'camera'],
    mediaType : ["video"],
    count : 1
  }).then(res=>{
    console.log(res)
    that.setData({
      videoUrl: res.tempFiles[0].tempFilePath
    });
  }).catch(err=>{
    console.log(err)
  })
},

// 上传视频
  uploadVideo: function () {
    var that = this;
    var videoUrl = that.data.videoUrl;
    if (videoUrl) {
      // 调用云存储上传视频的接口
      async function upload(){
        await wx.showLoading({
          title: '上传中',
          mask:true
        })
        await wx.cloud.uploadFile({
          cloudPath: "studentVideo" + "/" +  app.globalData.userInfo.account + "detectVideoPath", // 云存储中的文件路径和文件名
          filePath: videoUrl, // 本地视频文件路径
        }).then(res=>{
          var uploadStatus = '上传成功';
          console.log(res)
          that.setData({
            uploadStatus: uploadStatus,
            cloudID : res.fileID
          });
        }).catch(err=>{
          console.log(err)
          wx.showToast({
            title: '视频上传失败',
            icon: 'none'
          })
        })
        await wx.hideLoading()
        await wx.showToast({
          title: '上传成功！',
          icon : "success",
          duration : 1000
        })
      }
      upload()
    }else{
      wx.showToast({
        title: '请先选择视频',
        icon: 'none'
      })
    }
  },

// 重新上传视频
  reUpload: function () {
    // 清空视频URL和处理结果
    this.setData({
      videoUrl: '',
      uploadStatus: ''
    });
    console.log(this.cloudID)
    wx.cloud.deleteFile({
      fileList : [this.cloudID]
    })
  },
// 查看处理结果视频
  detectResult:function(){
    var that = this
    if(this.data.uploadStatus == '上传成功'){
      async function loading(){
        await wx.showLoading({
          title: '数据处理中',
        })
        await setTimeout(()=>
        {
          that.setData({
            resultUrl : "cloud://cloud1-5g9hej0jd2e2ade0.636c-cloud1-5g9hej0jd2e2ade0-1313474790/studentVideo/s_output(2).mp4"
          });
          
        }, 5000)
        setTimeout(()=>{
          wx.hideLoading()
        },5000)
      }
      loading()
    }else{
      wx.showToast({
      title: '请先选择视频',
      icon: 'none'
      })
    }
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