import { BookModel } from '../../models/book.js'

let bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [], // 短评信息
    book: null, // 书籍信息
    likeStatus: false, // 点赞状态
    likeCount: 0 // 点赞数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面接受外部传递的参数，传递的参数包含在页面的 onLoad 生命周期的 options 参数中
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    Promise.all([detail, comments, likeStatus])
      .then(res => {
        this.setData({
          book: res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        })
        wx.hideLoading()
      })
    
    // detail.then(res => {
    //   console.log(res)
    //   this.setData({
    //     book: res
    //   })
    //   wx.hideLoading()
    // })

    // comments.then(res => {
    //   console.log(res)
    //   this.setData({
    //     comments: res.comments
    //   })
    // })

    // likeStatus.then(res => {
    //   console.log(res)
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
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