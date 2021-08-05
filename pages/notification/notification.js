// pages/notification/notification.js
import {IndexApi} from "../../api/index"
const indexApi = new IndexApi()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        noticeList:[]
    },
    details(e){
        let id = e.currentTarget.dataset.id
       wx.navigateTo({
         url: './notification-details/notification-details?id='+ id,
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getNoticeList()
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