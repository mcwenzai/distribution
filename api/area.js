// 地区商圈相关 API
import {
	HTTP
} from './http.js';

class AreaApi extends HTTP {
	// 获取省数据
	getProvince(data){
    return this.request({
      url:"/shanghutong-system/position/getProvince",
      method:"POST",
      data
    })
  }
  	// 获取省数据
  getCity(data){
    return this.request({
      url:"/shanghutong-system/position/getCity",
      method:"POST",
      data
    })
  }
  //查询该城市下商圈
  selectBusinessAreaNameList(data){
    return this.request({
      url:"/shanghutong-system/position/selectBusinessAreaNameList",
      method:"POST",
      data
    })
  }
  //查询该商圈下街道
  selectTownNameList(data){
    return this.request({
      url:"/shanghutong-system/position/selectTownNameList",
      method:"POST",
      data
    })
  }
  //查询商圈下的街道
  selectTownNameInfo(data){
    return this.request({
      url:"/shanghutong-system/position/selectTownNameInfo",
      method:"POST",
      data
    })
  }
  //查询银行列表
  bankSearch(data){
    return this.request({
      url:"/shanghutong-system/yeepayData/bankSearch ",
      method:"POST",
      data
    },)
  }
  //
}
export {
	AreaApi
};