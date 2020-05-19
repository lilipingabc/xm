//index.js
//获取应用实例
// import myRequest from '../../utils/request.js'
const getNavTitle = require('../../utils/request.js').getNavTitle
const getNavList = require('../../utils/request.js').getNavList
const getGoodsList = require('../../utils/request.js').getGoodsList
const app = getApp()

Page({
  data: {
    nav: [],
    choose: [],
    goodsList:[],//商品列表
    TabCur: 0,
    id: '',
    start:20//分页数据
  },
  onLoad() {
    this.getNav()
  },
  //获取导航
  getNav() {
    getNavTitle({
      sa: ''
    }).then(res => {
      let that = this
      //console.log(res.data.data.list)
      that.setData({
        nav: res.data.data.list
      })
    })
  },
  //点击导航获取id
  handleToNav(e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    this.setData({
      id: e.currentTarget.dataset.id
    })
    let data = {
      start:0
    }
    getNavList(id,data).then(res=>{
      //console.log(res.data.data.categories)
      let that = this;
      that.setData({
        choose: res.data.data.categories
      })
    })
    let Data ={
      start:this.data.start,
      sort:0
    }
    getGoodsList(id,Data).then(res=>{
      console.log(res.data.data.list,"abc")
      let that = this;
      that.setData({
        goodsList: [...this.data.goodsList, ...res.data.data.list]
      })
    })
  },
   onReachBottom() {
    this.data.start++;
    
  }
})
