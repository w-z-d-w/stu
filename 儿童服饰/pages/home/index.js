// pages/home/index.js
import axios from '../../request/request';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperBanner: [],
    catagy: [],
    miaosha: [],
    baopin: [],
    goodList: [],
    myPage: 1,
    inputValue: '',
  },
  getinputValue(e) {
    // console.log(e.detail.value);
    this.setData({
      inputValue: e.detail.value,
    })
  },
  searchFun() {
    if (this.data.inputValue.trim() !== '') {
      wx.navigateTo({
        url: `../search/index?value=${this.data.inputValue}`,
      })
    } else {
      wx.showToast({
        title: '请输入搜索信息',
        icon: 'none',
      })
    }
  },
  categotyData(e) {
    console.log(e.currentTarget.dataset);
    const {
      id,
      index
    } = e.currentTarget.dataset;
    let careData = {
      id,
      index,
    }
    wx.setStorage({
      key:'cateData',
      data: careData
    });
    wx.switchTab({
      url: '../fication/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    axios.querySwiperData({
      type: 'index'
    }).then(res => {
      // console.log(res.data.data);
      this.setData({
        swiperBanner: res.data.data,
      })
    }).catch(err => {
      console.log(err);
    });
    // 图标
    axios.queryCatagyData({}).then(res => {
      if (res.statusCode == 200) {
        console.log(res.data.data);
        this.setData({
          catagy: res.data.data,
        })
      }
    }).catch(err => {
      console.log(err);
    });
    // 秒杀
    axios.queryMiaosha({
      miaosha: true
    }).then(res => {
      if (res.statusCode == 200) {
        // console.log(res.data.data);
        res.data.data.forEach(item => {
          item.dateStart = 30 * 60 * 60 * 1000;
        })
        this.setData({
          miaosha: res.data.data,
        })
      }
    }).catch(err => {
      console.log(err);
    })
    // 爆品
    axios.queryBaopin({
      recommendStatus: 1
    }).then(res => {
      // console.log(res.data.data);
      this.setData({
        baopin: res.data.data
      })
    }).catch(err => {
      console.log(err);
    });
    // 商品列表
    let list = {
      catagoryId: '',
      page: this.data.myPage,
      pageSize: 10,
    }
    axios.queryGoodsList(list).then(res => {
      // console.log(res.data.data);
      this.setData({
        goodList: res.data.data,
      })
    }).catch(err => {
      console.log(err);
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let pageNum = this.data.myPage + 1;
    this.setData({
      myPage: pageNum,
    })
    let list = {
      catagoryId: '',
      page: this.data.myPage,
      pageSize: 10,
    }
    axios.queryGoodsList(list).then(res => {
      console.log(res.data);
      if (res.data.code != 700) {
        this.setData({
          goodList: [...this.data.goodList, ...res.data.data],
        })
      } else {
        wx.showToast({
          title: '暂时没有更多数据!',
          icon: 'none',
        })
      }
    }).catch(err => {
      console.log(err);
    })
  },
})