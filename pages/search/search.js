var fileData = require('../../utils/md5.js');
var app = getApp().globalData;
var token="";
// var searchvalue="";
Page({
  data: {
    searchValue:"",
    searchData:"",
  },
  onLoad:function(){
    var that=this;
    var searchData = wx.getStorageSync('searchData') || [];
    app.Hisrecords = searchData.reverse()
    if (app.Hisrecords.length!=0){
      that.setData({
        searchData: app.Hisrecords,
        deletebtnhidden: true
      });
    } 
    searchterm(that)
  },
  onShow: function () {
    this.setData({
      searchValue:""
    }) 
  }, 

  //输入内容时
  searchActiveChangeinput: function (e) {
    var val = e.detail.value;
    this.setData({
      showClearBtn: val != '' ? true : false,
      searchValue: val,
      searchinfo: val != '' ? false : true,
    })

  },
  //点击清除搜索内容
  searchActiveChangeclear: function (e) {
    this.setData({
      showClearBtn: false,
      searchValue: '',
    })
  },
  //点击聚集时
  focusSearch: function () {
    if (this.data.searchValue) {
      this.setData({
        showClearBtn: true
      })
    }
  },
  //搜索提交
  searchSubmit: function (event) {
    var that = this;
    var val = that.data.searchValue;
    cache(that, val)
     
  }, 
  //推荐产品跳转
  bindhistory:function(e){    
    var val = e.currentTarget.dataset.itemname; 
    var that = this;
    cache(that, val) 
  },
  //清除历史记录
  deleteHistory: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除历史搜索',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('searchData', []);
          that.setData({
            searchData: "",
            deletebtnhidden: false,
          });
        }
      }
    })
  },

})
// //本地缓存
// function cache(that, val){
//   var searchData = wx.getStorageSync('searchData') || [];
//   console.log(searchData)
//   if (val!=""){
//     searchData.push(val)
//   }
//   wx.setStorageSync('searchData', searchData)
//   var arr = searchData.reverse()
//   app.Hisrecords = arr
//   that.setData({
//     searchData: arr,
//     showClearBtn: false
//   });   
//   if (val) {
//     that.setData({
//       deletebtnhidden: true
//     });
//     searchresult(val)
//   } 
// }
//获取搜索词
// function searchterm(that){
//   var mod = "shiword",
//       parm = "1"
//      md5(parm, mod)
//   wx.request({
//     url: "http://jd.2004.com/",
//     data: {
//       parm:parm,
//       token:token,
//       mod:mod,
//     },
//     success: function (res) { 
//       that.setData({
//         searchterm: res.data.data, 
//       });
//     }
//   })
// }
// function searchresult(val) {
//   wx.navigateTo({
//     url: "search",
//   })
// }

function md5(parm, mod) {
  var my_provin = parm + mod + "3trf6572dft565yt";
  var md5_provin = fileData.hexMD5(my_provin);
  var md5_1_provin = md5_provin.substr(0, 3);
  var md5_2_provin = md5_provin.substr(8, 3);
  var md5_3_provin = md5_provin.substr(16, 3);
  var md5_4_provin = md5_provin.substr(24, 3);
  token = md5_1_provin + md5_2_provin + md5_3_provin + md5_4_provin;
}

























