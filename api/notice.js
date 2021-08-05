// 用户接口 API

import {
	HTTP
} from './http.js';

class NoticeApi extends HTTP {
	getAgentUserInfo(data) {
		return this.request({
			url: '/shanghutong-system/agent/user/getAgentUserInfo',
			method: 'POST',
			data: data,
		}, {
			needToken: true // 用于请求接口时判断是否需要 needToken
		});
	}

	//同意加入	
	agreeJoinUs(data) {
		return this.request({
			url: '/shanghutong-system/agent/user/updateAgentUserStatus',
			method: 'POST',
			data: data,
		}, {
			needToken: true // 用于请求接口时判断是否需要 needToken
		});
	}
}

export {
	NoticeApi
};