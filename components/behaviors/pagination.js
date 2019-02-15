const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null, // 数据总个数
    noneResult: false, // 判断是否存在搜索结果
    loading: false
  },
  methods: {
    // 获取更多数据
    setMoreData (dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    // 设置请求开始数
    getCurrentStart () {
      return this.data.dataArray.length
    },

    // 设置数据总个数
    setTotal (total) {
      this.data.total = total
      if (total == 0) {
        this.setData({
          noneResult: true
        })
      }
    },
    
    // 是否还存在数据
    hasMore () {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },

    // 清空还原数据
    initialize() {
      this.setData({
        dataArray: [],
        noneResult: false,
        loading:false
      })
    },
      
    // 判断数据是否正在请求中，如果是则返回true，上锁，防止连续请求
    isLocked() {
      return this.data.loading ? true : false
    },

    // 上锁
    locked() {
      this.setData({
        loading: true
      })
    },

    // 解锁
    unLocked() {
      this.setData({
        loading: false
      })
    },
  }
})

export { paginationBev }