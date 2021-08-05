// 用户接口 API

import {
  HTTP
} from './http.js';

class AchievementApi extends HTTP {
  // 查询通知
  getAgentNoticeList(data) {
    return this.request({
      url: "/shanghutong-system/agent/user/getAgentNoticeList",
      method: "POST",
      data
    }, {
      needToken: true
    })
  }

  //店铺明细查询接口
  selectShopDetail(data) {
    return this.request({
      url: "/shanghutong-system/agent/user/selectShopDetail",
      method: "POST",
      data
    }, {
      needToken: true
    })
  }

  //獲取下級用戶列表
  getAgentUserList(data) {
    return this.request({
      url: "/shanghutong-system/agent/user/getAgentUserList",
      method: "POST",
      data
    }, {
      needToken: true
    })
  }
  //超级合伙人 下 合伙人列表
  getPartner(data) {
    return this.request({
      url: "/shanghutong-system/agent/user/getPartner?type=3&status=" + data.status +"&keyWords=" + data.key,
      method: "GET",
    }, {
      needToken: true
    })
  }
  //獲取代理人詳情信息
  selectAgentUserVOByPhone(phone) {
    return this.request({
      url: "/shanghutong-system/agent/user/selectAgentUserVOByPhone/" + phone,
      method: "GET",
    }, {
      needToken: true
    })
  }
  //凍結用戶
  frozen(id) {
    return this.request({
      url: "/shanghutong-system/agent/user/frozen/" + id,
      method: "PUT",
    }, {
      needToken: true
    })
  }
  //解凍用戶
  unfreeze(id) {
    return this.request({
      url: "/shanghutong-system/agent/user/normal/" + id,
      method: "PUT",
    }, {
      needToken: true
    })
  }
  //提醒用戶續費
  remind(id) {
    return this.request({
      url: "/shanghutong-system/agent/user/remind/" + id,
      method: "GET",
    }, {
      needToken: true
    })
  }
  //确认已续约
  updateStartEndTime(data) {
    return this.request({
      url: "/shanghutong-system/agent/user/updateAgentUserStatus",
      method: "POST",
      data
    }, {
      needToken: true
    })
  }

  //获取店铺详情
  getMerchantShopDetails(data) {
    return this.request({
      url: "/shanghutong-system/storeInfo/getStoreInfoDTO",
      method: "POST",
      data
    }, {
      needToken: true
    })
  }
  //店铺冻结
  storeFrozen(data) {
    return this.request({
      url: "/shanghutong-system/storeInfo/frozen",
      method: "POST",
      data
    }, {
      needToken: true
    })
  }
 
  //店铺解冻
  storeUnFrozen(data) {
    return this.request({
      url: "/shanghutong-system/storeInfo/normal",
      method: "POST",
      data
    }, {
      needToken: true
    })
  }
  //获取店铺入驻入网状态
  settleInStatus(data) {
    return this.request({
      url: "/shanghutong-system/user/settleInStatus",
      method: "POST",
      data
    }, {
      needToken: true
    })
  }
}

export {
  AchievementApi
};