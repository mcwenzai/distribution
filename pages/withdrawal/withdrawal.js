import { UserApi} from "../../api/user"
const userApi = new UserApi()
Page({
  data: {
    focus: false,
    inputValue: '',
    checked:true,
    number:'',
    userInfo:{}
  },
  onShow(){
    
  },
  onLoad(){
    this.getAgentUserInfo()
  },
  submit(){
    let flag = this.data.checked
   if(!flag){
     return
   }
   
   
   if(this.data.number < 10){
    wx.showToast({
      icon:"none",
      title: '提现金额不能少于10元!',
    })
    return
  }
   if(this.data.number > this.data.userInfo.balance){
    wx.showToast({
      icon:"none",
      title: '可提现金额不足!',
    })
    
     return
   }
   let that = this
   wx.showModal({
    title: '提示',
    content: '确认申请提现吗?',
    success (res) {
      if (res.confirm) {
        wx.showLoading({
          title:"申请提现中~"
        })
        userApi.withdrawal({
          money:that.data.number
         }).then(res=>{
           wx.hideLoading()
           if(res.code==200){
             wx.showToast({
               title: '申请成功!',
             })
             that.getAgentUserInfo()
           }else{
            wx.showToast({
              icon:"none",
              title: '申请失败!',
            })
           }
         }).catch(()=>{
          wx.hideLoading()
          wx.showToast({
            icon:"none",
            title: '申请失败!',
          })
         
         })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
  
   
  },
  getAgentUserInfo(){
    userApi.getAgentUserInfo().then(res=>{
      if(res.code==200){
        wx.setStorageSync('userInfo', res.data)
        this.setData({
          userInfo:res.data,
          number:Number(res.data.balance)
        })
      }
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      number: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  },
  bindHideKeyboard: function (e) {
    if (e.detail.value === '123') {
      // 收起键盘
      wx.hideKeyboard()
    }
  },
  
  handleChangeGoods(){
    var checked = this.data.checked;
   if(checked){
     checked=false
   }else{
     checked=true
   }
   this.setData({
     checked
   })
  },
  setNumber:function(){
    this.setData({
      number:this.data.userInfo.balance
    })
  },
  formSubmit(e){
    var id=e.currentTarget.dataset.id;
    if(this.data.checked===undefined){
      this.data.checked=false;
    }
    if(this.data.checked==false){
      app.message("未勾选《智超商互通钱包协议》")
      return;
    }
  }
})