// app.js
import { HTTP } from './api/http';
const httpApi = new HTTP();
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    let that = this;
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
            
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

   

        // 获取网络类型
        wx.getNetworkType({
            success: function(res) {
                // 将网络类型设置为全局属性 = 当前网络类型
                that.globalData.networkType = res.networkType;

                // 网络连接已断开
                if (res.networkType === 'none') {
                    // 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
                    wx.showLoading({
                        title: '当前网络不可用', // 提示的内容
                        mask: true // 是否显示透明蒙层，防止触摸穿透
                    });

                    // 网络连接正常
                } else {
                    // 清空请求队列，用于处理 wx.getNetworkType 的异步行为，清空 wx.getNetworkType 回调未执行之前请求失败的接口请求
                    httpApi.clearNoNetworkRequestQueue();
                }
            }
        });

        // 监听网络状态变化事件
        wx.onNetworkStatusChange(res => {
            // 将网络类型设置为全局属性 = 当前网络类型
            that.globalData.networkType = res.networkType;

            // 网络恢复正常
            if (res.isConnected) {
                // 隐藏 loading 提示框
                wx.hideLoading();

                // 恢复因断网而中止的所有请求
                httpApi.recoveryNoNetworkRequest();

                // 网络连接已断开
            } else {
                // 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
                wx.showLoading({
                    title: '当前网络不可用', // 提示的内容
                    mask: true // 是否显示透明蒙层，防止触摸穿透
                });
            }
        });

        // // 防止小程序销毁后还存在数据缓存
        // try {
        //     // 清理本地数据缓存
        //     wx.clearStorageSync()
        // } catch (e) {
        //     // Do something when catch error
        // }
    
  },  
  onShow(options){


    // 小程序版本升级
    if (wx.canIUse("getUpdateManager")) {
      const updateManager = wx.getUpdateManager();
      if (updateManager && updateManager.onCheckForUpdate) {
        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
            updateManager.onUpdateReady(function () {
              wx.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启应用？",
                success: function (res) {
                  // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                  if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                  }
                },
              });
            });
            updateManager.onUpdateFailed(function () {
              // 新的版本下载失败
              wx.showModal({
                title: "已经有新版本了哟~",
                content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
              });
            });
          }
        });
      }
    }
  },
  globalData: {
    userInfo: null,
    requestDetailid: 0,
    networkType: null,
  }
})