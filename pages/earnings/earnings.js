// pages/earnings/earnings.js
import {
  EarningsApi
} from "../../api/earnings"
const earningsApi = new EarningsApi()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsList: [{
        title: "本月收益",
        isActive: true,
      },
      {
        title: "累计收益",
        isActive: false,
      }
    ],

    histogramList: [],
    //本月总收益
    totalAmountMonth: 0,
    //本月收益明细集合,
    presentMonth: [],
    lastMonthAmount: 0,
    monthAmount: 0,
    todayAmount: 0,
    totalAmount: 0,
    weekAmount: 0,
    desCloseMonth:false,
    desCloseTotal:false,
    ruleListMonth:[
      {lineText:'本月收益是您当月与平台合作其间因厂商、商户销售货品（商品）、入驻服务费产生的相关收入，但不包括因交易、货品（商品）产生的补偿金以及退款（补偿金、退款在我的余额-未到账余额中可查看详情）'},
    ],
    ruleListTotal:[
      {lineText:'累计收益是您与平台合作其间因厂商、商户销售货品（商品）、入驻服务费产生的相关收入，但不包括因交易、货品（商品）产生的补偿金以及退款（补偿金、退款在我的余额-未到账余额中可查看详情'},
    ]
  },
  close(){
      this.setData({
        desCloseTotal:false,
        desCloseMonth:false
      })
  },
  show() {
    if (!this.data.tabsList[1].isActive) {
      this.setData({
        desCloseTotal:false,
        desCloseMonth:true
      })
    } else {
      this.setData({
        desCloseTotal:true,
        desCloseMonth:false
      })
    }
  },
  //点击选项卡
  selectTabs(event) {
    let index = event.currentTarget.dataset.index
    let tabsList = this.data.tabsList
    tabsList.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabsList
    })
  },
  //获取七日收益柱状图
  getFundDetailByWeek() {
    earningsApi.getFundDetailByWeek().then(res => {
      if (res.code == 200) {
        let histogramList = res.data ? res.data : []
        let arr = []
        histogramList.forEach((v, i) => {
          arr.push(v.arrivalAmount)
        })
        let max = Math.max.apply(null, arr)
        //柱状图最高高度不能超出240rpx
        if (max < 240) {
          histogramList.forEach((v, i) => {
            v.height = Math.abs(v.arrivalAmount)
            v.createTime = v.createTime.split('-').splice(v.createTime.split('-').length - 2, v.createTime.split('-').length).join('-')

          })
          this.setData({
            histogramList
          })
        } else {
          histogramList.forEach((v, i) => {
            v.height = Math.abs(v.arrivalAmount / max * 240)
            v.createTime = v.createTime.split('-').splice(v.createTime.split('-').length - 2, v.createTime.split('-').length).join('-')
          })
          this.setData({
            histogramList
          })
        }
      }
    })
  },
  //获取累计收益
  getFundDetailByDate() {
    earningsApi.getAllFundDetail().then(res => {
      if (res.code == 200) {
        this.setData({
          lastMonthAmount: res.data.lastMonthAmount,
          monthAmount: res.data.monthAmount,
          todayAmount: res.data.todayAmount,
          totalAmount: res.data.totalAmount,
          weekAmount: res.data.weekAmount
        })
      }
    })
  },
  //获取本月收益
  getMonthFundDetail() {
    earningsApi.getMonthFundDetail().then(res => {
      if (res.code == 200) {
        let data = res.data.list
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          for (let j = 0; j < element.fundDetailVoList.length; j++) {
            const value = element.fundDetailVoList[j];
            value.createTime = value.createTime.split(' ')[value.createTime.split(' ').length - 1]
          }
        }
        this.setData({
          presentMonth: res.data.list,
          totalAmountMonth: res.data.totalAmount
        })
      }
    })
  },
  gotoHistory() {
    wx.navigateTo({
      url: './historicalEarnings/historicalEarnings',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMonthFundDetail()
    this.getFundDetailByDate()
    this.getFundDetailByWeek()


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