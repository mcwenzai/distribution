import {
  IndexApi
} from "../../api/index"
const indexApi = new IndexApi()
Page({
  data: {
    userInfo: {},
    userType: 1,
    state: [{
      name: "全部",
      id: 0
    }, {
      name: "入驻厂家",
      id: 1
    }, {
      name: "入驻商家",
      id: 2
    }, {
      name: "入网厂家",
      id: 3
    }, {
      name: "入网商家",
      id: 4
    }
  ],
    status: false,
    statusName: "全部",
    type: 0,
    shopTown: "",
    count: 0,
    cityName: '',
    merchantList: [],
    pickerIndex: 0,
    sleectValue: "",
    pickerList: [],
    noticeList: []

  },
  more(){
    wx.navigateTo({
      url: '../notification/notification',
    })
  },
  getNoticeList(){
    indexApi.getNoticeList().then(res=>{
     if(res.code==200){
       this.setData({
        noticeList:res.data
       })
     }
    })
  },
  bindPickerChange(e) {
    let index = Number(e.detail.value)
    let sleectValue = index == 0 ? this.data.cityName : this.data.pickerList[index].townName
    this.setData({
      sleectValue,
      pickerIndex: e.detail.value,
      shopTown: sleectValue,
    }, () => {
      this.getHomeList()
    })
  },
  getHomeList() {
    let type = this.data.type
    let shopTown = this.data.shopTown == this.data.cityName ? "" : this.data.shopTown
    indexApi.getHomeList({
      type,
      shopTown
    }).then(res => {
      if (res.code == 200) {
        if (res.data.addressTown && res.data.addressTown.length > 0) {
          
          res.data.addressTown.unshift({
            townName: "全部"
          })
        }
        this.setData({
          cityName: res.data.cityName,
          count: res.data.count,
          merchantList: res.data.infoLocalVos,
          pickerList: res.data.addressTown
        })
      }
    })
  },
  change() {
    this.setData({
      status: !this.data.status
    })
  },
  checkeds(e) {
    let state = this.data.state;
    let index = e.currentTarget.dataset.index;
    let name = this.data.statusName;
    let type = e.currentTarget.dataset.id;
    
    state.forEach((v, i) => i === index ? v.checkeds = true : v.checkeds = false);
    state.forEach(item => {
      if (item.checkeds == true) {
        name = item.name
      }
    })
    this.setData({
      state,
      statusName: name,
      status: !this.data.status,
      type: type
    }, () => {
      this.getHomeList()
    })
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onLoad() {
    this.getNoticeList()
    this.getHomeList()
  },

})