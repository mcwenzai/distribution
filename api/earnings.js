// 收益相关  API
import {
	HTTP
} from './http.js';

class EarningsApi extends HTTP {
	// 本月收益
	getMonthFundDetail(data){
    return this.request({
      url:"/shanghutong-system/agent/user/getMonthFundDetail",
      method:"POST",
      data
    },{needToken:true})
  }
  //上月收益(柱状图)
  getFundDetailByLastMonth(data){
    return this.request({
      url:"/shanghutong-system/agent/user/getFundDetailByLastMonth",
      method:"POST",
      data
    },{needToken:true})
  }
  //获取当日收益明细
  getFundDetailByTime(data){
    return this.request({
      url:"/shanghutong-system/agent/user/getFundDetailByTime",
      method:"POST",
      data
    },{needToken:true})
  }
  //累计收益
  getFundDetailByDate(data){
    return this.request({
      url:"/shanghutong-system/agent/user/getFundDetailByDate",
      method:"POST",
      data
    },{needToken:true})
  }
  // 最近一周收益(柱状图)
  getFundDetailByWeek(data){
    return this.request({
      url:"/shanghutong-system/agent/user/getFundDetailByWeek",
      method:"POST",
      data
    },{needToken:true})
  }
  getFundDetailByDate(data){
    return this.request({
      url:"/shanghutong-system/agent/user/getFundDetailByDate",
      method:"POST",
      data
    },{needToken:true})
  }
  getFundDetail(){
    return this.request({
      url:"/shanghutong-system/agent/user/getFundDetail",
      method:"POST",
    },{needToken:true})
  }
  getBankroll(data){
    return this.request({
      url:"/shanghutong-system/agent/user/getBankroll",
      method:"POST",
      data
    },{needToken:true})
  }
  getAllFundDetail(data){
    return this.request({
      url:"/shanghutong-system/agent/user/getAllFundDetail",
      method:"POST",
      data
    },{needToken:true})
  }
}
export {
	EarningsApi
};