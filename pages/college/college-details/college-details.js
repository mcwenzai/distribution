// pages/college/college-details/college-details.js
import {CollegeApi} from "../../../api/college"
const collegeApi = new CollegeApi()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        navType:1,
        title:"",
        imageTextList:[],
        videoList:[]
    },
    toImageDetails(e){
        wx.navigateTo({
            url: '../college-image-text-details/college-image-text-details?id=' +  e.currentTarget.dataset.id ,
          })
    },
    toVideoDetails(e){
        wx.navigateTo({
          url: './../college-video-details/college-video-details?id=' +  e.currentTarget.dataset.id ,
        })
    },
    checkNav(e){
        let type = e.currentTarget.dataset.type
       this.setData({
             navType:type
       })
    },
    businessSchoolQueryAll(videoType){
        let obj = {
            type:4,
            videoType,
            categoryName:this.data.title.toString()
        }
        collegeApi.businessSchoolQueryAll(obj).then(res=>{
            if(res.code==200){
                console.log(res)
                if(videoType==1){
                    this.setData({
                        videoList:res.data
                    })
                }else{
                    this.setData({
                        imageTextList:res.data
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let title = options.title
        wx.setNavigationBarTitle({
          title: title,
        })
        this.setData({
            title
        },()=>{
            this.businessSchoolQueryAll(1)
            this.businessSchoolQueryAll(2)
        })
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