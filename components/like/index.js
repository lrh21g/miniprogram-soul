// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: { // 是否喜欢
      type: Boolean
    },
    count: { // 喜欢的数量
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png', // 喜欢icon
    noSrc: 'images/like@dis.png' // 不喜欢icon，默认
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function (event) {
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1
      this.setData({ // 通过 setData 更新数据
        count: count,
        like: !like
      })
      let behavior = this.properties.like ? 'like' : 'cancel' // 选择喜欢（like）与取消喜欢（cancel）标识
      // 自定义组件触发事件时，需要使用 triggerEvent 方法，指定事件名、detail对象和事件选项
      this.triggerEvent('like', {
        behavior: behavior
      }, {})
    }
  }
})
