// pages/information_inner/information_inner.js

// var poster_data = require("../../data/posters_data.js");

var app = getApp();

var app = getApp();
Page({
  data: {
    posterData:{
      title: "当我们在谈论经济学时，我们在谈论什么?",
      content: "引言在我跟学生课后交流时，以及我在知乎上阅读有关“经济”问题的论题时，经常会遇到这样的情况：...",
      detail: "1 引言\n\n在我跟学生课后交流时，以及我在知乎上阅读有关“经济”问题的论题时，经常会遇到这样的情况：有些人套用“经济理论“的知识去解释现实中发生的经济事件，结果发现很多事情讲不通，或者发现”理论告诉我们的“与现实发生的是相反的。也有学生经常跟我说：经济学有什么用？为了说明这个，我经常从两个方面来进行解释，尝试用我个人所擅长的解决问题的视角和他们能够听懂的方法来说明经济学是什么，它的作用边界在哪里：\r\n\n2 ”简笔素描“与”油画肖像“我们给人画肖像画，可以用简笔素描，也可以用油画肖像。油画肖像可以在最大程度上保存了人物的各方面的细节和特点，而简笔素描则忽略了很多细节。尽管简笔素描忽略了人物的许多细节，但我们仍旧能够很容易的认出画中的人物是谁。为什么？因为这种方法保留了人物最显著的特征，以至于我们可以忽略其次要特征而对人物做出判定。\n\n2.1 ”简笔素描“对于绝大多数的非经济学专业大众而言（经济学相关专业硕士学历以上），人们所接触到的经济学都是初级微观经济学。所谓的初级微观经济学，对于经济问题的”画法“就是一种”简笔素描“。比如初级微观经济学教材中广为使用的这种一元一次需求函数：y=bx+a，需求量的唯一变量是产品价格。但仅凭直觉我们就可以断言，现实中影响需求量的因素绝不止价格这一种，因此我们可以认为这个模型对经济问题的描述是失真的。然而但这种失真却是必要的和有意义的，其意义在与它利于揭示价格对于需求的影响，而不在于否定影响需求的其他因素——",
      imgSrc: "https://m.qpic.cn/psc?/V50qjiew0VVd8v0fo3Yq0aCdZG2mFv8m/ruAMsa53pVQWN7FLK88i5n12nd29LrrD0pP6.0hkqnRjwxcXdHIJAX61x5QG40QJi7WK4KCvwLCRh4RCMCFMELP1SefVKIpqPjq.qRZcOXI!/mnull&bo=AASrAgAEqwIDByI!&rf=photolist&t=5",
      reading: 62,
      collection: 92,
      date: "Nov 12 2016",
      avatar: "https://m.qpic.cn/psc?/V50qjiew0VVd8v0fo3Yq0aCdZG2mFv8m/ruAMsa53pVQWN7FLK88i5hR8*gbVAs1lbLSVerXr2NeD*c1PP4CqJB1aIEXqpbUPgaQzNZtDQtlLVX7lCT83OK41mScrwrQi*vC2FTWzKEI!/mnull&bo=yADIAMgAyAADByI!&rf=photolist&t=5",
      postId: 1,
      headImgSrc: "/image/post/sls.png",
      author: "知乎",
      dateTime: "三天前",
      music: {
        url: "http://ws.stream.qqmusic.qq.com/C100002I8eGJ28BI17.m4a?fromtag=38",
        title: "谭咏麟-朋友",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000004eGsCN3SUheO.jpg?max_age=2592000"
      }
    },
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var postId = options.id;
    this.data.currentPostId = postId;
    this.data.isPaly = false;
    // this.data.posterData = poster_data.posterData[postId];
    // 利用本地缓存来设置文章是否收藏,约定形式如下所示
    /*    var postCollected ={
          0:"true",
          1:"false",
          ...
        }*/

    var postCollected = wx.getStorageSync('postCollected');
    if (postCollected) { //取到缓存,设置相应的状态
      var collection = postCollected[postId];
      this.setData({ collected: collection });
    } else {//没有取到缓存
      postCollected = {};
      postCollected[postId] = false;
      wx.setStorageSync('postCollected', postCollected);
    }
    // //这里来控制音乐总的播放,如果有音乐播放，设置isPlay是正在播放，没有播放就算了，默认就是false
    // //同时在下面监听中去改变这个全局的值。播放了，就为true,没有播放为false，结合播放的位置，得到对应播放
    // if(app.globalData.g_isMusicPlayed  && app.globalData.g_currentMusicIndex == postId){
    //   this.setData({isPlay:true});
    // }
    // this.onMusicMonitor();

  },

  onMusicMonitor:function(){
    //在onLoad里监听音乐的播放，这里是监听总框架的事件,在回调函数里处理，从而改变背景图片与音乐图片的切换
    var that = this;
    wx.onBackgroundAudioPlay(function() {//监听到音乐正在播放
      that.setData({
        isPlay:true
      });
      app.globalData.g_isMusicPlayed =true;
      app.globalData.g_currentMusicIndex = that.data.currentPostId;
    })
    wx.onBackgroundAudioPause(function() {//监听到音乐已经暂停
      that.setData({
        isPlay:false
      });
      app.globalData.g_isMusicPlayed =false;
      app.globalData.g_currentMusicIndex = null;
    })
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onCollectedTap: function (event) {
    var that = this;
    //收藏页面
    //var postCollected = wx.getStorageSync('postCollected');
    //var collection = postCollected[this.data.currentPostId];
    //切换取消收藏与取消收藏

    //this.showToast(collection,postCollected);
    //this.showModal(collection,postCollected);


    //异步获取缓存数据
    wx.getStorage({
      key: 'postCollected',
      success: function (res) {
        var postCollected = res.data;
        var collection = postCollected[that.data.currentPostId];
        that.showToast(collection, postCollected);
      }
    })
    var collection = postCollected[this.data.currentPostId];
    //切换取消收藏与取消收藏

    this.showToast(collection, postCollected);
    //this.showModal(collection,postCollected);


  },

  showToast: function (collection, postCollected) {
    wx.showToast({
      title: collection ? "取消成功" : "收藏成功",
      icon: 'success',
      duration: 1000
    });
    collection = !collection;
    postCollected[this.data.currentPostId] = collection;
    //更新缓存
    wx.setStorageSync('postCollected', postCollected);
    //同步数据
    this.setData({ collected: collection });
  },

  showModal: function (collection, postCollected) {
    var that = this;
    wx.showModal({
      title: "收藏",
      content: collection ? '是否取消收藏？' : "是否确定收藏？",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#666",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          collection = !collection;
          postCollected[that.data.currentPostId] = collection;
          wx.setStorageSync('postCollected', postCollected);
          that.setData({ collected: collection });
        }
      }
    })
  },

  onShareTap: function (event) {
    var itemList = ["分享到微信好友", "分享到朋友圈", "分享到QQ", "分享到微博"];

    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        //两个参数，一个是res.cancle,boolean判断用户是否点击了取消按钮
        // res.tapIndex表示参数的索引，从0开始
        if (!res.cancel) {
          wx.showModal({
            title: "用户" + itemList[res.tapIndex],
            content: "用户是否取消？" + res.cancle + "\n现在暂时不支持用户的分享功能?什么时候能够支持呢？"
          });
        }
      }
    });
  },

  onMusicTap: function (event) {
    var isPlayed = this.data.isPlay;
    var musicDataData = this.data.posterData.music;
    if (isPlayed) {//如果是正在播放，则暂停播放；
      wx.pauseBackgroundAudio();
      //这里不能用this.data.isPlay;
      this.setData({ isPlay: false });
    } else {//如果是暂停播放，则启动播放器
      wx.playBackgroundAudio({
        dataUrl: musicDataData.url,
        title: musicDataData.title,
        coverImgUrl: musicDataData.coverImg
      })
      this.setData({ isPlay: true });
    }
  }

})