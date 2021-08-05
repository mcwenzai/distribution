import { UserApi} from "../../api/user"
const userApi = new UserApi()
Page({
  data:{
    code:"",
    showModal:false,
    identity:[
      {
        id:1,
        url:'/image/daili.png'
      },
      {
        id:2,
        url:'/image/shangquan.png'
      },
      {
        id:3,
        url:'/image/yewuyuan.png'
      }
      ,
      {
        id:5,
        url:'/image/chaojihehuoren.png'
      }
    ],
    imagrurl:'',
    cunId:1,
    isShowChoose:false,
    wxCode:'',
    identityList:[
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
        name:'合伙人',
        shopChencked:false
      }
    ]
  },
  noTap(){
    wx.showToast({
      icon:"none",
      title: '暂未开放!',
    })
  },
  onShow(){
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2 
      })
    }

    this.getAgentUserInfo()
  },
  goUp(){
    wx.navigateTo({
      url: './../partner-up/partner-up',
    })
  },
  getwxacode(){
    userApi.getwxacode().then(res=>{
    
      if(res.code==200){
        let code = 'https://' + res.data.split('://')[1]
        console.log(code)
        this.setData({
          wxCode:code
        })
      }
    })
  },
  onLoad(){
    this.getwxacode()
  },
  onShareAppMessage(){
    let shareInfo = {
      title:"邀请注册",
      path:'/pages/login/inviteRegister/inviteRegister?userName=' + this.data.userInfo.userName + '&phone='+ this.data.userInfo.phone,
      imageUrl:this.data.wxCode
    };
    return shareInfo
  },
  getAgentUserInfo(){
    userApi.getAgentUserInfo().then(res=>{
      if(res.code==200){
        wx.setStorageSync('userInfo', res.data)
          let identity=this.data.identity;
          let cunId=res.data.userType;
          let imagrurl= '';
          identity.forEach(item => {
            if(cunId==item.id){
              imagrurl=item.url
           }    
         });
        this.setData({
          userInfo:res.data,
          imagrurl,
          code:res.data.phone
        })
        switch (cunId) {
          case 1:
            this.setData({
              identityList:[
                {
                  id:1,
                  url:'/image/shiji.png',
                  name:'市级代理',
                  shopChencked:true
                },
              ]
            })
            break;
            case 2 :
              this.setData({
                identityList:[ {
                  id:2,
                  url:'/image/shangquan2.png',
                  name:'商圈代理',
                  shopChencked:true
                },]
              })
              break;
              case 3 :
                this.setData({
                  identityList:[ {
                    id:3,
                    url:'/image/hehuoren.png',
                    name:'合伙人',
                    shopChencked:true
                  },]
                })
              break;
          default:
            break;
        }
        if(res.data.status == 'NO_AUTHENTICATION'){
          this.setData({
            isShowChoose:true
          });
        }else{
          this.setData({
            isShowChoose:false
          });
        }
      }
    })
  },
  onReady:function(){
    this.Choose = this.selectComponent("#choose");
    this.expla = this.selectComponent("#expla");
  },
  chooseIdentity(){
    // this.Choose.showChoose();
    this.setData({
      isShowChoose:!this.data.isShowChoose
    })
  },
  chenCode(){
      if(this.data.userInfo.status=="NO_AUTHENTICATION" || this.data.userInfo.status=="FAILED" ){
        wx.showToast({
          icon:"none",
          title: '请先通过身份认证',
        })
        return
      }
      this.expla.showExpla();
  },
  onCancelss(){
    this.expla.hideExpla()
  },
  onConfirm(){
    
  },
  // 复制邀请码
  copyBtn:function(e){
    wx.setClipboardData({
      data: this.data.code,
      success:function(res){
        wx.showToast({
          title: '复制成功',
          icon:'none'
        })
      }
    })
  }
})