
import { config } from '../config';
import * as Util from '../utils/util';

const baseUrl = config.baseUrl;
// 请求接口时传入的默认参数
let defaultOptions =  {
	method: 'GET',
	header: {
		// 'content-type': 'application/x-www-form-urlencoded'
		'content-type': 'application/json',
	},
	data: {}
};



// defaultOptions.header['Authorization'] = wx.getStorageSync('token')
// 无网络请求队列，恢复网络之后通过 recoveryRequest 方法重新发起请求
const noNetworkRequestQueue = [];

class HTTP {
	request(options, config = {}) {
		let that = this;
		let app;
		return new Promise(async function(resolve, reject) {
			let data = {};
			app = getApp();

			// 锁定请求
			// app已初始化完成 && 存在网络类型 && 断网状态
			if (app && app.globalData.networkType === 'none') {
				// 将解锁功能函数添加至请求队列，恢复网络之后通过 recoveryRequest 方法重新发起请求
				await new Promise((resolve, reject) => {
					noNetworkRequestQueue.push(function() {
						resolve();
					});
				});
			}

			if (config.loading) {
				// 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
				wx.showLoading({
					title: '加载中...', // 提示的内容
					mask: true // 是否显示透明蒙层，防止触摸穿透
				});
			}
			try {
				// 需要发送 openid
				if (config.auth) {
					app = getApp();
					data.openid = app && app.globalData.openId;
					if (!data.openid) {
						// 检查登录状态
						data.openid = await that.checkLogin();
					}
				}
				if (config.needToken) {
					let token = wx.getStorageSync('token')
					if(!token){
						wx.reLaunch({
							url: '/pages/login/login',
						})
						return
					}
				}
				(function wxRequest() {
					// 请求接口
					defaultOptions.header['Authorization'] = wx.getStorageSync('token')
					wx.request(Util.clone(true, {}, defaultOptions, options, {
						url: baseUrl + options.url,
						data: data,
						success(res) {
							if (res.statusCode == 200) {
								resolve(res.data);
								//token失效
								if(res.data.code==202012){
									wx.showToast({
									icon:"none",
									  title: '登录验证已失效,请重新登录!',
									})
									setTimeout(()=>{
										wx.reLaunch({
											url: '/pages/login/login',
										  })
									},1000)
									
								}
								
							} else {
								reject(res);
								console.log('请求错误', res);
							}
						},
						fail(res) {
							// app未初始化完成/当前网络类型
							app = getApp();
							let networkType = app && app.globalData.networkType;
							// app未初始化完成/不存在网络类型 || 断网状态
							if (!networkType || networkType === 'none') {
								// 将请求选项添加至请求队列，恢复网络之后通过 recoveryRequest 方法重新发起请求
								noNetworkRequestQueue.push(wxRequest);
							} else {
								reject(res);
								console.log('请求错误', res);
							}
						},
						complete() {
							app = getApp();
							// 加载状态配置 && app未初始化完成 && 不存在网络类型/网络已连接状态
							if (config.loading && (app && app.globalData.networkType) !== 'none') {
								// 隐藏 loading 提示框
								wx.hideLoading();
							}
						}
					}));
				})();
			} catch (e) {
				app = getApp();
				// 加载状态配置 && (app未初始化完成 || 不存在网络类型/网络已连接状态)
				if (config.loading && (app && app.globalData.networkType) !== 'none') {
					// 隐藏 loading 提示框
					wx.hideLoading();
				}
				reject(e);
				console.log('登录失败', e);
			}
		});
	}

	// 恢复因断网而中止的所有请求
	recoveryNoNetworkRequest() {
		let fn;
		while ((fn = noNetworkRequestQueue.shift())) {
			fn();
		}
	}

	// 清空无网络请求队列，用于处理 wx.getNetworkType 的异步行为，清空 wx.getNetworkType 回调未执行之前请求失败的接口请求
	clearNoNetworkRequestQueue() {
		noNetworkRequestQueue.length = 0;
	}

	// 检查登录
	checkLogin() {
		let that = this;
		return new Promise((resolve, reject) => {
			// 检查登录状态是否过期
			wx.checkSession({
				success(res) {
					// session_key 未过期，并且在本生命周期一直有效

					// 检测本地存储中是否存在 openId
					let openId = wx.getStorageSync('openId');
					let app;
					if (openId) {
						// app已初始化完成的情况下将 openId 设置为全局数据
						app = getApp();
						if (app) {
							app.globalData.openId = openId;
						}
						resolve(openId);
					} else {
						// 重新登录，并将登录后获取的 openId 储存至本地缓存及全局数据
						that.wxLogin().then(function(data) {
							resolve(data);
						}, function(res) {
							reject(res);
						});
					}
				},
				fail() {
					// session_key 已经失效，需要重新执行登录流程

					// 重新登录，并将登录后获取的 openId 储存至本地缓存及全局数据
					that.wxLogin().then(function(data) {
						resolve(data);
					}, function(res) {
						reject(res);
					});
				}
			});
		});
	}

	// 请求接口 - 微信小程序登录
	wxLogin() {
		return new Promise((resolve, reject) => {
			wx.login({
				success: res => {
					// 发送 res.code 到后台换取 openId
					this.request({
						url: 'wxLogin',
						method: 'POST',
						data: {
							code: res.code
						}
					}).then(data => {
						let app = getApp();

						// app已初始化完成
						if (app) {
							// 将 openId 设置为全局数据，防止本地存储失败
							app.globalData.openId = data;
						}
						
						// 设置 openId - 将 openId 同步存储在本地缓存中 并将 openId 设置到全局数据属性上
						wx.setStorageSync('openId', data);

						resolve(data);
					}, res => {
						reject(res);
					});
				},
				fail: function(res) {
					reject(res);
				}
			});
		});
	}
}

export { HTTP };
