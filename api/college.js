// 用户接口 API

import {
    HTTP
} from './http.js';

class CollegeApi extends HTTP {
    getCollegeTypeList() {
        return this.request({
            url: '/shanghutong-system/businessSchool/query?type=4',
            method: 'GET',
        });
    }
    businessSchoolQueryAll(data) {
        return this.request({
            url: '/shanghutong-system/businessSchool/query/all',
            method: 'GET',
            data
        });
    }
    businessSchoolQueryId(id) {
        return this.request({
            url: '/shanghutong-system/businessSchool/query/id?id=' + id,
            method: 'GET',
        });
    }
    
}

export {
    CollegeApi
};