import {LoginApi} from "../../api/login"
import {UserApi} from "../../api/user"
const loginApi = new LoginApi();
const userApi = new UserApi();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    password:"",
    isVisible:false,
    inputType:'password'
  },
  phoneInput(e){
    this.setData({
      phone: e.detail.value
    })
  },
  passwordInput(e){
    this.setData({
      password: e.detail.value
    })
  },
  login(){
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
       //密码效验
      let password = this.data.password
      if(!password){
        wx.showToast({
          icon:"none",
          title: '请输入密码!',
        })
        return
      }
      wx.showLoading({
        title: '登录中..',
      })
      loginApi.login({
        username:phone,
        password
      }).then(res => {
        wx.hideLoading()
        if(res.code==200){
          // wx.setStorage({
          //   key:"token",
          //   data:res.data.access_token,
          //   success:()=>{
          //     userApi.getAgentUserInfo().then(res=>{
          //       if(res.code==200){
          //         wx.setStorageSync('userInfo', res.data)
          //       }
          //      })
          //   }
          // })
          try {
            wx.setStorageSync('token', res.data.access_token)
            userApi.getAgentUserInfo().then(res=>{
              if(res.code==200){
                wx.setStorageSync('userInfo', res.data)
              }
             })
          } catch (e) {
            
           }
          
          wx.showToast({
            title: '登录成功!',
          })
         setTimeout(()=>{
          wx.switchTab({
            url: '../index/index',
          })
         },1000)
        }else{
          wx.showToast({
            icon:"none",
            title: res.msg,
          })
        }
      }).catch(()=>{
        wx.hideLoading()
      })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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