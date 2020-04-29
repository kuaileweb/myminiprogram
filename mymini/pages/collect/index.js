// pages/collect/index.js
import {request} from '../../request/idnex';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    tabs:[
      {
        id:0,
        goods_title:"全部订单",
        isActive:true
      },
      {
        id:1,
        goods_title:"代付款",
        isActive:false
      },
      {
        id:2,
        goods_title:"待收货",
        isActive:false
      },
      {
        id:2,
        goods_title:"退款/退货",
        isActive:false
      }
    ],
    orders:[]
  },
  getChildren(e){
    // 使用解构获取子组件传递过来的参数
    let {index} = e.detail;
    this.changeIndex(index);
  },
  // 封装此方法便于在每一个页面中调用
  changeIndex(index){
    // 在改变传递给子组件的值
      let {tabs} = this.data;
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
   * 1 定义一个发送请求的方法
   * 2 在页面显示时调用
  */
  async getOrderList(type){
    let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
    let header = {Authorization:token};
    let res = await request({url:"my/orders/all",data:{type},header})
    let {orders} =res.data.message; 
    orders.forEach(elem=>elem.create_time = new Date(elem.create_time * 1000).toLocaleString());
    console.log(orders)
    this.setData({orders})
  },
  
  /**
   * 1 获取页面中跳转时携带的参数
   * 2 小程序中分为页面栈 也是一个数组
   * 3 但是小程序页面栈中只保存十个页面
   * 4 使用getCurrentPage 方法可以获取页面中的参数值
   * 5 此页面在页面栈中的索引是最大的那个
   */
  onShow: function () {
    let pages = getCurrentPages();
    let {type} = pages[pages.length-1].options;
    console.log(type)
    // 因为tabs组件的索引是从0开始，type是从1开始，所以要减一
    this.changeIndex(type-1);
    this.getOrderList(type);
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