// pages/earnings/historicalEarnings/historicalEarnings.js
import { EarningsApi } from "../../../api/earnings"
const earningsApi =  new EarningsApi()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime:"",
    endTime:"",
    returnAmount:"",//退款收益
    totalAmount:"",//收益总额
    incomeAmount:"",//净利收益
    list:[],
    isSearch:false
  },
  search(){
    if(!this.data.startTime){
      wx.showToast({
        icon:"none",
        title: '请选择开始日期!!',
      })
      return
    }
    if(!this.data.endTime){
      wx.showToast({
        icon:"none",
        title: '请选择结束日期!!',
      })
      return
    }
    this.getFundDetailByDate()
    
  },
  changeStartTime(e){
    let startTime = e.detail.value
    this.setData({
      startTime
    })
  },
  changeEndTime(e){
    let endTime = e.detail.value
    this.setData({
      endTime
    })
  },
  getFundDetailByDate(){
    let startTime = this.data.startTime
    let endTime = this.data.endTime
    earningsApi.getFundDetailByDate({
      startTime,
      endTime
    }).then(res=>{
      if(res.code==200){
        let data = res.data.list
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          for (let j = 0; j < element.fundDetailVoList.length; j++) {
            const value = element.fundDetailVoList[j];
            value.createTime = value.createTime.split(' ')[value.createTime.split(' ').length - 1]
          }
        }
        this.setData({
          returnAmount:res.data.returnAmount,//退款收益
          totalAmount:res.data.totalAmount,//收益总额
          incomeAmount:res.data.incomeAmount,
          list:data,
          isSearch:true
        })
      }else{
        wx.showToast({
          icon:"none",
          title: '查询失败!',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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