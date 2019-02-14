import { HTTP } from '../util/http-p.js'

class BookModel extends HTTP {
  // 获取热门书籍列表
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }

  // 获取喜欢书籍数量
  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }

  // 获取书籍详情信息
  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  // 获取书籍点赞信息
  getLikeStatus(bid) {
    return this.request({
      url: `/book/${bid}/favor`
    })
  }

  // 获取书籍短评信息
  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  // 新增短评
  postComment(bid, comment) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }
}

export {
  BookModel
}