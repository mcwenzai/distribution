import {BusinessApi} from "../../api/business"
const businessApi = new BusinessApi()
Page({
  onReady:function(){
    this.expla  = this.selectComponent("#expla");
    this.prompt = this.selectComponent("#prompt");
  },
  data:{
    businessList:[],
    location:'',
    userInfo:{},
    showDel:false,
    businessAreaCode:""
  },
  onShow(){
    this.getBusinessList()
  },
  onLoad(){
    this.setData({
      userInfo:wx.getStorageSync('userInfo')
    })
  },
  getBusinessList(){
    businessApi.selectBusinessDistrict().then(res=>{
      if(res.code==200){
        this.setData({
          businessList:res.data.AddressTown,
          location:res.data.location
        })
      }
    })
  },
  explaIdentity(){
    this.expla.showExpla();
  },
  promptked(event){
    let code = event.currentTarget.dataset.code
    this.setData({
      showDel:true,
      businessAreaCode:code
    })
  },
  onCancelss(){
    this.expla.hideExpla()
  },
  edit(event){
    let code = event.currentTarget.dataset.code
    wx.navigateTo({
      url: './business/business?code=' + code,
    })
  },
  onDelete(){

    this.setData({
      showDel:false
    })
    businessApi.delBusiness(this.data.businessAreaCode).then(res=>{
      if(res.code==200){
          wx.showToast({
            title: '删除商圈成功!',
          })
          this.getBusinessList()
      }else{
          wx.showToast({
            icon:"none",
            title: res.data,
          })
      }
    })
  },
  onConfir(){
   
    this.setData({
      showDel:false
    })
  },
  bindsues(){
    wx.navigateTo({
      url: './business/business',
    })
  }
})