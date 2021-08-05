var app=getApp();
Page({
  data:{
    stype:[
      {
        id:1,
        laber:"身份认证",
        isActive: true
      },
      {
        id:2,
        laber:"缴费",
        isActive: false
      },
      {
        id:3,
        laber:"认证结果",
        isActive: false
      }
    ],
    review:[
      {
        name:'提交认证',
        tiem:'2021-01-21 12:24:36'
      },
      {
        name:'认证审核',
        tiem:'2021-01-21 12:48:05'
      },
      {
        id:1,
        name:'认证通过',
        reason:'恭喜您认证通过！',
        tiem:'2021-01-25 14:48:05'
      }
    ],
    cunId:1,
    Id:0,
  },
  onLoad(){
    var id=getApp().requestDetailid;
    this.setData({
      Id:id
    })
  },
  onShow(){
    var id=this.data.Id;
    var stype=this.data.stype;
    stype.forEach(item=>{
      if(id!==1&&item.id==2){
        stype.splice(1,1)
      }
    })
    this.setData({
      stype
    })
  },
  handleItemTap:function(e){
    var index=e.currentTarget.dataset.index;
    var id=e.currentTarget.dataset.id;
    var stype=this.data.stype;
    stype.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      stype,
      cunId:id
    })
  }
})