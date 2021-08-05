import {
  AchievementApi
} from "../../api/achievement"
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
    partner2: [{
        id: 1,
        name: '合伙人明细',
        checked: true
      },
      {
        id: 2,
        name: '合伙人收入',
        checked: false
      }
    ],
    shop: [{
        id: 1,
        name: '店铺明细',
        checked: true
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
    Id: 1,
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
    partnerType: ''
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
      mansg = this.data.partner2
      if (this.data.partnerType == 1) {
        this.setData({
          searchPlace: "搜索合伙人"
        })
        wx.setNavigationBarTitle({
          title: '合伙人管理'
        })

      } else if (this.data.partnerType == 2) {
        mansg = partner
        this.setData({
          searchPlace: "搜索超级合伙人"
        })
        wx.setNavigationBarTitle({
          title: '超级合伙人管理'
        })
      }

    } else if (cunsId == 5) {
      mansg = this.data.partner2
      this.setData({
        searchPlace: "搜索合伙人"
      })
      wx.setNavigationBarTitle({
        title: '合伙人管理'
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

    }else if(cunsId == 5){
      achievementApi.getPartner({
        status: '',
        key: this.data.incomeSearchName,
      }).then(res => {
        if (res.code == 200) {
          this.setData({
            incomeList: res.data.data
          })
        }
      })
    } else {
      let userType = ''
      if (this.data.userInfo.userType == 1) {
        userType = 2
      } else if (this.data.userInfo.userType == 2) {
        if (this.data.partnerType == 1) {
          userType = 3
        } else {
          userType = 5
        }
      }
      achievementApi.getAgentUserList({
        status: '',
        userName: this.data.incomeSearchName,
        userType
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

    } else if(cunsId == 5){
      achievementApi.getPartner({
        status: this.data.selectType,
        key: this.data.searchName,
      }).then(res => {
        if (res.code == 200) {
          this.setData({
            agentUserList: res.data.data,
            agentUserCount: res.data.partnerNums,
            totalAmount: res.data.totalMoney,
          })
        }
      })
    }else {
      let userType = ''
      if (this.data.userInfo.userType == 1) {
        userType = 2
      } else if (this.data.userInfo.userType == 2) {
        if (this.data.partnerType == 1) {
          userType = 3
        } else {
          userType = 5
        }
      }
      achievementApi.getAgentUserList({
        status: this.data.selectType,
        userName: this.data.searchName,
        userType
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
    if (this.data.userInfo.userType == 3) {
      this.selectShopDetail()
    } else {
      this.getAgentUserList()
    }
  },
  onLoad(options) {
    console.log(options)
    if (options.partnerType) {
      let partnerType = options.partnerType
      this.setData({
        partnerType
      })
    }
    // options.partnerType 1 合伙人管理 2 超级合伙人管理
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

  getPartner(){
    achievementApi.getPartner({
      status: this.data.selectType,
      key: this.data.searchName,
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          agentUserList: res.data.data,
          agentUserCount: res.data.partnerNums,
          totalAmount: res.data.totalMoney,
          incomeList: res.data.data
        })
      }
    })
  },


  getAgentUserList() {
    let userType = ''
    if (this.data.userInfo.userType == 1) {
      userType = 2
    } else if (this.data.userInfo.userType == 2) {
      if (this.data.partnerType == 1) {
        userType = 3
      } else {
        userType = 5
      }
    }
    achievementApi.getAgentUserList({
      status: this.data.selectType,
      userName: this.data.searchName,
      userType
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
        url: './detailed/detailed?id=' + id,
      })

    } else {
      let phone = event.currentTarget.dataset.phone
      wx.navigateTo({
        url: './detailed/detailed?phone=' + phone,
      })
    }

  },
  Checkeds(e) {
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
      if (this.data.userInfo.userType == 3) {
        this.selectShopDetail()
      }else if(this.data.userInfo.userType == 3){
        this.getPartner()
      } else {
        this.getAgentUserList()
      }

    })
  }
})