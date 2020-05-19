//把公共域名提取出来，以后域名发生变化，直接改这里面就可以了
const BASE_URL = "https://www.xiongmaoyouxuan.com"
// const BASE_URL = "https://ku.qingnian8.com"

const myRequest = (url,method,data) => { //myRequest方法名
  return new Promise((resolve, reject) => {//promise两个参数：resolve,reject：请求成功或者失败
    wx.request({
      url: BASE_URL + url,
      method: method,//默认是get方式
      data: data,//如果没有参数就为空
      success: (res) => {
        if (res.statusCode !== 200) {
          return wx.showToast({
            title: "获取数据失败",
            duration: 2000
          })
        }
        resolve(res)
      },
      //请求接口失败
      fail(err) {
        wx.showToast({
          title: "获取数据失败",
          duration: 2000
        })
        reject(err)
      }
    })
  })
} 

module.exports = {
  myRequest,
   getSearchTitle:(data) => {
     return myRequest("/api/search/home","GET")
   },
   getSearch:(data) => {
     return myRequest("/api/search","GET",data)
   },
   getNavTitle:(data) => { //获取导航
     return myRequest("/api/tabs","get",data)
   },
   getNavList:(id,data) => {
     return myRequest('/api/tab/'+id,'GET',data)
   },
   getGoodsList:(id,Data) => {
     return myRequest('/api/tab/'+id+'/feeds','get',Data)
   }
}