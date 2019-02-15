import { HTTP } from '../util/http-p.js'

class KeywordModel extends HTTP {
  key = 'q'
  maxLength = 10

  // 获取搜索历史 - 从本地缓存中获取
  getHistory () {
    const words = wx.getStorageSync(this.key)
    if (!words) {
      return []
    }
    return words
  }

  // 获取热搜关键字
  getHot () {
    return this.request({
      url: 'book/hot_keyword'
    })
  }

  // 将关键字写入缓存中
  addToHistory (keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)
    if (!has) {
      // 如果数组长度超过规定存储长度，则将末尾元素进行删除
      const length = words.length
      if (length >= this.maxLength) {
        words.pop()
        // arrayObject.pop() 方法将删除 arrayObject 的最后一个元素，把数组长度减 1，并且返回它删除的元素的值
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}

export { KeywordModel }