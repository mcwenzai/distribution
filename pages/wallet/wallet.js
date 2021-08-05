import {EarningsApi} from "../../api/earnings"
const earningsApi = new EarningsApi()
Page({
  data:{
    balance:0,
    list:[],
    notArrivalAmount:0,
    desClose:false,
    ruleList: [
        {lineText:'可提现余额是您与平台合作其间因厂商、商户销售货品（商品）、入驻服务费产生的相关收入，但不包括因交易、货品（商品）产生的补偿金以及退款（补偿金、退款在我的余额-未到账余额中可查看详情）'},
      ]
    
  },
  close(){
    this.setData({
      desClose:false
    })
  },
  show(){
    this.setData({
      desClose:true
    })
  },
  getBankroll(){
    earningsApi.getBankroll().then(res=>{
      if(res.code==200){
        this.setData({
          balance:res.data.balance,
          list:res.data.fundDetailVoList,
          notArrivalAmount:res.data.notArrivalAmount
          
        })
      }
    })
  },
  onShow(){
    this.getBankroll()
  },
  onReady:function(){
    this.rules=this.selectComponent("#Rule")
  },
  Viewrules(){
    this.rules.showRule()
  },
  onCancel(){
    this.rules.hidesRule()
  }
})