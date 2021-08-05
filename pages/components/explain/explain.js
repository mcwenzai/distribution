import {
  debounce
} from "../../../utils/util"
let that
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    myValue: Number,
    wxCode: {
      type: String,
      value: "",
    },
    phone: {
      type: String,
      value: "",
    },
    name: {
      type: String,
      value: "",
    }
  },
  data: {
    flag: false
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      that = this
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    saveInLocal: debounce(() => {
      let  tempFilePath = ''
      // const _that = this;
      wx.getImageInfo({
        src:that.data.wxCode,
        success (res) {
         
          tempFilePath = res.path
          wx.getSetting({
            success(res) {
              if (!res.authSetting["scope.writePhotosAlbum"]) {
                wx.authorize({
                  scope: "scope.writePhotosAlbum",
                  success() {
                    // 保存图片到系统相册
                    wx.saveImageToPhotosAlbum({
                      filePath: tempFilePath, // 图片文件路径，可以是临时文件路径或永久文件路径 (本地路径) ，不支持网络路径
                      success(res) {
                        wx.showModal({
                          content: "图片已保存到相册~",
                          showCancel: false,
                          confirmText: "好的",
                          confirmColor: "#333",
                          success: function (res) {
                            if (res.confirm) {
                              /* 该隐藏的隐藏 */
                              // _that.setData({
                              //   showModal: false,
                              // });
                            }
                          },
                        });
                      },
    
                    });
                  },
                  fail(res) {
                    wx.showModal({
                      title: '权限',
                      content: "暂未设置相册权限,立即去设置?",
                      success(data) {
                        if (data.confirm) {
                          wx.openSetting()
                        } else {
                          wx.showToast({
                            title: '已取消!',
                            icon: 'none'
                          });
                        }
    
    
                      },
                      fail() {
    
                      },
                    })
    
                  }
                });
              } else {
                wx.saveImageToPhotosAlbum({
                  filePath: tempFilePath,
                  success(res) {
                    wx.showModal({
                      content: "图片已保存到相册~",
                      showCancel: false,
                      confirmText: "好的",
                      confirmColor: "#333",
                      success: function (res) {
                        if (res.confirm) {
                          /* 该隐藏的隐藏 */
                          // that.setData({
                          //   showModal: false,
                          // });
                        }
                      },
                    });
                  },
                  fail(res) {
                    console.log(res);
                  }
                });
              }
            },
          });
        }
      })
     
      
    }, 500),
    created() {
      console.log(myValue);
    },
    hideExpla: function () {
      this.setData({
        flag: !this.data.flag
      })
    },
    showExpla() {
      this.setData({
        flag: !this.data.flag
      })
    },
    onCancel() {

      this.triggerEvent("error")
    }
  }

})