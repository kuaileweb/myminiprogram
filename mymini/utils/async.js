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
// 导出封装好的方法
module.exports = {
  getScoped,getAddress,openAddress
}