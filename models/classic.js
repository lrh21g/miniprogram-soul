import { HTTP } from '../util/http.js'

class ClassicModel extends HTTP {
  // 获取我喜欢的周刊
  getMyFavor(success) {
    const params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
  }

  // 获取某一期的详细信息
  getById(cid, type, success) {
    let params = {
      url: `classic/${type}/${cid}`,
      success: success
    }
    this.request(params)
  }

  // 获取最新一期数据
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index) // 将最新一期的期号存储在本地缓存中
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res) // 将最新一期的期刊存入缓存中
      }
    })
  }

  // 获取当前一起的上一期或下一期
  // index: 当前期刊的期号,必填,必须是正整数。
  // nextOrPrevious: 上一期或者下一期标识，分为两个值：previous(上一期)，next(下一期)
  getClassic(index, nextOrPrevious, sCallback) {
    // 从缓存中读取数据的原因：每次切换期刊都需要向服务端请求数据，如果从缓存中读取，则可以优化用户体验，减少服务端压力
    // >>> 如果缓存中存在对应期刊内容，则从缓存中读取数据；
    // >>> 如果不能从缓存中读取到期刊内容，则向服务端发送请求，并将请求到的数据写入缓存中
    // 所有期刊在缓存中需要设置一个 key，这个 key 既可以表示期刊又可以表示是哪一期的期刊
    // 每个 key 不是固定不变的，因为可能会存在很多期刊。使用单独的一个方法产生期刊的 key ，此处方法为：_getKey
    // 传入 getClassic 方法中的 index 为当前期刊的期号，通过调用方法获取上一期或者下一期，所有需要对 index 进行 加 1 或者 减 1 
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      // 缓存中不存在需要寻找的期刊，则向服务端发送请求,并写入缓存
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res) // 写入缓存
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }
  }

  // 判断是否为第一期：如果 index 为 1 则为第一期
  isFirst(index) {
    return index == 1 ? true : false
  }

  // 判断是否为最新一期：如果 index 等于 缓存中存储的最新一期的期号 则为最新一期
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }

  // 将最新一期的期号存储在本地缓存中
  _setLatestIndex(index) {
    // wx.setStorage(Object object) 将数据存储在本地缓存中指定的 key 中。
    wx.setStorageSync('latest', index)
  }

  // 从本地缓存中获取最新一期的期号
  _getLatestIndex() {
    // wx.getStorageSync 从本地缓存中异步获取指定 key 的内容
    const index = wx.getStorageSync('latest')
    return index
  }

  // 设置期刊的 key
  _getKey (index) {
    const key = 'classic-' + index
    return key
  }
}

export {
  ClassicModel
}