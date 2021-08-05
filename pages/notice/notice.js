import { AchievementApi } from "../../api/achievement"
import {formatTime} from "../../utils/util"
const achievementApi = new AchievementApi()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    noticeList:[],
    userType:0
  },
  getAgentNoticeList() {
    achievementApi.getAgentNoticeList({
      informer: this.data.userInfo.phone,
    }).then(res => {
      if(res.code==200){
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          element.createTime = formatTime(new Date(element.createTime))
        }
        this.setData({
          noticeList:res.data,
        })
      }
    })
  },
  details(e){
    let type = e.currentTarget.dataset.type
    let phone = e.currentTarget.dataset.phone
    let noticeId = e.currentTarget.dataset.id
    let status = e.currentTarget.dataset.status
    //加入详情
    if(type==1){
      wx.navigateTo({
        url: '../handle/handle?phone='+ phone + '&type=' + type + '&noticeId=' + noticeId + '&status=' + status,
      })
    }else if(type==2){
      wx.navigateTo({
        url: '../handle/handle?phone='+ phone + '&type=' + type+ '&noticeId=' + noticeId + '&status=' + status,
      })
    }
    
  },
  onShow(){
    this.getAgentNoticeList()
  },
  onLoad(){
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo,
      userType:userInfo.userType
    })
  },
})
