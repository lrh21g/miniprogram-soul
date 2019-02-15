import { ClassicModel } from '../../models/classic.js'
import { BookModel } from '../../models/book.js'

import { promisic } from '../../util/common.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false, // 用户是否授权
    userInfo: null, // 用户信息
    bookCount: 0, // 书籍数量
    classics: null // 喜欢的期刊
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.userAuthorized1()
    this.getMyBookCount()
    this.getMyFavor()
  },

  // 获取我喜欢的期刊
  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },

  // 获取我喜欢书籍的数量
  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },

  userAuthorized1() {
    promisic(wx.getSetting)()
      .then(data => {
        if (data.authSetting['scope.userInfo']) {
          return promisic(wx.getUserInfo)()
        }
        return false
      })
      .then(data => {
        if (!data) return 
        this.setData({
          authorized: true,
          userInfo: data.userInfo
        })
      })
  },

  userAuthorized() {
    // wx.getSetting：获取用户的当前设置，返回值中只会出现小程序已经向用户请求过的权限。
    wx.getSetting({
      success: data => {
        // 如果用户已授权，则通过 wx.getUserInfo 获取用户信息
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  // 获取用户信息
  onGetUserInfo (event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  // 跳转至关于我们的页面
  onJumpToAbout (event) {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  onJumpToDetail(event) {
    const cid = event.detail.cid
    const type = event.detail.type
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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