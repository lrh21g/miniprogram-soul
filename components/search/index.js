import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'
import { paginationBev } from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({

  behaviors: [paginationBev],

  /**
   * 组件的属性列表
   */
  properties: {
    more: { // 页面滚动到底部，通知 search 标识
      type: String,
      observer: 'loadMore' // 监听more的变化，并触发loadMore函数
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [], // 历史搜索关键字
    hotWords: [], // 热门搜索关键字
    searching: false, // 是否进行搜索
    q: '', // 搜索输入框文本
    loading: false, // 是否正在请求数据
    loadingCenter: false
  },

  attached () {
    // 从缓存中加载历史搜索数据
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    // 从服务端请求热门搜索数据
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加载更多数据
    loadMore () {
      if (!this.data.q) { // 如果不存在搜素值为空，则不加载更多数据
        return
      }
      if (this.isLocked()) { // 如果正在请求数据，则阻止再次发送请求
        return
      }
      if (this.hasMore()) { // 如果还存在更多数，则请求数据
        this.locked() // 上锁，防止用户恶意一直讲滚动条滚动到页面底部，一直发送加载更多的请求
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books)
            this.unLocked() // 解锁
          }, () => {
            this.unLocked() // 请求失败，进行解锁，避免死锁状态
          })
      }
    },
    // 取消搜索
    onCancel (event) {
      this.initialize() // 清空还原数据
      this.triggerEvent('cancel', {}, {})
    },
    // 清除搜索框
    onDelete (event) {
      this.initialize() // 清空还原数据
      this._closeResult()
    },
    // 搜索操作
    onConfirm (event) {
      this._showResult() // 显示搜索的结果
      this._showLoadingCenter() // 显示加载图标
      const q = event.detail.value || event.detail.text
      // event.detail.value 为输入框输入的值;  event.detail.text 为标签的文本值
      this.setData({
        q: q
      })
      bookModel.search(0, q)
        .then(res => {
          this.setMoreData(res.books)
          this.setTotal(res.total) // 设置服务端数据总数，用于判断是否存在更多数据
          keywordModel.addToHistory(q) // 将搜索记录加入缓存中
          this._hideLoadingCenter() // 隐藏加载图标
        })
    },

    // 显示加载图标
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    // 隐藏加载图标
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    // 显示搜索结果
    _showResult () {
      this.setData({
        searching: true
      })
    },

    // 隐藏搜索结果
    _closeResult () {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})
