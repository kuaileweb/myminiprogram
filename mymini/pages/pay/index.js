// pages/cart/index.js
import {getScoped,getAddress,openAddress,showModal,showToast} from '../../utils/async.js';
// import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  }, 
  /**
   * 1.绑定点击事件获取用户地址wx.chooseAddress()函数
   * 2 如果用户点击本次事件时，取消授权就需要用户打开获取地址权限
   * 3 查看用户权限中的scope属性状态 wx.openSetting()
   * 4 让用户自己打开授权窗口wx.setSetting
   */
  onShow: function () {
    // 在页面显示时获取本地存储的数据
    let address = wx.getStorageSync('address');
    // 获取缓存中isCheck值为true的才显示到页面
    let cart = wx.getStorageSync('cart')||[];
    // 使用过滤方法filter,会返回一个元素值符合条件的的数组
    let cartCheck = cart.filter(elem=>elem.isCheck);
    // 获取缓存中的购物车数据中的状态值
    let totalPrice = 0;//商品的总价格
    let totalNum = 0;//商品的总数量
    cartCheck.forEach(elem => {
        totalPrice += elem.goods_price * elem.num;
        totalNum += elem.num;
    });
    this.setData({
      totalPrice,
      totalNum,
      cart:cartCheck,
      address
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */

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