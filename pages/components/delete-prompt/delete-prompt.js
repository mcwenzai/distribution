// pages/components/delete-prompt/delete-prompt.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的初始数据
   */
  data: {},
  properties: {
    flag: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hidePrompt() {
      this.setData({
        flag: !this.data.flag
      })
    },
    showPrompt() {
      this.setData({
        flag: !this.data.flag
      })
    },
    onConfir() {
      this.triggerEvent("success");
    },
    onDelete() {
      this.triggerEvent("dele");
    }
  }
})