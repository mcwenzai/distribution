Component({
  data: {
    selected: null,
    color: "#999999",
    selectedColor: "#F85861",
    list: [
      {
        "selectedIconPath": "/image/shouye-active.png",
        "iconPath": "/image/shouye.png",
        "pagePath": "/pages/index/index",
        "text": "首页"
      },
      {
        "selectedIconPath": "/image/yeji-active.png",
        "iconPath": "/image/yeji.png",
        "pagePath": "/pages/achievement/achievement",
        "text": "业绩"
      },
      {
        "selectedIconPath": "/image/wode-active.png",
        "iconPath": "/image/wode.png",
        "pagePath": "/pages/my/my",
        "text": "我的"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      // this.setData({
      //   selected: data.index
      // })
    }
  }
})