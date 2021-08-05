import {
  AchievementApi
} from "../../../api/achievement"
const achievementApi = new AchievementApi
Page({
  data: {
    agent: [{
        id: 1,
        name: '商圈代理明细',
        checked: true
      },
      {
        id: 2,
        name: '商圈代理收入',
        checked: false
      }
    ],
    partner: [{
        id: 1,
        name: '超级合伙人明细',
        checked: true
      },
      {
        id: 2,
        name: '超级合伙人收入',
        checked: false
      }
    ],
    shop: [{
        id: 0,
        name: '入驻/入网状态',
        checked: true
      },
      {
        id: 1,
        name: '店铺明细',
        checked: false
      },
      {
        id: 2,
        name: '店铺收入',
        checked: false
      }
    ],
    state: [{
        ban: 4,
        id: '',
        status: '全部',
        checkeds: true
      },
      {
        ban: 0,
        id: 'NORMAL',
        status: '正常',
        checkeds: false
      },
      {
        ban: 2,
        id: 'OVERDUE',
        status: '已断约',
        checkeds: false
      },
      {
        ban: 1,
        id: 'FROZEN',
        status: '冻结',
        checkeds: false
      }
    ],
    enterState:[
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
    Id: 0,
    status: false,
    mansg: [],
    statusName: '',
    agentUserList: [],
    agentUserCount: 0,
    totalAmount: 0,
    ban: 4,
    searchName: "",
    incomeSearchName: "",
    incomeList: [],
    enterStatus:false,
    enterStatusName:'',
    enterStatusSelectType:'',
    merchantStatusList:[]
  },
  getSettleInStatus(){
    achievementApi.settleInStatus({
      merchantApiStatus:this.data.enterStatusSelectType
    }).then(res=>{
      if(res.code==200){
        this.setData({
          merchantStatusList:res.data
        })
      }
    })
  },
  checkeds(e){
    let enterState=this.data.enterState;
    var index=e.currentTarget.dataset.index;
    let name=this.data.enterStatusName;
    enterState.forEach((v, i) => i === index ? v.checkeds = true : v.checkeds = false);
    enterState.forEach(item=>{
      if(item.checkeds==true){
        name=item.status
      }
    })
    
    this.setData({
      enterState,
      enterStatusName:name,
      enterStatus:!this.data.enterStatus,
      enterStatusSelectType:enterState[index].id,
    },()=>{
      this.getSettleInStatus()
    })
  },
  enterStatusChange(){
    this.setData({
      enterStatus:!this.data.enterStatus
    })
  },
  setTitle() {
    let userInfo = wx.getStorageSync('userInfo');
    let cunsId = userInfo.userType
    let mansg = this.data.mansg;
    var agent = this.data.agent;
    var partner = this.data.partner;
    var shop = this.data.shop;
    if (cunsId == 1) {
      mansg = agent
      this.setData({
        searchPlace: "搜索商圈代理"
      })
    } else if (cunsId == 2) {
      mansg = partner
      this.setData({
        searchPlace: "搜索超级合伙人"
      })
      wx.setNavigationBarTitle({
        title: '业务员管理'
      })
    } else if (cunsId == 3) {
      mansg = shop
      this.setData({
        searchPlace: "搜索店铺名称"
      })
      wx.setNavigationBarTitle({
        title: '店铺管理'
      })
    }else if (cunsId == 5) {
      mansg = shop
      this.setData({
        searchPlace: "搜索店铺名称"
      })
      wx.setNavigationBarTitle({
        title: '店铺管理'
      })
    }
    this.setData({
      mansg
    })
  },
  incomesearchInput(e) {
    this.setData({
      incomeSearchName: e.detail.value
    })
  },
  searchInput(e) {
    this.setData({
      searchName: e.detail.value
    })
  },
  incomeSearch() {
    let cunsId = this.data.cunsId
    if (cunsId == 3) {

    } else {
      achievementApi.getAgentUserList({
        status: this.data.selectType,
        userName: this.data.incomeSearchName,
      }).then(res => {
        if (res.code == 200) {
          this.setData({
            incomeList: res.data.agentUser
          })
        }
      })
    }

  },
  search() {
    let cunsId = this.data.cunsId
    if (cunsId == 3) {

    } else {
      achievementApi.getAgentUserList({
        status: this.data.selectType,
        userName: this.data.searchName,
      }).then(res => {
        if (res.code == 200) {
          this.setData({
            agentUserList: res.data.agentUser,
            agentUserCount: res.data.agentUserCount,
            totalAmount: res.data.totalAmount,
          })
        }
      })
    }
  },
  onShow() {
    if (this.data.userInfo.userType == 3 || this.data.userInfo.userType == 5) {
      this.selectShopDetail()
      this.getSettleInStatus()
    } else {
      this.getAgentUserList()
    }
  },
  onLoad() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    }, () => {
      this.setData({
        cunsId: this.data.userInfo.userType
      })
      this.setTitle()
      //该用户是否为超级合伙人
    })

  },
  selectShopDetail() {
    achievementApi.selectShopDetail({
      ban: this.data.ban
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          agentUserList: res.data.storeInfoDTO,
          agentUserCount: res.data.count,
          totalAmount: res.data.totalAmount,
          incomeList: res.data.storeInfoDTO
        })
      }
    })
  },
  getAgentUserList() {
    achievementApi.getAgentUserList({
      status: this.data.selectType,
      userName: this.data.searchName,
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          agentUserList: res.data.agentUser,
          agentUserCount: res.data.agentUserCount,
          totalAmount: res.data.totalAmount,
          incomeList: res.data.agentUser
        })
      }
    })
  },
  AgentTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var mansg = this.data.mansg;
    mansg.forEach((v, i) => i === index ? v.checked = true : v.checked = false);
    this.setData({
      mansg,
      Id: id
    })
  },
  Change() {
    this.setData({
      status: !this.data.status
    })
  },
  statusChage(event) {
    let cunsId = this.data.cunsId
    if (cunsId == 3) {
      let id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '../../management/detailed/detailed?id=' + id,
      })

    }

  },
  Checkeds: function (e) {
    let state = this.data.state;
    var index = e.currentTarget.dataset.index;
    let name = this.data.statusName;
    let ban = e.currentTarget.dataset.ban
    state.forEach((v, i) => i === index ? v.checkeds = true : v.checkeds = false);
    state.forEach(item => {
      if (item.checkeds == true) {
        name = item.status
      }
    })
   
    this.setData({
      state,
      statusName: name,
      status: !this.data.status,
      selectType: state[index].id,
      ban: ban
    }, () => {
      if (this.data.userInfo.userType == 3|| this.data.userInfo.userType == 5) {
        this.selectShopDetail()
      } else {
        this.getAgentUserList()
      }

    })
  }
})