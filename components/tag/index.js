// components/tag/index.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /* .comment-container > v-tag:nth-child(1) > view {
    background-color: #fffbdd;
    }
    .comment-container > v-tag:nth-child(2) > view {
        background-color: #eefbff;
    } */
  /* 使用此方法修改短评的第一个和第二个的样式，违反了组件封装的原则。类似 hack */
  /* 其修改方法需要知道组件内部结构 */
  /* 不要对自定义组件应用样式，因为无法确定是对组件中那些标签进行应用 */
  /* 使用子选择器（只会选择子代特定的标签）比后端选择器（会选择所有特定的后代标签）更加安全 */
  
  /* 可以通过 组件属性 和 slot（插槽） 进行应用样式，组件属性和slot不违反组件封装原则，是因为在组件内部已经规范和写好的 */
  /* 通过 组件属性 和 slot（插槽） 进行应用样式，需要通过参数传递进行修改样式 */
  /* 使用小程序样式传递机制，externalClasses（外部样式），进行对组件样式的修改 */
  /* 组件内部定义的 class 为普通样式（此组件示例为：container），外部组件传入 class 样式为外部样式（此组件示例为：tag-class） */
  /* 外部样式不一定能覆盖普通样式，可以在外部样式设置 !important */
  externalClasses: ['tag-class'],

  /**
   * 组件的属性列表
   */
  properties: {
    text: String
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

  }
})
