// pages/search/index.js
import axios from '../../request/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['综合', '新品', '销量', '价格'],
    searchValue: '',
    activeColor: 0,
    searchList: [],
  },
  filter(e) {
    let {
      index
    } = e.currentTarget.dataset;
    this.setData({
      activeColor: index
    })

    let obj = {
      0: '',
      1: 'addedDown',
      2: 'ordersDown',
      3: 'priceUp'
    };
    console.log(obj[index]);
    let param = {
      orderBy: obj[index],
      page: 1,
      pageSize: 500,
      k: this.data.searchValue
    };
    console.log(param);
    axios.querySearchList(param).then(res => {
      console.log(res.data.data);
      this.setData({
        searchList: res.data.data
      })
    }).catch(err => {
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.value);
    this.setData({
      searchValue: options.value,
    })
    this.searchFun(options.value)
  },
  searchFun(value) {
    let param = {
      orderBy: 'priceUp',
      page: 1,
      pageSize: 500,
      k: value
    }
    axios.querySearchList(param).then(res => {
      console.log(res.data.data);
      this.setData({
        searchList: res.data.data
      })
    }).catch(err => {
      console.log(err);
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