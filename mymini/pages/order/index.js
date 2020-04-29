// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        goods_title:"商品收藏",
        isActive:true
      },
      {
        id:1,
        goods_title:"品牌收藏",
        isActive:false
      },
      {
        id:2,
        goods_title:"店铺收藏",
        isActive:false
      },
      {
        id:3,
        goods_title:"浏览足迹",
        isActive:false
      }
    ],
    // 获取本地存储中的商品收藏数据
    collectList:[]
  },
  getChildren(e){
    // 使用解构获取子组件传递过来的参数
    let {index} = e.detail;
    // 在改变传递给子组件的值
    let tabs = this.data.tabs;
    tabs.forEach((elem,i)=>i === index?elem.isActive=true:elem.isActive=false);
    // 修改tabs属性
    this.setData({
      tabs,
      index
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
   * 1 获取本地存储中的收藏商品数组
   * 2 如果没有就不渲染页面
   */
  onShow: function () {
    let collect = wx.getStorageSync('collect')||[];
    this.setData({
      collectList:collect
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