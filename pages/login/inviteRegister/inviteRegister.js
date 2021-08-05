// pages/login/inviteRegister/inviteRegister.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    name:""
  },
  next(){
    wx.navigateTo({
      url: '../register/register?phone=' + this.data.phone,
    })
  },
  goLogin(){
    wx.navigateTo({
      url: '../login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const opScene = options.scene;
    console.log(options)
    if(opScene){
      // 'scene=userName=蒋威&phone=17788993320'
        const scene =  decodeURIComponent(opScene);
        
        let obj={}
        // const scene = 'scene=?u=蒋威&phone=17788993320'
        let  arr =  scene.split('&')
        
       for (let index = 0; index < arr.length; index++) {
           const element = arr[index];
          obj[element.split('=')[0]] = element.split('=')[1]
       }
      
        this.setData({
          phone:obj.p,
          name:obj.n
        })
    }
   if(options.userName){
    this.setData({
      name:options.userName
    })
   }
   if(options.phone){
    this.setData({
      phone:options.phone
    })
   }
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