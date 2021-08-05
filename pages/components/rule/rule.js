
Component({
  
  options:{
    multipleSlots:true
  },
  properties: {   
    title:{
      type:String,
      value:'提现规则'
    }, 
    flag:{
      type:Boolean,
      value:false
    },
    
    ruleList: {
      type:Array,
      value: [
        {lineText:'1、只有可提现余额可提现，未到账余额无法提现。'},
        {lineText:'2、需满足以下条件，才可通过提现申请：',list:['（1）单笔提现金额最低为0元；','（2）提现需扣除提现金额6%手续费。']},
        {lineText:'3、申请提现后可至“我的-收益管理-提现记录”内查看提现进度。 '},
        {lineText:'4、如果提现出现任何问题，可“意见反馈”或“联系客服”处理。 '},
      ]
    }
  },
  data: {
   
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hidesRule:function(){
      this.setData({
        flag:!this.data.flag
      })
    },
    showRule(){
      this.setData({
        flag:!this.data.flag
      })
    },
    onCancel(){
      
      this.triggerEvent("error")
    }
  }
  
})
