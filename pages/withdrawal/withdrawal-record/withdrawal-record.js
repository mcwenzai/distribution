// pages/withdrawal/withdrawal-record/withdrawal-record.js
import {UserApi}  from "../../../api/user"
import {formatTime} from "../../../utils/util"
const userApi = new UserApi()
Page({
  data:{
    list:[]
    
  },
  getWithdrawalList(){
    userApi.getWithdrawalList()
      .then(res=>{
        let arr = res.data
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          element.createTime = formatTime(new Date(element.createTime))
        }
        if(res.code==200){
          this.setData({
            list:res.data
          })
        }
      })
  },
  onShow(){
    this.getWithdrawalList()
  },
  
  
})