// pages/login/register/register.js
import {LoginApi} from "../../../api/login"
const loginApi = new LoginApi();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      phone:"",
      msgCode:"",
      password:"",
      againPassword:"",
      inviteCode:"",
      checked:true,
      isVisible:false,
      isAgainVisible:false,
      ruleList:[
        {lineText:'1、请检查手机号输入是否正确，港澳台及海外手机号请填写国际区号，再填写手机号；'},
        {lineText:'2、如果安装了360卫士、安全管家、QQ管家等软件，请进入软件查询拦截记录，并将云集短信设为信任后重试；'},
        {lineText:'3、请您清除手机缓存后重新获取；'},
        {lineText:' 4、请确认您是否退订过。'}
      ]
  },
  Viewrules(){
    this.rules.showRule()
  },
  onCancel(){
    this.rules.hidesRule()
  },
  setAgainVisible(event){
    let flag = event.currentTarget.dataset.visible

    if(flag==1){
       this.setData({
          isAgainVisible:false
       })
    }else{
       this.setData({
          isAgainVisible:true
       })
    }
 },
  setVisible(event){
    let flag = event.currentTarget.dataset.visible
    if(flag==1){
       this.setData({
         inputType:'password',
         isVisible:false
       })
    }else{
       this.setData({
         inputType:'text',
         isVisible:true
       })
    }
 },
  checkedgoods(event){
    this.setData({
      checked:!event.currentTarget.dataset.checked
    })
    
  },
  onConfirm(){
    let checked = this.data.checked
    //是否同意用户协议
    if(!checked){
      wx.showToast({
        icon:"none",
        title: '请同意用户协议!',
      })
      return
    }
    //手机号码验证
    let phone = this.data.phone
    let reg = /^1[0-9]{10}$/
    if(!phone){
      wx.showToast({
        icon:"none",
        title: '请输入手机号码!',
      })
      return
    }
    if(!reg.test(phone)){
      wx.showToast({
        icon:"none",
        title: '请输入正确的手机号码!',
      })
      return
    }
    //验证码验证
    let msgCode = this.data.msgCode
    if(!msgCode){
      wx.showToast({
        icon:"none",
        title: '请输入手机验证码!',
      })
      return
    }
    //密码效验
    let password = this.data.password
    let againPassword =  this.data.againPassword
    if(!password){
      wx.showToast({
        icon:"none",
        title: '请输入密码!',
      })
      return
    }
    if(password.length < 6 || password.length>32){
      wx.showToast({
        icon:"none",
        title: '密码长度不得少于6位或大于32位字符!',
      })
      return
    }
    if(againPassword != password){
      wx.showToast({
        icon:"none",
        title: '2次密码输入不一致!',
      })
      return
    }
    loginApi.resetPassWord({
      phone,
      password,
      code:msgCode,
    }).then((res)=>{
      if(res.code==200){
        wx.showToast({
          title: '修改密码成功!',
        })
        setTimeout(()=>{
          wx.reLaunch({
            url: '../login',
          })
        },1000)
      }else{
        wx.showToast({
          icon:"none",
          title: res.message,
        })
      }
    })
  },
  phoneInput(e){
    this.setData({
      phone: e.detail.value
    })
  },
  inviteCodeInput(e){
    this.setData({
      inviteCode: e.detail.value
    })
  },
  codeInput(e){
    this.setData({
      msgCode: e.detail.value
    })
  },
  passwordInput(e){
    this.setData({
      password: e.detail.value
    })
  },
  againPasswordInput(e){
    this.setData({
      againPassword: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.rules=this.selectComponent("#Rule")
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})