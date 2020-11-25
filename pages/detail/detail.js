// pages/detail/detail.js

var WxAutoImage = require('../../static/detailImage.js');
var app = getApp();
const apihost=app.globalData.apiUrl;//本地

Page({
  /**
   * 页面的初始数据
   */
  data: {
      imgUrls: [
        '../../images/discount-banner.jpg',
        '../../images/draw-banner.jpg',
        '../../images/nursing-banner.jpg',
      ],
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 3000,
      duration: 1200,
      iscollect: false
  },
  //取消收藏
  collect1:function(e){
    let _this=this
    let goods_id=e.currentTarget.dataset.goodsid
    let token=wx.getStorageSync('token')
    wx.request({
      url: apihost+'/api/collect1?id='+goods_id+'&token='+token,
      success(res){
        _this.setData({
          status:res.data.msg,
        })
      }
    })
  },
  //收藏
  collect2:function(e){
    let _this=this
    let goods_id=e.currentTarget.dataset.goodsid
    let token=wx.getStorageSync('token')
    wx.request({
      url: apihost+'/api/collect?id='+goods_id+'&token='+token,
      success(res){
        _this.setData({
          status1:res.data.msg
        })
      }
    })
  },
  collect: function(e){

    this.setData({                                                                                                           
        iscollect: !this.data.iscollect
    })
    // console.log(this.data.iscollect);
},
cusImageLoad: function(e){
    var that = this;
    that.setData(WxAutoImage.wxAutoImageCal(e));
},

//加入购物车
cart:function(e){
  let access_token=wx.getStorageSync('token')
  // console.log(getStorage('token'))
  let goods_id=e.currentTarget.id
  let _this=this
  wx.request({
    url: apihost+'/api/Cart?goods_id='+goods_id,
    data:{
      token:access_token
    },
    success(res){
      if(res.data.error==0){
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 2000//持续的时间
        })
      }else{
        wx.showToast({
          title: '加入购物车失败',
          icon: 'success',
          duration: 2000//持续的时间                                   
        })
      }
    }
  })
},
//分享功能
onShareAppMessage(res){
  console.log(res)
  //判断触发的方式是否为按钮
  if(res.from=="button"){
    //参数
    let uid = "111";
    return{
      title:"标题",
      path:"/pages/dynamic/dynamic?uid="+uid
    }
  }
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.call()
    let goods_id = options.id;
    //获取token
    let access_token=wx.getStorageSync('token')
    // console.log(goods_id)
    let _this=this;
    wx.request({
        url:apihost+'/api/goods_details?id='+goods_id,  //仅为示例，并非真实的接口地址
        data:{
          access_token: access_token,
        },
        success(res){
            console.log(res)
          _this.setData({
            // imgUrls:[res.data.goods_img],
            goods:res.data.data.list,
            iscollect:res.data.data.iscollect
          })
        },
        fail:function () {
          console.log('请求失败')
        }
      })
  },
    /**
     * 轮播图切换样式
     */
    swipperChange:function(e){
      this.setData({
        current:e.detail.current
      })
    },
    preview(e){
      console.log(e)
      let imgList=e.currentTarget.dataset.src;
      wx.previewImage({
        // current:imgList[0],//当前显示图片的http链接
        //需要预览的图片http链接列表
        urls: ["https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1995828843,2702670661&fm=26&gp=0.jpg"],
      })
    },
    

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 客服图标打电话 
   */
  call:function(){
    wx.makePhoneCall({
      phoneNumber: '18330024560' //仅为示例，并非真实的电话号码
    })  
  },
  /**
   * 购物车图标跳转
   */
  cartInfo:function(){
   wx.switchTab({
     url: '/pages/cart/cart',
   })
  },
  /**
   * 主页图标跳转
   */
  home:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})