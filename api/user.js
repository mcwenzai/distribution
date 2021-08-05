// 用户接口 API

import {
	HTTP
} from './http.js';

class UserApi extends HTTP {
	getAgentUserInfo(data) {
		return this.request({
			url: '/shanghutong-system/agent/user/getAgentUserInfo',
			method: 'POST',
			data: data,
		}, {
			needToken: true // 用于请求接口时判断是否需要 needToken
		});
	}
	authentication(data) {
		return this.request({
			url: '/shanghutong-system/agent/user/authentication',
			method: 'POST',
			data: data,
		}, {
			needToken: true // 用于请求接口时判断是否需要 openid
		});
	}
	editUserInfo(data) {
		return this.request({
			url: '/shanghutong-system/agent/user/updateAgentUser',
			method: 'POST',
			data: data,
		}, {
			needToken: true // 用于请求接口时判断是否需要 openid
		});
	}
	//小程序分享码
	getwxacode(data) {
		return this.request({
			url: '/shanghutong-system/agent/user/getwxacode',
			method: 'GET',
			data: data, 
		}, {
			needToken: true // 用于请求接口时判断是否需要 openid
		});
	}
	//提现记录
	getWithdrawalList() {
		return this.request({
			url: '/shanghutong-system/applets/withdrawalList',
			method: 'GET',
		}, {
			needToken: true // 用于请求接口时判断是否需要 openid
		});
	}
	//体现记录详情
	getWithdrawalInfo(id) {
		return this.request({
			url: '/shanghutong-system/applets/withdrawalInfo/' + id,
			method: 'GET',
		}, {
			needToken: true // 用于请求接口时判断是否需要 openid
		});
	}
	//提现
	withdrawal(data) {
		return this.request({
			url: '/shanghutong-system/applets/withdrawal',
			method: 'POST',
			data
		}, {
			needToken: true // 用于请求接口时判断是否需要 openid
		});
	}
	//合伙人申请升级
	updateUpgradeStatus(data) {
		return this.request({
			url: '/shanghutong-system/agent/user/updateUpgradeStatus',
			method: 'PUT',
			data
		}, {
			needToken: true // 用于请求接口时判断是否需要 openid
		});
	}
}

export {
	UserApi
};