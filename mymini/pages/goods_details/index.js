// pages/goods_details/index.js
import {request} from '../../request/idnex'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetails:{}
  },
  async getDetailList(goods_id){
    let res = await request({url:"goods/detail",data:{goods_id}});
    let goodsDetails = res.data.message;
    this.setData({
      goodsDetails:{
        // 因为后端穿过来的数据太多没有用到，所以把使用到的数据提取出来
        goods_name:goodsDetails.goods_name,
        pics:goodsDetails.pics,
        goods_price:goodsDetails.goods_price,
        // 因为一些iphone手机不支持.webp格式,所以要使用正则替换成.jpg格式
        goods_introduce:goodsDetails.goods_introduce.replace(/\.webp/g,'.jpg')
      }
    })
    this.goodsInfo = goodsDetails;
    console.log(res)
    console.log(this.data.goodsDetails.pics)
  },
  /**
   * 1 需要在点击轮播图时可以直接放大
   * 2 而后可以这及滑动，需要使用wx提供的一个api，previewImage,
   * 3 但是点击时，请求接口还没返回数据，所以要定义一个属性先接受
   */
  goodsInfo:{},
  handlePreviewImage(e){
    // 使用map生成一个新的图片url数组
    let urls = this.goodsInfo.pics.map(item=>item.pics_mid);
    console.log(this.goodsInfo)
    // 接收传递过来的url参数
    let current = e.currentTarget.dataset.url;
    // 使用wx点击图片接口接口
    wx.previewImage({
      current,
      urls
    })
  },
  /**
   * 1 点击把数据加入购物车
   * 2 判断本地存在中有没这个数据
   * 3 如果没有就把数据加入到本地存储中
   * 4 如果数据已存在就把这条数据加1
   */
  handleAddCart(){
    // 获取本地存储数据,如果不存在返回的是空字符串，就转为数组
    let cart = wx.getStorageSync("cart")||[];
    // 获取本地存储中和本次加入的数据是否相同,找到会返回本条数据的索引值。找不到会返回-1
    let index = cart.findIndex(elem=>elem.goods_id===this.goodsInfo.goods_id);
    // 判断本条数据是否存在
    if(index===-1){
      // 如果不存在就设置一个数量值，再把这条数据加入到购物车
      this.goodsInfo.num = 1;
      // 添加到购物车时为选中状态
      this.goodsInfo.isCheck = true;
      cart.push(this.goodsInfo)
    }else{
      // 如果存在会返回本条数据的索引值，再把数量值num++
      cart[index].num++;
    }
    // 再重新把数据加入到本地存储中
    wx.setStorageSync('cart',cart)
    // 在提示用户本次加入购物车成功
    wx.showToast({
      title:"加入成功",
      icon:"success",
      // 防止用户多次点击 ，只有等提示框取消后才能再次点击屏幕
      mask:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let goods_id = options.goods_id;
    this.getDetailList(goods_id)
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