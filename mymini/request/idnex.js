/**
 * 因为使用加载图时有可能一个页面会调用几次这个请求
 * 设置一个变量，发送了几次请求就加几次
 * 然后在请求完成时在减减
 */
let ajaxTime = 0;
 const request = (params)=>{
  return new Promise(
    (resolve,reject)=>{
      let baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1/';
      // 在数据请求前写一个消息加载框
      wx.showLoading({
        title: '加载中...',
        mask:true
      })
      ajaxTime++;
      wx.request({
        ...params,
        url:baseUrl + params.url,
        success:res=>{
          resolve(res)
        },
        fail:err=>{
          reject(err)
        },
        complete:()=>{
          ajaxTime--;
          if(ajaxTime===0){
            // 当ajaxTime=0时，在取消消息加载框
            wx.hideLoading();
          }
        }
      })
    }
  )
}
module.exports = {
  request
}
