// pages/search/search.js
const getSearchTitle = require('../../utils/request.js').getSearchTitle
const getSearch = require('../../utils/request.js').getSearch
Page({
  data: {
    searchTitle:[],//搜索标题
    value:''
  },
  onLoad: function (options) {
    this.getSearchTitle()
  },
  //获取搜索标题
  getSearchTitle(){
    getSearchTitle({//接口名字

    }).then(res=>{
      let that = this;
      //console.log(res.data.data.hotWords)
      that.setData({
        searchTitle: res.data.data.hotWords
      })
    })
  },
  //获取输入框的内容
  changeVal(e){
    //console.log(e.detail.value)
    let value = e.detail.value
    this.setData({
      value:value
    })
  },
  search(){
    let value = this.data.value;
    getSearch({
      word: value,
      start: 0,
      sort: 0,
      couponOnly: NaN,
      minPrice: 0,
      maxPrice: 99999
    }).then(res=>{
      console.log(res)
    })
  }
})