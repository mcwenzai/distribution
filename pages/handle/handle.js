import {NoticeApi} from "../../api/notice"
import {AchievementApi}  from "../../api/achievement"
import {BusinessApi}  from "../../api/business"
import {AreaApi}  from "../../api/area"
const  achievementApi = new AchievementApi()
const  businessApi = new BusinessApi()
const  areaApi = new AreaApi()
const  noticeApi = new NoticeApi()
Page({
  data:{
    noticeId:1,
    reminder:false,
    phone:'',
    details:{},
    businessList:[],
    businessAreaCode:"",
    businessAreaName:"",
    townName:"",
    endTime:"",
    startTime:"",
    isSelf:false,
    noticeid:"",
    isHandle:false
  },
  onEndTimePickerChange(e){
    let endTime = e.detail.value
    this.setData({
      endTime,
    })
  },
  onStartTimePickerChange(e){
    let startTime = e.detail.value
    this.setData({
      startTime,
    })
  },
  //電話聯繫
  callPhone(){
    var phone = this.data.details.phone
    wx.makePhoneCall({
      phoneNumber: phone,
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
  confirmPay(){
    let that = this
    if(!that.data.startTime || !that.data.endTime){
      wx.showToast({
        icon:"none",
        title: '请选择续期时间!',
      })
      return
    }
    let obj =  {
      id:that.data.details.id,
      addressTownId:that.data.details.addressTownId ? that.data.details.addressTownId : this.data.businessAreaCode,
      status:"NORMAL",
      startTime:that.data.startTime,
      endTime:that.data.endTime
    }
    wx.showModal({
      title: '提示',
      content: '确认用户是否续费?',
      success (res) {
        if (res.confirm) {
          noticeApi.agreeJoinUs(obj).then(res=>{
            if(res.code==200){
              wx.showToast({
                title: '确认用户续费成功!',
              })
              setTimeout(()=>{
                  wx.navigateBack({
                    delta: 1,
                  })
              },1000)
            }else{
              wx.showToast({
                icon:"none",
                title: '确认用户续费失败!',
              })
            }
          })
        } else if (res.cancel) {
        
        }
      }
    })
  },
  agreeJoinUs(){
    let that = this
    if(that.data.noticeId == 1){
      if(!that.data.businessAreaCode){
        wx.showToast({
          icon:"none",
          title: '请设置商圈!',
        })
        return
      }
    }
    if(!that.data.startTime || !that.data.endTime){
      wx.showToast({
        icon:"none",
        title: '请选择续期时间!',
      })
      return
    }
    
    let obj =  {
      id:that.data.details.id,
      addressTownId:that.data.details.addressTownId ? that.data.details.addressTownId : this.data.businessAreaCode,
      status:"NORMAL",
      startTime:that.data.startTime,
      endTime:that.data.endTime,
      noticeId:that.data.noticeid
    }
    wx.showModal({
      title: '提示',
      content: '是否同意该用户加入?',
      success (res) {
        if (res.confirm) {
          noticeApi.agreeJoinUs(obj).then(res=>{
            if(res.code==200){
              wx.showToast({
                title: '同意加入成功!',
              })
              setTimeout(()=>{
                  wx.navigateBack({
                    delta: 1,
                  })
              },1000)
            }else{
              wx.showToast({
                icon:"none",
                title: '同意加入失败!',
              })
            }
          })
        } else if (res.cancel) {
        
        }
      }
    })
  },
  //选择商圈
  bindPickerChange(e){
    console.log(e)
    let index = e.detail.value
    let businessAreaCode = this.data.businessList[index].businessAreaCode
    let businessAreaName = this.data.businessList[index].businessAreaName
    areaApi.selectTownNameInfo({
      businessAreaCode:businessAreaCode
    }).then(res=>{
      if(res.code==200){
        this.setData({
          businessAreaCode,
          townName:res.data.townName,
          businessAreaName,
        })
        
      }
    })
  },
  //获取商圈列表
  getbusinessList(){
    businessApi.selectBusinessDistrict().then(res=>{
      if(res.code==200){
        this.setData({
          businessList:res.data.AddressTown,
        })

      }
    })
  },
  getDetails(phone){
    achievementApi.selectAgentUserVOByPhone(
      phone
    ).then(res=>{
      if(res.code==200){
        if(this.data.noticeId ==1){
          this.setData({
            details:res.data
          })
        }else if(this.data.noticeId == 2){
          this.setData({
            details:res.data,
            businessAreaCode:res.data.businessAreaCode,
            businessAreaName:res.data.businessAreaName,
            townName:res.data.addressTown,
          })
        }else if(this.data.noticeId == 3){
          this.setData({
            details:res.data,
            businessAreaCode:res.data.businessAreaCode,
            businessAreaName:res.data.businessAreaName,
            townName:res.data.addressTown,
          })
        }
        
      }
    })
  },
  // noticeId
  // 1 市级代理处理加入申请
  // 2 商圈代理处理加入申请
  // 3 市级的断约处理
  onLoad(options){
    let phone = options.phone
    let noticeType = options.type
    let noticeid = options.noticeId
    let status = options.status
    if(status==2){
      this.setData({
        isHandle:true
      })
    }else if(status==1){
      this.setData({
        isHandle:false
      })
    }
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      noticeid
    })
    if(userInfo.userType == 1 && noticeType == 1){
      //市级代理的加入处理
      wx.setNavigationBarTitle({
        title: '加入处理'
      })
      this.setData({
        noticeId:1,
        phone
      },()=>{
        this.getDetails(phone)
        this.getbusinessList()
      })
      
    }else if(userInfo.userType == 2 && noticeType == 1){
      this.setData({
        noticeId:2,
        phone
      },()=>{
        this.getDetails(phone)
      })
    }
    else if(userInfo.userType == 1 && noticeType == 2){
      wx.setNavigationBarTitle({
        title: '断约处理'
      })
      //是否是自己的断约处理
      if(userInfo.phone==phone){
        this.setData({
          isSelf:true
        })
      }
      this.setData({
        noticeId:3,
        phone
      },()=>{
        this.getDetails(phone)
      })
    }
    
   
   
  },
  
})