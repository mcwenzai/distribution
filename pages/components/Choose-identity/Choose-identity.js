var app=getApp();
Component({
  
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots:true
  },
  properties:{
    flag:{
      type:Boolean,
      value:false
    },
    identity:{
      type:Array,
      value:[
        {
          id:1,
          url:'/image/shiji.png',
          name:'市级代理',
          shopChencked:false
        },
        {
          id:2,
          url:'/image/shangquan2.png',
          name:'商圈代理',
          shopChencked:false
        },
        {
          id:3,
          url:'/image/hehuoren.png',
          name:'超级合伙人',
          shopChencked:false
        }
      ]
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    coId:2
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideChoose(){
      this.setData({
        flag:!this.data.flag
      })
    },
    showChoose(){
      this.setData({
        flag:!this.data.flag
      })
    },
    onCancel() {
      this.hideChoose()
      this.triggerEvent("error");
    },
  // 确认身份并跳转
    onConfirm(e) {
      this.triggerEvent("success")
      let identity=this.data.identity;
      identity.forEach(item=>{
        if(item.shopChencked==true){
          app.requestDetailid=item.id;
          wx.navigateTo({
            url: '../verification/verification',
          })
          this.hideChoose()
        }else{
          // wx.showToast({
          //   title: '请选择身份',
          //   icon:'none'
          // })
        }
      })
      
    },
    // 选择身份
    handleChecked:function(e){
      var identity=this.data.identity;
      for(let i=0;i<identity.length;i++){
        if(identity[i].id==e.currentTarget.dataset.id){
          identity[i].shopChencked=true
        }else{
          identity[i].shopChencked=false
        }
      }
      this.setData({
        identity
      })
    },
    //解决滚动穿透问题

    myCatchTouch: function () {
      return
    }
  }
  
})
