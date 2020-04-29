// 封装获取用户权限状态的函数
let getScoped = ()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success: (res) => {
        resolve(res)
      },
    })
  })
}
// 封装获取用户地址的方法
let getAddress = ()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success: (res) => {
        resolve(res)
      },
      fail:err=>{
        reject(err)
      }
    })
  })
}
// 封装用户自己打开地址权限的方法
let openAddress = ()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success: (res) => {
        resolve(res)
      },
    })
  })
}
// 使用promise封装用户点击购物车商品数量少于1时的取消或确认
let showModal = (content)=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title:"提示",
      content:content,
      success:res=>{
        resolve(res)
      },
      fail:err=>{
        reject(err);
      }
    })
  })
}
// 使用promise封装一个提示框的方法
let showToast = ({title})=>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title,
      icon:"none",
      mask:true
    })
  })
}
// 导出封装好的方法
module.exports = {
  getScoped,getAddress,openAddress,showModal,showToast
}