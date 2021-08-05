// pages/components/delete-prompt/delete-prompt.js
Component({
  options: {
    multipleSlots:true
  },
  properties:{
    flag:{
      type:Boolean,
      value:false
    },
    title:{
      type:String,
      value:'温馨提示',
    },
    promptText:{
      type:String,
      value:'',
    },
    promptText:{
      type:String,
      value:'',
    },
    showLeftBtn:{
      type:Boolean,
      value:true
    },
    showRightBtn:{
      type:Boolean,
      value:true
    },
    confirmBtnText:{
      type:String,
      value:'确认',
    },
    cancelBtnText:{
      type:String,
      value:'取消',
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hidePrompt(){
      this.setData({
        flag:false
      })
    },
    showPrompt(){
      this.setData({
        flag:true
      })
    },
    onCancel() {
      this.hidePrompt()
      this.triggerEvent("OnCancel");
    },
    onConfirm(){
      this.hidePrompt()
      this.triggerEvent("OnConfirm");
    }
  }
})
