import { HTTP } from '../util/http.js'

class LikeModel extends HTTP {
  // 点赞数据请求
  // behavior: 点赞行为，true 为选择喜欢，false 为取消喜欢
  // artID: 点赞对象,例如你想对电影进行点赞，那这个参数就是电影的id号
  // category: 点赞类型，分为四种：100 电影; 200 音乐; 300 句子; 400 书籍
  like (behavior, artID, category) {
    let url = behavior == 'like' ? 'like' : 'like/cancel' // 通过点赞行为确定 url
    this.request({
        url: url,
        method: 'POST',
        data: {
          art_id: artID,
          type: category
        }
    })
  }

  // 获取点赞信息
  // artID: 点赞对象,例如你想对电影进行点赞，那这个参数就是电影的id号
  // category: 点赞类型，分为四种：100 电影; 200 音乐; 300 句子; 400 书籍
  getClassicLikeStatus (artID, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback
    })
  }
}

export { LikeModel }