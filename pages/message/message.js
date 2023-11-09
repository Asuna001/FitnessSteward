// pages/contact/contact.js
const app = getApp();
const db = wx.cloud.database()
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */


/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0,
    inputVal : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log(app.globalData)
    if(app.globalData.hasUserInfo==false){
      msgList = [{
        speaker: 'server',
        contentType: 'text',
        content: '体适能管家竭诚为您服务'
      },
      {
        speaker: 'customer',
        contentType: 'text',
        content: '谢谢'
      }]
      that.setData({
        msgList : msgList
      })
    }else{
      var account = app.globalData.userInfo.account
      db.collection("massage").where({
        account : account
      }).get().then(res=>{
        if(res.data.length==0){
          db.collection("massage").add({
            data : {
              account : account,
              history : [{speaker:"server",contentType:"text",content:"体适能管家竭诚为您服务"}]
            }
          }).then(res=>{
            console.log(res,"初始化成功")
            var _id = res._id
            db.collection("massage").doc(_id)
            .get().then(res=>{
              msgList = res.data.history
              that.setData({
                msgList : msgList
              })
            })
          })
        }else{
          msgList = res.data[0].history
          that.setData({
            msgList : msgList
          })
        }
      })
    }
    this.setData({
      cusHeadIcon: app.globalData.userInfo.avatarUrl,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    console.log(app.globalData)
    if(app.globalData.hasUserInfo==false){
      msgList = [{
        speaker: 'server',
        contentType: 'text',
        content: '体适能管家竭诚为您服务'
      },
      {
        speaker: 'customer',
        contentType: 'text',
        content: '谢谢'
      }]
      that.setData({
        msgList : msgList
      })
    }else{
      var account = app.globalData.userInfo.account
      db.collection("massage").where({
        account : account
      }).get().then(res=>{
        console.log(res)
        if(res.data.length==0){
          db.collection("massage").add({
            data : {
              account : account,
              history : [{speaker:"server",contentType:"text",content:"体适能管家竭诚为您服务"}]
            }
          }).then(res=>{
            console.log(res,"初始化成功")
            var _id = res._id
            db.collection("massage").doc(_id)
            .get().then(res=>{
              msgList = res.data.history
              that.setData({
                msgList : msgList
              })
            })
          })
        }else{
          msgList = res.data[0].history
          that.setData({
            msgList : msgList
          })
        }
      })
    }
    this.setData({
      cusHeadIcon: app.globalData.userInfo.avatarUrl,
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    if(app.globalData.hasUserInfo==true){
      var account = app.globalData.userInfo.account
      db.collection("massage").where({
        account : account
      }).get().then(res=>{
        console.log(res,msgList)
        var _id = res.data[0]._id
        db.collection("massage").doc(_id)
        .update({
          data : {
            history : msgList
          }
        }).then(res=>{
          console.log(res,"提交成功")
        })
      })
    }
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });


  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }

})
