import {AchievementApi}  from "../../../api/achievement"
const  achievementApi = new AchievementApi()
Page({
  data:{
    cunsId:1,
    status:3,
    details:{},
    startTime:"",
    endTime:"",
    merchantDetails:{}
  },
  getDetails(phone){
    achievementApi.selectAgentUserVOByPhone(
      phone
    ).then(res=>{
      if(res.code==200){
        if(res.data.userType==3){
          wx.setNavigationBarTitle({
            title: '合伙人详情'
          })
        } else if(res.data.userType==5){
    
          wx.setNavigationBarTitle({
            title: '超级合伙人详情'
          })
        }
        this.setData({
          details:res.data
        })
      }
    })
  },
  onPickerChangeStartTime(data){
    
    let time = data.detail.value
    this.setData({
      ['details.startTime']:time
    })
  },
  onPickerChangeEndTime(data){
    let time = data.detail.value
    this.setData({
      ['details.endTime']:time
    })
    console.log(this.data.detail)
  },
  //確認已經續費
  confirmRenewal(){
    if(!this.data.details.startTime || !this.data.details.endTime){
      wx.showToast({
        icon:"none",
        title: '请选择有效时间!',
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '用户是否已经续费?',
      success :(res)=> {
        if (res.confirm) {
          achievementApi.updateStartEndTime({
            id:this.data.details.id,
            status:"NORMAL",
            startTime:this.data.details.startTime,
            endTime:this.data.details.startTime,
            addressTownId:this.data.details.addressTownId,
          }).then(res=>{
            if(res.code==200){
              wx.showToast({
                title: '已确认续费!',
              })
              this.getDetails(this.data.details.phone)
            }else{
              wx.showToast({
                icon:"none",
                title: res.message,
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //提醒
  remind(){
    let id = this.data.details.id
    achievementApi.remind(id).then(res=>{
      if(res.code==200){
        wx.showToast({
          title: '提醒用戶续约成功!',
        })
      }else{
        wx.showToast({
          icon:'none',
          title: '提醒用戶续约失败!',
        })
      }
    })
  },
  //電話聯繫
  callPhone(){
    let cunsId = this.data.cunsId 
    if(cunsId==3){
      var phone = this.data.merchantDetails.phone
    }else{
      var phone = this.data.details.phone
    }
    
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  //解凍
  unfreeze(){
    let cunsId = this.data.cunsId 
    if(cunsId==3){
      wx.showModal({
        title: '提示',
        content: '是否解冻该店铺?',
        success :(res)=> {
          if (res.confirm) {
            achievementApi.storeUnFrozen({
              id:this.data.merchantDetails.id
            }).then(res=>{
              if(res.code==200){
                wx.showToast({
                  title: '该店铺解冻成功!',
                })
                this.getShopDetails(this.data.merchantDetails.id)
              }else{
                wx.showToast({
                  icon:"none",
                  title: res.message,
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '是否解冻该账户?',
        success :(res)=> {
          if (res.confirm) {
            achievementApi.unfreeze(this.data.details.id).then(res=>{
              if(res.code==200){
                wx.showToast({
                  title: '该用户解冻成功!',
                })
                this.getDetails(this.data.details.phone)
              }else{
                wx.showToast({
                  icon:"none",
                  title: res.message,
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
   
  },
  //凍結
  freeze(){
    let cunsId = this.data.cunsId 
    if(cunsId==3){
      wx.showModal({
        title: '提示',
        content: '是否冻结该店铺?',
        success :(res)=> {
          if (res.confirm) {
            achievementApi.storeFrozen({
              id:this.data.merchantDetails.id
            }).then(res=>{
              if(res.code==200){
                wx.showToast({
                  title: '冻结该店铺成功!',
                })
                this.getShopDetails(this.data.merchantDetails.id)
              }else{
                wx.showToast({
                  icon:"none",
                  title: res.message,
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '是否冻结该账户?',
        success :(res)=> {
          if (res.confirm) {
            achievementApi.frozen(this.data.details.id).then(res=>{
              if(res.code==200){
                wx.showToast({
                  title: '冻结该用户成功!',
                })
                this.getDetails(this.data.details.phone)
              }else{
                wx.showToast({
                  icon:"none",
                  title: res.message,
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    
  },
  getShopDetails(id){
    achievementApi.getMerchantShopDetails({
      id
    }).then(res=>{
      if(res.code==200){
        this.setData({
          merchantDetails:res.data
        })
      }
    })
  },
  onLoad(options){
    let userInfo = wx.getStorageSync('userInfo')
    let cunsId=userInfo.userType;
    if(cunsId==3){
      this.getShopDetails(options.id)
    }else{
      this.getDetails(options.phone)
    }
   
    this.setData({
      cunsId
    })
    
  }
})
