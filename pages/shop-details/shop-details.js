import {AchievementApi} from "../../api/achievement"
const achievementApi = new AchievementApi()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyName:'',
    merchantList:[],
    checked:true,
    state:[
      {
        id:'',
        status:'全部',
        checkeds:true
      },
      {
       
        id:'0',
        status:'未入驻',
        checkeds:false
      },
      { 
        id:'2',
        status:'入驻成功',
        checkeds:false
      },
      {
        
        id:'1',
        status:'入驻审核中',
        checkeds:false
      },
      
      { 
        id:'3',
        status:'入驻失败',
        checkeds:false
      },
      { 
        id:'COMPLETED',
        status:'入网成功',
        checkeds:false
      },
      { 
        id:'REVIEWING',
        status:'入网审核中',
        checkeds:false
      },
      { 
        id:'REVIEW_BACK',
        status:'入网失败',
        checkeds:false
      },
     
    ],
    status:false,
    statusName:'',
    selectType:"",
    merchantStatusList:[]
  },
  getSettleInStatus(){
    achievementApi.settleInStatus({
      merchantApiStatus:this.data.selectType
    }).then(res=>{
      if(res.code==200){
        this.setData({
          merchantStatusList:res.data
        })
      }
    })
  },
  Checkeds(e){
    let state=this.data.state;
    var index=e.currentTarget.dataset.index;
    let name=this.data.statusName;
    state.forEach((v, i) => i === index ? v.checkeds = true : v.checkeds = false);
    state.forEach(item=>{
      if(item.checkeds==true){
        name=item.status
      }
    })
    this.setData({
      state,
      statusName:name,
      status:!this.data.status,
      selectType:state[index].id,
    },()=>{
      this.getSettleInStatus()
    })
  },
  Change(){
    this.setData({
      status:!this.data.status
    })
  },
  agentTap(e){
    let index = e.currentTarget.dataset.index
    if(index==0){
      this.setData({
        checked:true
      })
    }else{
      this.setData({
        checked:false
      })
    }
  },
  search(){
    this.selectShopDetail()
  },
  searchNameInput(e){
   console.log(e)
    this.setData({
      companyName:e.detail.value
    })
  },
  selectShopDetail(){
    achievementApi.selectShopDetail({
      companyName:this.data.companyName
    }).then(res=>{
      if(res.code==200){
        this.setData({
          merchantList:res.data.storeInfoDTO
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.selectShopDetail()
    this.getSettleInStatus()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})