const app = getApp()
import {LoginApi} from "../../../api/login"
const loginApi = new LoginApi();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    phone: { //请求的电话号码
      type: Number,
      value: ''
    },
    systemType: { //系统类型
      type: Number,
      value:0
    },
    type: { //类型
      type: Number,
      value: 0
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    codemsg: '',
    btntxt: '获取验证码',
    time: 60,
    InterValObj: '', //计时器
    isSend: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    SetRemainTime() {
      let time = this.data.time
      if (this.data.time == 0) {
        clearInterval(this.data.InterValObj); //停止计时器  
        this.setData({
          isSend: false,
          time: 30,
          btntxt: '获取验证码'
        })
      } else {
        time--
        this.setData({
          time: time,
          isSend: true,
          btntxt: time + 's重新获取'
        })
      }
    },
    getCode() {
      //是否短信验证码正在发送中
      if (this.data.isSend) {
        return
      }
      let reg = /^1[0-9]\d{9}$/;
      let phone = this.properties.phone
      //手机格式错误
      if (!(reg.test(phone))) {
        wx.showToast({
          title: '手机号码格式错误!',
          icon:"none"
        })
        this.triggerEvent('transCode', {
          error: true
        })
        return false;
      }
      this.sendCode()

    },
    sendCode() {
      this.setData({
        isSend: true
      },()=>{
        console.log(loginApi.sencode)
        loginApi.sencode({
          phone:this.data.phone,
          systemType:this.data.systemType,
          type:this.data.type,
        }).then(res =>{
          console.log(res)
          if(res.code==200){
            wx.showToast({
              title: '短信验证码发送成功!',
            })
            this.setData({
                  InterValObj: setInterval(() => {
                    this.SetRemainTime()
                  }, 1000)
                })
          }else{
            wx.showToast({
              icon:'none',
              title:res.message,
            })
          }
        })
      })
      
      // setTimeout(() => {
      //   this.setData({
      //     InterValObj: setInterval(() => {
      //       this.SetRemainTime()
      //     }, 1000)
      //   })
      // }, 1000)
    }
  }
})