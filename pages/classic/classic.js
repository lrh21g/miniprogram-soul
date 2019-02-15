import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Component({

  properties: {
    cid: Number,
    type: Number
  },

  /**
   * 页面的初始数据
   */
  data: {
    classic: null, // 期刊数据
    latest: true, // 上一期期刊按钮状态，true 为允许点击
    first: false, // 下一期期刊按钮状态，false 为禁止点击
    likeCount: 0, // 点赞（喜欢）数量
    likeStatus: false // 点赞（喜欢）状态
  },

  attached (options) {
    const cid = this.properties.cid
    const type = this.properties.type
    if (!cid) {
      // 获取最新一期的期刊数据
      classicModel.getLatest((res) => {
        this.setData({
          classic: res,
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
      })
    } else {
      // 获取某一期的期刊数据
      classicModel.getById(cid, type, res => {
        this._getLikeStatus(res.id, res.type)
        this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index)
        })
      })
    }
  },

  methods: {
    onLike: function (event) {
      const behavior = event.detail.behavior
      // 发送点赞数据请求
      // behavior: 点赞行为，true 为选择喜欢，false 为取消喜欢
      // this.data.classic.id: 点赞对象,例如你想对电影进行点赞，那这个参数就是电影的id号
      // this.data.classic.type: 点赞类型，分为四种：100 电影; 200 音乐; 300 句子; 400 书籍
      likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
    },

    // 下一期期刊按钮触发事件
    onNext: function (event) {
      this._updateClassic('next')
    },

    // 上一期期刊按钮触发事件
    onPrevious: function (event) {
      this._updateClassic('previous')
    },

    // 更新期刊数据
    // nextOrPrevious: 上一期或者下一期标识，分为两个值：previous(上一期)，next(下一期)
    _updateClassic: function (nextOrPrevious) {
      const index = this.data.classic.index
      classicModel.getClassic(index, nextOrPrevious, (res) => {
        // 因为将期刊存入缓存中，则对应期刊存在于缓存中则会直接是一个缓存中的数据，点赞信息无法得到更新
        // 如果进行点赞或者取消点赞，发送请求，服务端会返回错误信息，所以需要对点赞信息进行更新
        this._getLikeStatus(res.id, res.type)
        this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index), // 调用 ClassicModel 中 isLatest方法 判断是否为最新一期，并修改数据
          first: classicModel.isFirst(res.index) // 调用 ClassicModel 中 isFirst方法 判断是否为第一期，并修改数据
        })
      })
    },
    // 获取点赞信息
    // artID: 点赞对象,例如你想对电影进行点赞，那这个参数就是电影的id号
    // category: 点赞类型，分为四种：100 电影; 200 音乐; 300 句子; 400 书籍
    _getLikeStatus: function (artID, category) {
      likeModel.getClassicLikeStatus(artID, category,
        (res) => {
          this.setData({
            likeCount: res.fav_nums,
            likeStatus: res.like_status
          })
        })
    },
  }
})