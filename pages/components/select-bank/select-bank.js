import {AreaApi} from "../../../api/area"
const areaApi = new AreaApi()
Component({
  
/**
   * 组件的属性列表
   */
  properties: {
    isShowSelect:{
      type:Boolean,
      value:false
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    list:[],
    keywords:""
  },
  lifetimes:{
    attached(){
        this.bankSearch()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    search(){
        this.bankSearch()
    },
    bankSearch(){
        areaApi.bankSearch({
            keywords:this.data.keywords
        }).then(res=>{
            if(res.code==200){
                this.setData({
                    list:res.data
                })
            }
        })
    },
    close(){
      this.setData({
        
      })
      this.hideRess()
    },
    
    searchInput(e){
        this.setData({
            keywords:e.detail.value
        })

    },
    
    
    selectOption(event){
      let bankName =  event.currentTarget.dataset.name
      
      this.triggerEvent("selectEnd",bankName);
      this.setData({
        isShowSelect:false
      })
    },
    hideRess(){
      this.setData({
        isShowSelect:!this.data.isShowSelect
      })
    },
    showRess(){
      this.setData({
        isShowSelect:!this.data.isShowSelect
      })
    },
  }
})
