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
       wx.showModal({
         title:'提示',
         content:'是否删除？',
         success(res){
          if(res.confirm){  //点击确定处理
            wx.request({
              url: apihost+'/api/delete?token='+token,
              success(res){
                if(res.data.error==0){
                  wx.showToast({
                    title: '删除成功',
                    icon:'success',
                    duration:2000
                  })
                }else if(res.cancel){
                  wx.showToast({
                    title: '取消成功',
                    icon:'success',
                    duration:2000
                  })
                }
              }
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
    /**购物车全部单选就全选 */
    selectGoods:function(e){
      //获取checkbox中选中的value
      let goods=e.detail.value;
      //获取当前页面商品列表
      let list=this.data.goodsList;
      let total=0
      list.forEach(item=>{
        item.checked=false;
        goods.forEach(item2=>{
          if(item.goods_id==item2){
            item.checked=true; //记录选中的状态
            total+=item.shop_price*item.goods_num;
          }
        })
      })
      let isselectAll=list.every(function(item){
        return item.checked;
      })
      this.setData({
        totalprice:total,
        selectAll:isselectAll
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
