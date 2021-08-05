// 用户接口 API

import {
	HTTP
} from './http.js';

class BusinessApi extends HTTP {
	selectBusinessDistrict() {
        return this.request({
        	url: '/shanghutong-system/agent/user/selectBusinessDistrict',
        	method: 'GET',
        }, {
        	needToken: true // 用于请求接口时判断是否需要 needToken
        });
    }
    
    getProvincesCitiesTown(id) {
        return this.request({
        	url: '/shanghutong-system/position/getProvincesCitiesTown/' + id,
        	method: 'GET',
        });
	}
	addBusiness(data) {
        return this.request({
        	url: '/shanghutong-system/position/addOrEdit',
            method: 'POST',
            data
        }, {
        	needToken: true // 用于请求接口时判断是否需要 needToken
        });
    }
    //删除商圈
    delBusiness(id) {
        return this.request({
        	url: '/shanghutong-system/position/updateAddressTownByCode/' + id,
        	method: 'PUT',
        },{
        	needToken: true // 用于请求接口时判断是否需要 needToken
        });
	}
    //商圈详情
    getBusinessDetails(id){
        return this.request({
        	url: '/shanghutong-system/position/getInfo/' + id,
        	method: 'get',
        },{
        	needToken: true // 用于请求接口时判断是否需要 needToken
        });
    }
}

export {
	BusinessApi
};