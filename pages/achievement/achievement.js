import {
  AchievementApi
} from "../../api/achievement"
import {formatTime} from "../../utils/util"
import {
  UserApi
} from "../../api/user"
const achievementApi = new AchievementApi()
const userApi = new UserApi()
Page({
  data: {
    stration: [{
        id: 1,
        Url: '/image/guanli.png',
        tex: '商圈代理管理'
      },
      {
        id: 2,
        Url: '/image/hehuotong.png',
        tex: '合伙人管理'
      },
      {
        id: 3,
        Url: '/image/dianpuguanli.png',
        tex: '店铺管理'
      },
      {
        id: 5,
        Url: '/image/hehuotong.png',
        tex: '合伙人管理'
      },
    ],
    managements: [],
    cunsId: 1,
    userInfo: null,
    showModal: false,
    count:0,
    list:[]
  },
  goShopManagement(){
      wx.navigateTo({
        url: './shopManagement/ShopManagement',
      })
  },
  onConfirm() {
    wx.switchTab({
      url: '../my/my',
    })
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    this.getUserInfo()
  },
  getAgentNoticeList() {
    achievementApi.getAgentNoticeList({
      informer: this.data.userInfo.phone,
     
    }).then(res => {
      
      let count = 0 
      let data = res.data
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element.status==1){
          count++
        }
      }
      let oneNotice 
      
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(index==0){
          oneNotice = element
          oneNotice.createTime = formatTime(new Date(oneNotice.createTime))
          break
        }
      }
      
      this.setData({
        count,
        oneNotice,
        list:data
      })
     
    })
  },
  //

  async getUserInfo() {
    await userApi.getAgentUserInfo().then(res => {
      if (res.code == 200) {
        wx.setStorageSync('userInfo', res.data)
        this.setData({
          userInfo: res.data
        })
        let cunsId = res.data.userType;
        let stration = this.data.stration;
        let managements = this.data.managements;
        stration.forEach(item => {
          if (cunsId == item.id) {
            managements = {
              item
            }
          }
        })
        this.setData({
          managements,
          cunsId
        })
        if (res.data.status == 'NO_AUTHENTICATION' ) {
          this.setData({
            showModal: true
          })
        } else {
          this.setData({
            showModal: false
          })
        }
      }
    })
    this.getAgentNoticeList()
  },
  onLoad() {

  },
  business(e) {
    console.log(e)
    console.log(this.data.userInfo.userType)
    let type = e.currentTarget.dataset.type
    if(this.data.userInfo.userType==2){
      wx.navigateTo({
        url: '../management/management?partnerType=' + type,
      })
    }else{
      wx.navigateTo({
        url: '../management/management',
      })
    }
    
  },
  cheganDetails() {
    wx.navigateTo({
      url: '../shop-details/shop-details',
    })
  }
})