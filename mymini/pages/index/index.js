//index.js
//获取应用实例
import {request} from '../../request/idnex'

Page({
  data: {
    swiperList:[],
    catesList:[],
    floorList:[]
  },
  //事件处理函数
  getBanner(){
    request({url:"home/swiperdata"}).then(res=>{
      this.setData({
        swiperList:res.data.message
      })
      console.log(this.data.swiperList)
    })
  },
  getCate(){
    request({url:"home/catitems"}).then(res=>{
      this.setData({
        catesList:res.data.message
      })
      console.log(this.data.catesList)
    })
  },
  getFloor(){
    request({url:"home/floordata"}).then(res=>{
      this.setData({
        floorList:res.data.message
      })
      console.log(this.data.floorList)
      console.log(res)
    })
  },
  onLoad: function () {
    this.getBanner();
    this.getCate();
    this.getFloor();
  }
})
