// pages/orderDetails/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{ //商品列表
      id: 2,
      img: 'https://wx.yogalt.com/file/images/img1.jpeg',
      name: "榴恋草莓蛋糕-2磅188元/138元/4磅298元（深圳）",
      spec: "2磅，+19.9元得水果（中盒）…",
      price: 999.00,
      num: 2,
      select: false,
    },
    {
      id: 3,
      img: 'https://wx.yogalt.com/file/images/img1.jpeg',
      name: "榴恋草莓蛋糕-2磅188元/138元/4磅298元（深圳）",
      spec: "2磅，+19.9元得水果（中盒）…",
      price: 999.01,
      num: 1,
      select: false
    }],
    address:null,
    data:null
  },
  // gopay: function () {
  //   // wx.navigateTo({
  //   //   url: '../detail/detail'
  //   // })
  //   var that = this;
  //   var nonce = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 8));
  //   nonce = nonce.toString()
  //   var total = that.data.totalPrice;
  //   // total = total.toString();
  //   console.log(nonce)
  //   console.log(total)
  //   console.log(nonce + "a" + total)

  //   wx.request({
  //     // url: app.globalData.apiHost + '/wxPay?openid=' + wx.getStorageSync('openId'),
  //     url: 'http://localhost:3000/pay',
  //     // method: 'get',
  //     // data: {
  //     //   "money": "1000",
  //     // },
  //     // dataType: 'json',
  //     // header: {
  //     //   'content-type': 'application/json'
  //     // },
  //     success: function (res) {
  //       console.log(res)
  //       console.log(res.data.appId)
  //       if (res.data.code == 0) {
  //         var payModel = res.data.msg;
  //         wx.requestPayment({
  //           'timeStamp': payModel.timestamp,
  //           'nonceStr': payModel.nonceStr,
  //           'package': payModel.package,
  //           'signType': 'MD5',
  //           'paySign': payModel.paySign,
  //           'success': function (res) {
  //             wx.showToast({
  //               title: '支付成功',
  //               icon: 'success',
  //               duration: 2000
  //             })
  //             console.log("dasda", payModel.package.substr(10))
  //             that.addOrder(payModel.out_trade_no, payModel.package.substr(10))
  //           },
  //           'fail': function (res) {
  //           }
  //         })
  //       }
  //     },
  //     fail: function () {

  //     }
  //   })
  // },
  gopay:function(){
    wx.request({
      url: 'http://localhost:3000/pay',
      success: function (res) {
        console.log(res);
        console.log(res.data.appId);
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
            console.log("成功");
          },
          'fail': function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options)
    app.http('v1/order/get', { id: options.id},"POST").then(res=>{
      console.log(res)
      if(res.code == 200){
        this.setData({data:res.data})
      }
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
    this.setData({
      address: app.globalData.userInfo.address
    })
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

  }
})