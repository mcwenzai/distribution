import {EarningsApi} from "../../api/earnings"
const earningsApi = new EarningsApi()
Page({
  data:{
    list:[]
  },
  getFundDetail(){
    earningsApi.getFundDetail().then(res=>{
     if(res.code==200){
       this.setData({
         list:res.data
       })
     }
    })
  },
  onLoad(){
    this.getFundDetail()
  },
})