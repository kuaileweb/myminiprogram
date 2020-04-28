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
    allCheck:true,
    totalPrice:0,
    totalNum:0
  }, 
  /**
   * 1.绑定点击事件获取用户地址wx.chooseAddress()函数
   * 2 如果用户点击本次事件时，取消授权就需要用户打开获取地址权限
   * 3 查看用户权限中的scope属性状态 wx.openSetting()
   * 4 让用户自己打开授权窗口wx.setSetting
   */
  async handleChooseAddress(){
    // 1. 获取用户的权限状态
    try {
        // 调用封装好的promise函数
      let result = await getScoped();
      let scope = result.authSetting["scope.address"];
      // 在进行判断用户此时的权限状态
      if(scope===false){
        // 让用户自己给予权限,因为不管状态是true还是false都要调用获取地址的方法，所以直接给scope判断为false，可以优化代码
        await openAddress();
      }
      // 调用获取用户地址的方法
      let address = await getAddress();
      // 在把数据存储到本地存储中
      wx.setStorageSync('address', address)
    } catch (error) {
      console.log(error)
    }
  },
  onShow: function () {
    // 在页面显示时获取本地存储的数据
    let address = wx.getStorageSync('address');
    // 因为如果此数据不存在时会返回一个空字符串，类型会不正确，所以加上一个判断
    let cart = wx.getStorageSync('cart')||[];
    // 调用封装好的方法
    this.setCart(cart);
    this.setData({
      address,
      cart
    })
  },
  /** 
   * 1 需要在改变商品勾选状态来计算总价和全选的状态值
   * 2 不使用索引是因为当商品删除时会产生bug
  */
  handleChangeItem(e){
    // 获取当前元素的goods_id
    let goods_id = e.currentTarget.dataset.id;
    // 使用id来进行修改在数据中的状态值
    let index = this.data.cart.findIndex(elem=>elem.goods_id===goods_id);
    let {cart} = this.data;
    cart[index].isCheck = !cart[index].isCheck;
    this.setCart(cart)
    wx.setStorageSync('cart',cart);
  },
  // 在此处进行封装一个操作数据的总价和选择状态的方法，方便来回调用
  setCart(cart){
    // 获取缓存中的购物车数据中的状态值
    let totalPrice = 0;//商品的总价格
    let totalNum = 0;//商品的总数量
    let allCheck = true;//全选状态
    // 因为cart为空数组时默认不执行循环，所以全选状态为true
    allCheck = cart.length?true:false;
    cart.forEach(elem => {
      if(elem.isCheck){
        // 当只有商品状态被选中时才做计算
        totalPrice += elem.goods_price * elem.num;
        totalNum += elem.num;
      }else{
        // 因为如果有一个商品的状态不为true那么全选的状态就是false
        allCheck = false;
      }
    });
    this.setData({
      totalPrice,
      totalNum,
      allCheck,
      cart
    })
  },
  // 点击全选时应该要取消掉所有的商品状态值
  changeAllcheck(e){
    let {allCheck,cart} = this.data;
    allCheck = !allCheck;
    // 当点击这个元素时，allCheck属性为false时，就需要把所有的商品属性改为false
    cart.forEach(elem=>elem.isCheck=allCheck);
    this.setCart(cart);
    wx.setStorageSync('cart', cart)
  },
  /**
   * 1 点击加减按钮时改变商品的数量
   * 2 同时在修改data中数据
   * 3 在把数据放入到存储中
   */
  async handleNum(e){
    // 获取传递过来的值
    let {id,num} = e.currentTarget.dataset;
    // 需要获取到cart 数组
    let {cart} = this.data;
    // 通过获取到的id再获取本条数据在数组中的索引
    let index = cart.findIndex(elem=>elem.goods_id===id);
    // 但是用户点击减号时会出现负数,使用wx.showModel来提醒用户是否要删除该商品
    if(cart[index].num===1&&num===-1){
      // 在此处调用封装好的用户确认或取消按钮
      let res = await showModal("确认删除此商品嘛？")
      // 使用回返后的参数进行判断
      if(res.confirm){
        // 如果用户确认，删除此商品,在更新购物车
        cart.splice(index,1);
        this.setCart(cart);
        wx.setStorageSync('cart', cart)
      }
    }else{
      // 在根据传递过来的num进行计算
      cart[index].num+=num;
      this.setCart(cart);
      wx.setStorageSync('cart', cart)
    }
  },
  /** 
   * 1 当用户点击结算时需要判断购物车内的商品是否选中
   * 2 判断用户是否有收获地址
  */
 async handlePay(){
  let {totalNum,address} = this.data;
  //  判断是否有商品被选中
  if(totalNum===0){
    await showToast({title:"您还没有选中商品"})
    return;
  }
  // 在判断是否有收获地址,使用里面任意一个属性来判断
  if(!address.userName){
    await showToast({title:"你还没有收货地址"})
    return;
  }
  // 经过验证后可以跳转到支付页面
  wx.navigateTo({
    url: '/pages/pay/index',
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