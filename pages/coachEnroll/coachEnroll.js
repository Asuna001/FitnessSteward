// pages/certification_coach/certification_coach.js
// 登录认证界面
const db=wx.cloud.database();
const app = getApp()
Page({
  data: {
    floatPanelShow: false,
    account:''
  },

//信息上传
  submitInformation_Coach(res){
    console.log(res)
    var _id = this.data._id,
        account = "",
        IDCardFileID = "",
        honorEvidenceID = "",
        PDFID = "",
        headshotFileID = ""
    var coachName = res.detail.value.coachName,
        coachAge = res.detail.value.coachAge,
        coachPhone =res.detail.value.coachPhone,
        coachIntro = res.detail.value.coachIntro,
        IDCardFilePath = this.data.IDCardFilePath,
        PDFPath = this.data.PDFPath,
        headshotFilePath = this.data.headshotFilePath,
        honorEvidencePath = this.data.honorEvidencePath,
        coachtype = this.data.coachType[1],
        coachSex = this.data.coachSex
    // 检查是否全部填写完成
    if(coachSex!=""&&coachtype[0]!="0"&&coachName!=""&&headshotFilePath!='https://img.freepik.com/free-icon/user_318-219661.jpg?size=626&ext=jpg'&&IDCardFilePath!="https://img.freepik.com/free-icon/id-card_318-907485.jpg?size=626&ext=jpg"&&this.data.PDFTextShow!=""&&this.data.honorEvidenceTextShow!=""){
    // 更新用户认证状态
      db.collection("undefinedUser").doc(_id).update({
        data:{
        hasIdentity : 4
        }
      }).then(res=>{
        console.log(res)
      })
    
    //通过async和await函数确保文件上传后信息才写入数据库
      async function loadCloud(){
        //文件上传至云端并返回云端路径
        await wx.cloud.uploadFile({
          filePath: headshotFilePath,
          cloudPath: "coachFile" + "/" + app.globalData.userInfo.account + "headshotFilePath"
        }).then(res=>{
          console.log(res)
          headshotFileID = res.fileID
        }).catch(err=>{
          console.log(err,"上传失败")
        })
        await wx.cloud.uploadFile({
          filePath: IDCardFilePath,
          cloudPath: "coachFile" + "/" + app.globalData.userInfo.account + "IDCardFilePath"
        }).then(res=>{
          console.log(res)
          IDCardFileID = res.fileID
        }).catch(err=>{
          console.log(err,"上传失败")
        })
        await wx.cloud.uploadFile({
          filePath: PDFPath,
          cloudPath: "coachFile" + "/" +  app.globalData.userInfo.account + "PDFPath"
        }).then(res=>{
          console.log(res)
          PDFID = res.fileID
        }).catch(err=>{
          console.log(err,"上传失败")
        })
        await wx.cloud.uploadFile({
          filePath: honorEvidencePath,
          cloudPath: "coachFile" + "/" +  app.globalData.userInfo.account + "honorEvidencePath"
        }).then(res=>{
          console.log(res)
          honorEvidenceID = res.fileID
        }).catch(err=>{
          console.log(err,"上传失败")
        })
        //添加数据进入待认证教练库
        await db.collection("unauditedCoach").add({
          data:{
            name:coachName,
            coachAge:coachAge,
            intro:coachIntro,
            avatarurl:headshotFileID,
            coachSex:coachSex,
            coachPhone:coachPhone,
            hasIdentity:4,
            type:coachtype,
            account : app.globalData.userInfo.account, 
            IDCardFileID : IDCardFileID,
            PDFID : PDFID,
            headshotFileID : headshotFileID,
            honorEvidenceID : honorEvidenceID
          },       
        }).then(res=>{
          console.log(res)
          wx.showToast({
          title: '认证成功',
          icon : 'success',
          duration: 1000
          })
        })
        await wx.showToast({
          title: '注册成功',
          icon: 'success'
        })
        wx.navigateBack({
          delta: 3
        })
      }
      loadCloud()
    }else{
      wx.showToast({
        title: '请完整填写表单信息',
        icon: "error"
      })
    }

  },

  // 选择头像
  chooseHeadshot(){
    wx.chooseMedia({
      count:1,
      mediaType:['image'],
      sourceType: ['album', 'camera'],
      sizeType:['compressed'],
      camera: 'back',
    }).then(res=>{
      console.log(res)
      var headshotFilePath = res.tempFiles[0].tempFilePath
      this.setData({
        headshotFilePath : headshotFilePath
      })
    }).catch(err=>{
      console.log('上传失败',err)
    })
    
  },

  chooseIDCard(){
    console.log("用户选择身份证照片")
    wx.chooseMedia({
      count:1,
      mediaType:['image'],
      sourceType: ['album', 'camera'],
      sizeType:['compressed'],
      camera: 'back',
    }).then(res=>{
      console.log(res)
      var IDCardFilePath = res.tempFiles[0].tempFilePath
      this.setData({
        IDCardFilePath : IDCardFilePath
      })
    }).catch(err=>{
      console.log('上传失败',err)
    })
  },
//上传简历PDF
  choosePDF(){
    wx.chooseMessageFile({
      count : 1,
      type:'file',
      extends:'pdf'
    }).then(res=>{
      this.setData({
        PDFSmallShow : "cloud://cloud1-5g9hej0jd2e2ade0.636c-cloud1-5g9hej0jd2e2ade0-1313474790/PDF.png",
        PDFTextShow : res.tempFiles[0].name,
        PDFPath :  res.tempFiles[0].path
      })
    }).catch(err=>{
      console.log(err,"上传失败")
    })
  },
//上传荣誉证明文件（pdf或许word）
  chooseHonorEvidence(){
    wx.chooseMessageFile({
      count : 1,
      type:'file',
      extends:['pdf']
    }).then(res=>{
      var filePath = res.tempFiles[0].path
      var suffix = filePath.substr(filePath.lastIndexOf('.') + 1).toLowerCase()//获取文件后缀
      if(suffix=='pdf'){
        this.setData({
          honorEvidenceSmallShow : "cloud://cloud1-5g9hej0jd2e2ade0.636c-cloud1-5g9hej0jd2e2ade0-1313474790/PDF.png",
          honorEvidenceTextShow : res.tempFiles[0].name,
          honorEvidencePath :  filePath
        })
      }else if(suffix=='doc'||suffix=='docx'){
        this.setData({
          honorEvidenceSmallShow : 	"cloud://cloud1-5g9hej0jd2e2ade0.636c-cloud1-5g9hej0jd2e2ade0-1313474790/word.png",
          honorEvidenceTextShow : res.tempFiles[0].name,
          honorEvidencePath :  filePath
        })
      }
      
    }).catch(err=>{
      console.log(err,"上传失败")
    })
  },

  chooseType(res){
    console.log(res,res.currentTarget.dataset)
    var coachType = res.currentTarget.dataset.coachtype
    this.setData({
      coachType : ["0",coachType]
    })
  },
  chooseTypeBack(){
    this.setData({
      coachType:[
        "0",//标记未选择状态
        "CEPF教练",
        "篮球",
        "足球",
        "排球"
      ]
    })
  },

  man(){
    this.setData({
      coachSex : '男'
    })
  },
  woman(){
    this.setData({
      coachSex : '女'
    })
  },

  reFill(){
    wx.showModal({
      title: '注意！',
      content: '所有已填写信息都会被清空',
      complete: (res) => {
        if (res.cancel) {
          console.log("用户选择取消")
        }
        if (res.confirm) {
          this.setData({
            headshotFilePath : 'https://img.freepik.com/free-icon/user_318-219661.jpg?size=626&ext=jpg',
            IDCardFilePath : "https://img.freepik.com/free-icon/id-card_318-907485.jpg?size=626&ext=jpg",
            PDFSmallShow : "https://img.freepik.com/free-icon/curriculum-vitae_318-317781.jpg?size=626&ext=jpg",
            PDFTextShow : "",
            honorEvidenceSmallShow : "https://img.freepik.com/free-icon/trophy_318-449464.jpg?size=626&ext=jpg",
            honorEvidenceTextShow : "",
            coachSex : '',
            coachType:[
              "CEPF教练",
              "篮球",
              "足球",
              "排球"
            ]
          })
        }
      }
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
        _id : userInfo.data,
        headshotFilePath : 'https://img.freepik.com/free-icon/user_318-219661.jpg?size=626&ext=jpg',
        IDCardFilePath : "https://img.freepik.com/free-icon/id-card_318-907485.jpg?size=626&ext=jpg",
        PDFSmallShow : "https://img.freepik.com/free-icon/curriculum-vitae_318-317781.jpg?size=626&ext=jpg",
        PDFTextShow : "",
        honorEvidenceSmallShow : "https://img.freepik.com/free-icon/trophy_318-449464.jpg?size=626&ext=jpg",
        honorEvidenceTextShow : "",
        coachSex : '',
        coachType:[
          "CEPF教练",
          "篮球",
          "足球",
          "排球"
        ]
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