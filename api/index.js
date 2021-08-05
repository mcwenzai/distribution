// 用户接口 API

import {
    HTTP
} from './http.js';

class IndexApi extends HTTP {
    getHomeList(data) {
        return this.request({
            url: '/shanghutong-system/storeInfo/selectUserInfoHome',
            method: 'POST',
            data: data,
        }, {
            needToken: true,// 用于请求接口时判断是否需要 needToken,
            loading:true
        });
    }
    getNoticeList() {
        return this.request({
            url: '/shanghutong-system/notice/getNotice/4'  ,
            method: 'GET',
        });
    }
    
}

export {
    IndexApi
};