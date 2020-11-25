//index.js
//获取应用实例
const app = getApp()
const apihost=app.globalData.apiUrl;//本地

Page({
  // data: {
  //   motto: 'Hello World',
  //   name:'zhangsan',
  //   userInfo: {},
  //   hasUserInfo: false,
  //   canIUse: wx.canIUse('button.open-type.getUserInfo')
  // },
  data: {
    //分类
    tabs:{
      items:[
        '首页','手机','电脑办公','食品','生鲜','数码','家居厨具','母婴童装','男装','女装','运动'
      ],
      active:0
    },
    // 轮播
    images: [
      '../../images/discount-banner.jpg',
      '../../images/draw-banner.jpg',
      '../../images/nursing-banner.jpg',
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    list:[],
    page:1,   //页表页号
    pagesize:10,//列表大小
  },
    //分类
    handleTabClick:function(e){
      let index=e.target.dataset.index
      this.setData({
        'tabs.active':index
      })
    },


  swiperchange: function (e) {
    //FIXME: 当前页码
    // console.log(e.detail.current)
  },

    // header跳转到搜索页面
    jumpToSearch: function () {
      wx.navigateTo({
        url: '../search/search'
      })
    },
  //点击商品跳转详情页
  goods_details:function(e){
    console.log(e)
    var id=e.currentTarget.id;
    wx.navigateTo({
        url:'../detail/detail?id='+id
    })
  },
  //页面触底函数
  onReachBottom:function(){
    console.log(1233);
    this.data.page++;
    this.getGoodsList();
  },
  //封装触底事件的页面请求
  getGoodsList:function(){
    let _this=this;
    //发起网络请求
    wx.request({
      url:apihost+'/api/GoodsList',
      data:{
        page:_this.data.page,
        size:_this.data.pagesize,
      },
      header: {
            'content-type': 'application/json' // 默认值
          },
      success(res){
        let new_list=_this.data.list.concat(res.data.data.list)   //原来的数据和加载的数据一起展示在页面
        _this.setData({
          list:new_list,
        })
      }
    })
    // wx.request({
    //   url: 'http://jd.2004.com/api/test', //仅为示例，并非真实的接口地址
    //   data: {
    //     x: 'xxx',
    //     y: 'yyy'
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success (res) {
    //     // console.log(res);
    //     // console.log(res.data)
    //     // console.log(this);
    //     _this.setData({
    //       goods_name:res.data.goods_name,
    //       shop_price:res.data.shop_price,
    //     });
  },




  /**
   * 获取用户信息
   */
  //点击登录
  // btnLogin:function(e){
  //   wx.login({
  //     success (res) {
  //       console.log(res)
  //       if (res.code) {
  //         //发起网络请求
  //         wx.request({
  //           url: 'http://jd.2004.com/api/getcode',
  //           data: {
  //             code: res.code
  //           },
  //           //本地存储token
  //           success(res){
  //             wx.setStorage({
  //               key:"token",
  //               data:res.data.data
  //             })
  //           },
  //         })
  //       } else {
  //         console.log('登录失败！' + res.errMsg)
  //       }
  //     }
  //   })
  // },
  //



  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //接口获取数据并渲染视图
    // console.log(this);
    // let _this=this;
    //发起网络请求
    // wx.request({
    //   url: 'http://jd.2004.com/api/test', //仅为示例，并非真实的接口地址
    //   data: {
    //     x: 'xxx',
    //     y: 'yyy'
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success (res) {
    //     // console.log(res);
    //     // console.log(res.data)
    //     // console.log(this);
    //     _this.setData({
    //       goods_name:res.data.goods_name,
    //       shop_price:res.data.shop_price,
    //     });
    // wx.request({
    //   url:'http://jd.2004.com/api/goods',  //仅为示例，并非真实的接口地址
    //   header:{
    //     'content-type':'application/json' //默认值
    //   },
    //   success(res){
    //     _this.setData({
    //       goods:res.data,
    //     })
    //   },
    //   fail:function () {
    //     console.log('请求失败')
    //   }
    // })
    //调用触底页面请求
    this.getGoodsList();

    //   }
    // })

  /**
   * 生命周期函数--监听页面显示
   */
    //   if (app.globalData.userInfo) {
    //     this.setData({
    //       userInfo: app.globalData.userInfo,
    //       hasUserInfo: true,
    //     })
    //   } else if (this.data.canIUse){
    //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //     // 所以此处加入 callback 以防止这种情况
    //     app.userInfoReadyCallback = res => {
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   } else {
    //     // 在没有 open-type=getUserInfo 版本的兼容处理
    //     wx.getUserInfo({
    //       success: res => {
    //         app.globalData.userInfo = res.userInfo
    //         this.setData({
    //           userInfo: res.userInfo,
    //           hasUserInfo: true
    //         })
    //       }
    //     })
    //   }
    // },
    // getUserInfo: function(e) {
    //   console.log(e)
    //   app.globalData.userInfo = e.detail.userInfo
    //   this.setData({
    //     userInfo: e.detail.userInfo,
    //     hasUserInfo: true,
    //     name2:'haha',
    //   })
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  }
})
