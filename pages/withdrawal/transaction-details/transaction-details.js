import { UserApi} from "../../../api/user"
const userApi = new UserApi()
import {formatTime} from "../../../utils/util"
Page({
  data: {
    withdrawId:"",
    details:{}
  },
  onLoad(options){
    if(options.id){
      
      let withdrawId = options.id
      this.setData({
        withdrawId,
      },()=>{
        this.getWithdrawDetails()
      })
    }
  },
  getWithdrawDetails(){
    let withdrawId = this.data.withdrawId
    userApi.getWithdrawalInfo(withdrawId).then(res=>{
      if(res.code==200){
        let details = res.data
        details.createTime = formatTime(new Date( details.createTime))
        details.arriveTime = formatTime(new Date( details.arriveTime))
        this.setData({
          details:res.data
        })
      }
    })
  }
  
})