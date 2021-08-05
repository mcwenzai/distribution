import {BusinessApi} from "../../../api/business"
const businessApi = new BusinessApi()
Page({
  onReady:function(){
    this.ress = this.selectComponent("#ress");
  },
  data:{
    userInfo:{},
    selectElementList:[],
    name:"",
    cityCodeId:"",
    businessAreaCode:"",
    detailsStreetList:[]
  },
  onShow(){
    
  },
  nameInput(event){
    this.setData({
      name:event.detail.value
    })
  },
  save(){
    let name =  this.data.name
    let selectElementList =  this.data.selectElementList
    if(selectElementList.length<=0){
      wx.showToast({
        icon:'none',
        title: '请设置商圈街道!',
      })
      return
    }
    if(!name){
      wx.showToast({
        icon:'none',
        title: '请输入商圈名称!',
      })
      return
    }
    let obj 
   if(this.data.businessAreaCode){
    obj={
      businessAreaCode:this.data.businessAreaCode,
      businessAreaName:name,
      mapList:selectElementList
    }
   }else{
    obj={
      businessAreaName:name,
      mapList:selectElementList
    }
   }
    businessApi.addBusiness(obj).then(res=>{
      if(res.code==200){
        wx.showToast({
          title: '设置商圈成功!',
        })
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1,
          })
        },1000)
      }else{
        wx.showToast({
          icon:"none",
          title: res.data,
        })
      }
    })
  },
  cancel(){
    wx.navigateBack({
      delta: 1,
    })
  },
  delElement(e){
    let index = e .currentTarget.dataset.index
    let arr = this.data.selectElementList.splice(index,1)
    this.setData({
      selectElementList:this.data.selectElementList
    })
  },
  onConfirm(event){
    let data = event.detail
    let arr = this.data.detailsStreetList.concat(data)
    

    this.setData({
      selectElementList:arr
    })
  },
  getDetails(id){
    businessApi.getBusinessDetails(id).then(res=>{
      if(res.code==200){
        this.setData({
          name:res.data.businessAreaName,
          selectElementList:res.data.mapList,
          detailsStreetList:res.data.mapList
        })
      }
    })
  },
  onLoad(options){
    if(options.code){
      this.setData({
         businessAreaCode:options.code
      })
      this.getDetails(options.code)
    }
    this.setData({
      userInfo:wx.getStorageSync('userInfo'),
      cityCodeId:wx.getStorageSync('userInfo').cityCodeId
    })
  },
  RessIdentity(){
    this.ress.showRess();
  },
})