// pages/manager/manager.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyExpand: false,
    coachExpand: false,
  },


  
  toggleCompanyExpand() {
    this.setData({
      companyExpand: !this.data.companyExpand
    })
  },
  toggleCoachExpand() {
    this.setData({
      coachExpand: !this.data.coachExpand
    })
  },
  passCompany(res){
    console.log(res)
    var _id = "",
        length = -1
    var choose = res.currentTarget.dataset.choose
    var account = choose.account
    db.collection("definedCompany").where({
      account : choose.account,
    }).get().then(res=>{
      length = res.data.length
      console.log(length)
      if(length==0){
        console.log("运行中")
        account = "3" + account.substring(1)
        console.log("account",account)
        db.collection("definedCompany").add({
          data:{
            account : account,
            companyContact : choose.companyContact,
            companyLogoUrl : choose.companyLogoUrl,
            companyName : choose.companyName,
            companyProfile : choose.companyProfile
          }
        }).then(res=>{
          console.log("success",res)
        })
        //更新未认证库用户状态
        db.collection("undefinedUser").where({
          account : choose.account
        }).get().then(res=>{
          console.log("_id",res.data[0]._id)
          _id = res.data[0]._id
          db.collection("undefinedUser").doc(_id).update({
            data:{
              account : account,
              hasIdentity : 3
            }
          }).then(res=>{
            console.log("success,",res,account)
          })
        })
    
        db.collection("unauditedCompany").where({
          account : choose.account
        }).get().then(res=>{
          _id = res.data[0]._id
          db.collection("unauditedCompany").doc(_id).update({
            data:{
              account : account,
            }
          }).then(res=>{
            console.log("success,",res,account)
            wx.showToast({
              title: '认证成功',
              icon: 'success',
              duration: 2000,
              success(){
                wx.redirectTo({
                  url: '/pages/manager/manager'
                })
              }
            });
            
          })
        })
        
      }
    })
    
  },

  passCoach(res){
    console.log(res)
    var _id = "",
        length = -1
    var choose = res.currentTarget.dataset.choose,
        coachClass = parseInt(res.currentTarget.dataset.class)
    var account = choose.account
    db.collection("coachesCompanyView").where({
      account : choose.account,
    }).get().then(res=>{
      length = res.data.length
      console.log(length)
      if(length==0){
        console.log("运行中")
        account = "2" + account.substring(1)
        console.log("account",account)
        db.collection("coachesCompanyView").add({
          data:{
            account : account,
            coachAge : choose.coachAge,
            name : choose.name,
            coachPhone : choose.coachPhone,
            coachSex : choose.coachSex,
            type : choose.type,
            avatarurl : choose.avatarurl,
            class : coachClass,
            introl : choose.introl
          }
        }).then(res=>{
          console.log("success",res)
        })
        //更新未认证库用户状态
        db.collection("undefinedUser").where({
          account : choose.account
        }).get().then(res=>{
          console.log("_id",res.data[0]._id)
          _id = res.data[0]._id
          db.collection("undefinedUser").doc(_id).update({
            data:{
              account : account,
              hasIdentity : 2
            }
          }).then(res=>{
            console.log("success,",res,account)
          })
        })
    
        db.collection("unauditedCoach").where({
          account : choose.account
        }).get().then(res=>{
          _id = res.data[0]._id
          db.collection("unauditedCoach").doc(_id).update({
            data:{
              account : account,
              hasIdentity : 2
            }
          }).then(res=>{
            console.log("success,",res,account)
            wx.showToast({
              title: '分班成功',
              icon: 'success',
              duration: 2000,
              success(){
                wx.redirectTo({
                  url: '/pages/manager/manager'
                });
              }
            });
          })
        })
        
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    db.collection('unauditedCompany')
    .get().then(res=>{
      console.log(res)
      this.setData({
        company : res.data
      })
    })
    db.collection('unauditedCoach')
    .get().then(res=>{
      console.log(res)
      this.setData({
        coach : res.data
      })
    })
  },

  unPassCompany(res){
    console.log(res)
    var _id
    var choose = res.currentTarget.dataset.choose
    db.collection("undefinedUser").where({
      account : choose.account
    }).get().then(res=>{
      console.log(res)
      _id = res.data[0]._id
      db.collection("undefinedUser").doc(_id).update({
        data:{
          hasIdentity : 0
        }
      })
    })
    db.collection("unauditedCompany").where({
      account : choose.account
    }).get().then(res=>{
      console.log(res)
      _id = res.data[0]._id
      db.collection("unauditedCompany").doc(_id).remove(res=>{
        console.log(res)
        wx.showToast({
          title: '打回成功',
          icon: 'success',
          duration: 2000,
          success(){
            wx.redirectTo({
              url: '/pages/manager/manager'
            });
          }
        });
      })
    })
  },

  unPassCoach(res){
    var _id
    console.log(res)
    var choose = res.currentTarget.dataset.choose
    db.collection("undefinedUser").where({
      account : choose.account
    }).get().then(res=>{
      console.log(res)
      _id = res.data[0]._id
      db.collection("undefinedUser").doc(_id).update({
        data:{
          hasIdentity : 0
        }
      })
    })
    db.collection("unauditedCoach").where({
      account : choose.account
    }).get().then(res=>{
      console.log(res)
      _id = res.data[0]._id
      db.collection("unauditedCoach").doc(_id).remove(res=>{
        console.log(res)
        wx.showToast({
          title: '打回成功',
          icon: 'success',
          duration: 2000,
          success(){
            wx.redirectTo({
              url: '/pages/manager/manager'
            });
          }
        });
      })
    })
  },

  openPDF(res){
    console.log(res,res.currentTarget.dataset.choose)
    var choose = res.currentTarget.dataset.choose
    wx.cloud.downloadFile({
      fileID : choose,
      success:function(res){
        console.log(res)
        wx.openDocument({
          filePath: res.tempFilePath,
          showMenu:true,
          success :function(res){
            console.log(res,"打开文档成功")
          }
        })
      }
    })
  },

  openHonorEvidence(res){
    console.log(res,res.currentTarget.dataset.choose)
    var choose = res.currentTarget.dataset.choose
    wx.cloud.downloadFile({
      fileID : choose,
      success:function(res){
        console.log(res)
        wx.openDocument({
          filePath: res.tempFilePath,
          showMenu:true,
          success :function(res){
            console.log(res,"打开文档成功")
          }
        })
      }
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