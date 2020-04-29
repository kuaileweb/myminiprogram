// pages/search/index.js
import {request} from '../../request/idnex'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    searchList:[],
    isData:false,
    isWrite:true
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 1 调用封装好的请求方法
   * 2 使用获取到的输入框内的信息发送请求
   */
  async getInputData(value){
    let res = await request({url:"goods/qsearch",data:{query:value}})
    let searchList = res.data.message;
    if(searchList.length !== 0){
      this.setData({
        isData:false,
        searchList
      })
    }else{
      this.setData({
        isData:true,
        searchList:[]
      })
    }
  },
  timer:0,
  /**
   * 1 绑定搜索框input输入事件获取输入的值
   * 2 设置一个定时器编号，当用户输入信息时隔一段时间才发送请求
   */
  handleInput(e){
    // console.log(e)
    let {value} = e.detail;
    if(!value.trim()){
      this.setData({
        searchList:[]
      })
      return;
    }
    this.setData({value,isWrite:false})
    // 首先清除定时器
    clearTimeout(this.timer)
    this.timer = setTimeout(()=>{
      this.getInputData(value);
    },1000);
  },
  /** 
   * 点击时清除输入框内的内容
  */
  handleClearInput(){
    this.setData({
      value:"",
      searchList:[],
      isWrite:true,
      isData:false
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

  }
})