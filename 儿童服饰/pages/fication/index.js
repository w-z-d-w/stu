// pages/fication/index.js
import axios from '../../request/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollList: [],
    activeSc: 0,
    goodList: [],
  },
  activeFun(e) {
    let {
      id,
      index
    } = e.currentTarget.dataset;
    this.setData({
      activeSc: index,
    })
    this.getCategoryFun(id);
  },
  onShow: function () {
    let id = undefined;
    wx.getStorage({
      key: 'cateData',
      success: (res) => {
        // console.log(id = res.data.id);
        id = res.data.id,
        this.setData({
          activeSc: res.data.index,
        })
        console.log(id);
        if (id != undefined ){
          this.getCategoryFun(id);
        }
      }
    });
    wx.removeStorage({
      key: 'cateData',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryFun(1872);
    // let id = '';
    axios.queryCatagyData({}).then(res => {
      if (res.statusCode == 200) {
        // console.log(res.data.data);
        // id = res.data.data[0].id
        this.setData({
          scrollList: res.data.data,
        })
      }
    }).catch(err => {
      console.log(err);
    });
 
  },
  getCategoryFun(id) {
    const param = {
      categoryId: id,
      page: 1,
      pageSize: 500
    }
    axios.querySearchList(param).then(res => {
      console.log(res.data.data);
      this.setData({
        goodList: res.data.data || [],
      })
    }).catch(err => console.log(err))
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