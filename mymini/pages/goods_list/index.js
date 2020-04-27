// pages/goods_list/index.js
import {request} from '../../request/idnex';
import regeneratorRuntime from '../../lib/runtime/runtime';
// 引入ES7中的async进行同步的调用数据

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        goods_title:"综合",
        isActive:true
      },
      {
        id:1,
        goods_title:"销量",
        isActive:false
      },
      {
        id:2,
        goods_title:"价格",
        isActive:false
      }
    ],
    index:0,
    goodsList:[],
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
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  tatolNum:1,
  async  getGoodList(){
    let res = await request({url:"goods/search",data:this.QueryParams});
    // 获取数据列表
    let goods = res.data.message.goods;
    // 把数据列表使用concat拼接到数组中
    // 获取数据的总条数
    let total = res.data.message.total;
    // 计算数据总共有多少页
    this.tatolNum = Math.ceil(total/this.QueryParams.pagesize);
    // 修改数据
    this.setData({
      goodsList:[...this.data.goodsList,...goods]
    });
    // 数据请求回来时关闭下拉刷新
    wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodList()
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
    /**
     * 1 刷新页面需要重置数据 数组
     * 2 页码要变为 1 
     * 3 下拉刷新时数据已经回来，二状态刷新栏还在显示，所以需要在数据请求回来时，手动关闭
     */
    this.QueryParams.pagenum = 1;
    this.setData({
      goodsList:[]
    });
    this.getGoodList();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    /**
     * 1 判断是否还有下一页
     * 2 如果有下一页就再次调用接口获取数据
     * 3 如果没有下一页就发送一个信息弹出框告诉客户
     */
    if(this.QueryParams.pagenum >= this.tatolNum){
      wx.showToast({title:"没有下一页了"})
    }else{
      this.QueryParams.pagenum ++;
      this.getGoodList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})