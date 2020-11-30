const app = getApp()
const apihost=app.globalData.apiUrl;//本地
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    selectAll:false,
    selectAdd:false,
    goodsList:({
      goods_img: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1995828843,2702670661&fm=26&gp=0.jpg",
      goods_name: "柯南3",
      shop_price: "252.00"
    }),
     totalprice:0
    },
    /**全选 */
    selectAll:function(){
      let totalprice=0
      let list=this.data.goodsList
      let all=!this.data.selectAll
      list.forEach((item)=>{
        if(all){
          item.checked=true
          totalprice +=item.goods_num*item.shop_price
        }else{
          item.checked=false
        }
      })
      this.setData({
        goodsList:list,
        selectAll:all,
        totalprice:totalprice,
      })
    },
    /**单选 */
    selectAdd:function(res){
      let totalprice=0
      let goods_id=res.currentTarget.dataset.goodsid;
      let _this=this
      _this.data.goodsList.forEach((value)=>{
        if(value.goods_id==goods_id){
          value.checked=!value.checked
        }
        if(value.checked){
          totalprice +=value.goods_num*value.shop_price
        }
      })
      _this.setData({
        totalprice:totalprice,
      })
    },
    /**减一件商品 */
    decr:function(res){
      let goods_id=res.currentTarget.dataset.goodsid;
      wx.request({
        url: apihost+'/api/decr?goods_id='+goods_id,
        
      })
    },
    /**添加一件商品 */
    add:function(res){
      let _this=this
      let goods_id=res.currentTarget.dataset.goodsid;
      wx.request({
        url: apihost+'/api/add?goods_id='+goods_id,
        success(res){
          _this.setData({
            addlist:res.data.data.list
          })
        }
      })
    },
    /**删除所有商品 */
    delete:function(){
      let token=wx.getStorageSync('token')
      wx.request({
        url: apihost+'/api/delete?token='+token,
        success(res){
          if(res.data.error==0){
            wx.showToast({
              title: '删除成功',
              icon:'success',
              duration:2000
            })
          }
        }
      })
    },
    /**单独删除 */
    del:function(res){
      let goods_id=res.currentTarget.dataset.goodsid;
      wx.request({
        url: apihost+'/api/del?goods_id='+goods_id,
        success(res){
          if(res.data.error==0){
            wx.showToast({
              title: '删除成功',
              icon:'success',
              duration:2000
            })
          }
        }
      })
    },
    /**购物车列表 */
    getCartlist:function(){
      let _this=this;
      let token=wx.getStorageSync('token')
      wx.request({
        url:apihost+'/api/list?token='+token,
        success(res){
          if(res.data.error==0){
            _this.setData({
              goodsList:res.data.data.list,
              count:res.data.data.count,
            })
          }
        }
      })
    },
    /**
     * 页面加载
     */
  onLoad:function(){
    //购物车列表
    this.getCartlist();
  },
  /**生命周期函数--监听页面显示 */
  onShow:function(){
    //购物车列表
    this.getCartlist();
  }
})
