import { BookModel } from '../../models/book.js'
import { random } from '../../util/common.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [], // 热门书籍列表数据
    searching: false, // 是否进行搜索
    more: '' // 通知 search 组件，页面滚动到底部。
    // more 使用 random 生成随机字符串。其原因在于：
    // 如果使用 false，在 search组件 中，使用 observer 监听 more 的值的改变的时候，
    // 每一次滚动到页面底部触发 onReachBottom 方法，修改 more 为 true，传递的值永远为 true
    // search组件 中对 more 的监听就不会其作用，只有在首次触底的时候才能触发 search 中加载更多数据的方法
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList()
      .then((res) => {
        this.setData({
          books: res
        })
      })
  },

  onSearching: function (event) {
    this.setData({
      searching: true
    })
  },

  onCancel: function (event) {
    this.setData({
      searching: false
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   * 监听用户上拉触底事件，即滚动到页面底部触发 onReachBottom 事件。仅在页面中有校
   */
  onReachBottom () {
    this.setData({
      more: random(16)
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})