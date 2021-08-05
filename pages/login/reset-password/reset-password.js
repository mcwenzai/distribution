// pages/setting/change-password/change-password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      ruleList:[
        {lineText:'1、请检查手机号输入是否正确，港澳台及海外手机号请填写国际区号，再填写手机号；'},
        {lineText:'2、如果安装了360卫士、安全管家、QQ管家等软件，请进入软件查询拦截记录，并将云集短信设为信任后重试；'},
        {lineText:'3、请您清除手机缓存后重新获取；'},
        {lineText:' 4、请确认您是否退订过。'}
      ]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  Viewrules(){
    this.rules.showRule()
  },
  onCancel(){
    this.rules.hidesRule()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.rules=this.selectComponent("#Rule")
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