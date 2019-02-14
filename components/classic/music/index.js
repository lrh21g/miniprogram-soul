import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager() // 获取全局唯一的背景音频管理器

Component({
  behaviors: [classicBeh],

  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  // attached生命周期 -- 在组件实例进入页面节点树时执行
  // 需要使用 wx:if 触发
  attached: function () {
    this._recoverStatus() // 恢复期刊播放状态
    this._monitorSwitch() // 监听背景音频管理，从而控制期刊播放状态
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function (event) {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    _recoverStatus: function () {
      // mMgr.paused 获取当前播放音乐是否暂停或播放
      // 如果当前播放音乐为播放状态，则进入音乐期刊的时候，则当前期刊音乐显示为播放按钮
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      // mMgr.src 可以获取到当前播放音乐的 src
      // this.properties.src 可以获取到当前期刊中音乐的 src
      // 当前播放音乐的src 与 当前期刊音乐的src 相同时，则当前期刊音乐显示为暂停按钮
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch: function () {
      // 监听背景音频播放事件
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      // 监听背景音频暂停事件
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      // 监听背景音频停止事件
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      // 监听背景音频自然播放结束事件
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})