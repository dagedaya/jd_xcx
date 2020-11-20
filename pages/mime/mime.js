//mime.js
var util = require('../../utils/util.js')
var request = require('../../utils/https.js')
var uri = 'memberapi/memberDetail'
var app = getApp()
var Info = {}
Page({
  data: {
    userInfo: {}
  },

    /**
   * 获取用户信息
   */
  //点击登录
  btnLogin:function(e){
    wx.login({
      success (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://jd.2004.com/api/getcode',
            data: {
              code: res.code
            },
            //本地存储token
            success(res){
              wx.setStorageSync('token', res.data.data.token)
            },
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
      getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true,
          name2:'haha',
        })
  },
  no_payment: function () {
    //全部订单
    if (!Info.token) {
      //跳转到login
      wx.navigateTo({
        url: '../login/login?id=' + 0
      })
    }
    wx.navigateTo({
      url: '../ordertotal/ordertotal?id=' + 0

    })
  },
  already_shipped: function () {
    if (!Info.token) {
      //跳转到login
      wx.navigateTo({
        url: '../login/login?id=' + 1
      })
    }
    //待付款
    wx.navigateTo({
      url: '../ordertotal/ordertotal?id=' + 1
    })
  },
  no_comment: function () {
    if (!Info.token) {
      //跳转到login
      wx.navigateTo({
        url: '../login/login?id=' + 2
      })
    }
    //待收货
    wx.navigateTo({
      url: '../ordertotal/ordertotal?id=' + 2
    })
  },
  //售后
  customer_service: function () {
    if (!Info.token) {
      //跳转到login
      wx.navigateTo({   //加个参数  
        url: '../login/login?id=' + 3
      })
    }else{
        wx.navigateTo({   //加个参数  
        url: '../service/service'
      })
    }
  },
  coupon: function () {
    //优惠券
     wx.navigateTo({   //加个参数  
        url: '../coupon/coupon'
      })
  },
  //账户管理
  mimeinfo: function () {
    wx.navigateTo({
      url: '../manager/manager'
    })
  },
  onShow: function () {
    var that = this
    //判断是否登陆，如果没登陆走微信的
    var CuserInfo = wx.getStorageSync('CuserInfo');
    Info = CuserInfo
    if (CuserInfo.token) {
      //获取照片和用户名
      var photo = 'http://testbbcimage.leimingtech.com' + CuserInfo.avatar_url;
      var name = CuserInfo.loginname;
      var user = {}
      user.avatarUrl = photo;
      user.nickName = name;
      that.setData({ userInfo: user })
    } else {
      //调用应用实例的方法获取全局数据
      wx.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo
        })
      })
    }
  }
})




