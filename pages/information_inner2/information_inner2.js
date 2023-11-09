// pages/information_inner/information_inner.js

// var poster_data = require("../../data/posters_data.js");

var app = getApp();

var app = getApp();
Page({
  data: {
    posterData:{
      title: "比利·林恩的中场故事",
      content: "一 “李安是一位绝不会重复自己的导演，本片将极富原创性李安众所瞩目的新片《比利林恩漫长的中场休息》，正式更名《半场无战事》。",
      detail: "一 “李安是一位绝不会重复自己的导演，本片将极富原创性”李安众所瞩目的新片《比利林恩漫长的中场休息》，正式更名《半场无战事》。预告片首次曝光后，被视作是明年奥斯卡种子选手。该片根据同名畅销书改编。原著小说荣获美国国家图书奖。也被BBC评为21世纪最伟大的12本英文小说之一。影片讲述一位19岁德州男孩的比利·林恩入伍参加伊战，在一次交火中他大难不死，意外与战友成为大众的关注焦点，并被塑造成英雄。之后他们返回国内，在橄榄球赛中场休息时授勋。这名战争英雄却面临前所未有的心灵煎熬……李安为什么选中这部电影来拍？因为李安想要挑战前所未有的技术难题：以120帧每秒的速度、4K、3D技术全面结合，来掀起一场电影视觉革命。什么意思？所谓“电影是24格每秒的谎言”，其中的24格，就是帧数。",
      imgSrc: "https://m.qpic.cn/psc?/V50qjiew0VVd8v0fo3Yq0aCdZG2mFv8m/ruAMsa53pVQWN7FLK88i5qqJFv66epEo6w2lYEM*3V.XldWpckgIckVf7zo6Ah4Nx1vL5cF7wFjWvDE5Z9PvQeSaqILMXP8Mf2GBCFk63*o!/mnull&bo=awN3AWsDdwEDByI!&rf=photolist&t=5",
      reading: 62,
      collection: 92,
      date: "Nov 20 2016",
      avatar: "/image/avatar/1.png",
      postId: 2,
      dateTime: "24小时前",
      headImgSrc: "https://m.qpic.cn/psc?/V50qjiew0VVd8v0fo3Yq0aCdZG2mFv8m/ruAMsa53pVQWN7FLK88i5lP4pgH1zAI5cJruhmEwMIId7Lu0rMPcra*LfAhySD*6MNvctWEA7GzfFlyLmFg07eD1JBHaME30oWzaKy5RIUM!/mnull&bo=yADIAMgAyAADByI!&rf=photolist&t=5",
      author: "迷的城",
      music: {
        url: "http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38",
        title: "齐秦--夜夜夜夜",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001TEc6V0kjpVC.jpg?max_age=2592000"
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
    //切换收藏与取消收藏

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