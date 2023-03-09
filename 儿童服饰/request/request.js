// 发送请求的工具类
const AIP_BASE_URL = 'https://api.it120.cc'
const request = (url, method, data) => {
  return new Promise((resolve, rejects) => {
    wx.request({
      url: AIP_BASE_URL + url,
      data: data, // 参数
      method: method,
      header: {
        'Content-Type': 'application/x-www-from-urlencoded'
      },
      timeout: 0,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        rejects(err)
      },
    })
  })
}
module.exports = {
  querySwiperData: (data) => {
    return request('/tz/banner/list', 'get', data); // 轮播图接口
  },
  queryCatagyData: (data) => {
    return request('/tz/shop/goods/category/all', 'get', data)
  },
  // 秒杀
  queryMiaosha: (data) => {
    return request('/tz/shop/goods/list', 'get', data)
  },
  queryBaopin: (data) => {
    return request('/tz/shop/goods/list', 'get', data)
  },
  queryGoodsList: (data) => {
    return request('/tz/shop/goods/list', 'get', data)
  },
  querySearchList: (data) => {
    return request('/tz/shop/goods/list', 'get', data)
  },
  queryDetailSwiper: (data) => {
    return request('/tz/shop/goods/detail','get',data)
  },
}