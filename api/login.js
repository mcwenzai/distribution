// 用户接口 API

import {
	HTTP
} from './http.js';

class LoginApi extends HTTP {
	// 发送短信验证码
	sencode(data){
    return this.request({
      url:"/shanghutong-system/user/sms/agent/send/code",
      method:"POST",
      data
    })
  }

  register(data){
    return this.request({
      url:"/shanghutong-system/agent/user/register",
      method:"POST",
      data
    })
  }
  login(data){
    return this.request({
      url:"/shanghutong-auth/agentLogin",
      method:"POST",
      data
    })
  }
  resetPassWord(data){
    return this.request({
      url:"/shanghutong-system/agent/user/updateUserPwd",
      method:"POST",
      data
    })
  }
}

export {
	LoginApi
};