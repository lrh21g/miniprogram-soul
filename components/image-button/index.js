// components/image-button/index.js
Component({

  options: {
    multipleSlots: true // 开启插槽
  },

  /**
   * 组件的属性列表
   */
  properties: {
    openType: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(event){
      // 用户授权之后，通过 triggerEvent 向 my Page 中传递用户信息
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  }
})
