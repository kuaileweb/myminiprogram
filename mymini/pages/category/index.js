// pages/category/index.js
import {request} from '../../request/idnex'
Page({  
  /**
   * 页面的初始数据
   */
  data: {
    leftList:[],
    rightContent:[],
    selectColor:0,
    scrollTop:0,//设置每次切换时滚动条位置为0
  },
  // 定义一个空数组接收返回值
  cates:[],
  getDetail(){
    request({url:"categories"}).then(res=>{
      console.log(res);
      // 把数据放入空数组中
      this.cates = res.data.message;

      // 把收到数据放在缓存中，并加上事件戳
      wx.setStorageSync("cates",{time:Date.now(),data:this.cates})

      // 使用map映射到data对象的属性中
      let leftList = this.cates.map(item=>item.cat_name);
      let rightContent = this.cates[0].children
      this.setData({
        leftList,
        rightContent
      })
    })
  },
  getID(e){
    // 获取点击传入的id值
    let {id} = e.currentTarget.dataset;
    // 每次获得id值在获取数组中下标为id的元素
    let rightContent = this.cates[id].children;
    // 修改data中的数据属性时会自动获取索引下标的数据，重新渲染页面
    this.setData({
      selectColor:id,
      rightContent,
      scrollTop:0//每次点击时都把滚动条顶部距离设置为0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 使用缓存功能
    /**
     * 1.当如果缓存中没有数据时就发送请求
     * 2.但是当浏览器有缓存时且缓存数据没有过期就使用缓存的数据
     */
    let cates = wx.getStorageSync("cates");
    if(!cates){
      this.getDetail();
      console.log(33333)
    }else{
      if(Date.now() - cates.time >1000 *200){
        this.getDetail();
        console.log(222222)
      }else{
        /**
         * 如果没有过期就把缓存中的数据拿出来直接渲染页面
         */
        this.cates = cates.data;
        let leftList = this.cates.map(item=>item.cat_name);
        let rightContent = this.cates[0].children
        this.setData({
          leftList,
          rightContent
        })
        console.log(11111)
      }
    }
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

  }
})