import WeCropper from '../we-cropper/we-cropper.js'
import {config} from "../../config"
import {UserApi} from "../../api/user"
const userApi = new UserApi()
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      targetId: 'targetCropper',
      pixelRatio: device.pixelRatio,
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      },
      boundStyle: {
        color: '#04b00f',
        mask: 'rgba(0,0,0,0.8)',
        lineWidth: 1
      }
    }
  },
  touchStart (e) {
    this.cropper.touchStart(e)
  },
  touchMove (e) {
    this.cropper.touchMove(e)
  },
  touchEnd (e) {
    this.cropper.touchEnd(e)
  },
  getAgentUserInfo(){
    userApi.getAgentUserInfo().then(res=>{
      if(res.code==200){
        wx.setStorageSync('userInfo', res.data)
        wx.navigateBack({
          delta: 1
        });
      }
    })
  },
  getCropperImage () {
    let that = this
    this.cropper.getCropperImage( (path, err)=> {
      
      if (err) {
        wx.showModal({
          title: '温馨提示',
          content: err.message
        })
      } else {
        wx.uploadFile({
          filePath: path,
          name: 'file',
          url: config.baseUrl + '/shanghutong-system/oss/uploadFileList',
          header:{
           'Content-Type':"multipart/form-data",
           'Authorization':wx.getStorageSync('token')
          //  'token':
          },
          success(res){

            let data =  JSON.parse(res.data)
            if(data.code==200){
              let imgUrl = data.data.url
              userApi.editUserInfo({
                avatar:imgUrl
              }).then(res=>{
                if(res.code==200){
                  wx.showToast({
                    title: '头像修改成功!',
                  })
                  that.getAgentUserInfo()
                }else{
                  wx.showToast({
                    icon:"none",
                    title: '头像修改失败!',
                  })
                }
              })
              
            }else{
              wx.showToast({
                icon:"none",
                title: '图片上传失败!',
              })
            }
          }
        })
        
      }
    })
  },
  uploadTap () {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.cropper.pushOrign(src)
      }
    })
  },
  onLoad (option) {
    const { cropperOpt } = this.data

    cropperOpt.boundStyle.color = '#04b00f'

    this.setData({ cropperOpt })

    if (option.src) {
      cropperOpt.src = option.src
      this.cropper = new WeCropper(cropperOpt)
        .on('ready', (ctx) => {
          console.log(`wecropper is ready for work!`)
        })
        .on('beforeImageLoad', (ctx) => {
          console.log(`before picture loaded, i can do something`)
          console.log(`current canvas context:`, ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          console.log(`picture loaded`)
          console.log(`current canvas context:`, ctx)
          wx.hideToast()
        })
        .on('beforeDraw', (ctx, instance) => {
          console.log(`before canvas draw,i can do something`)
          console.log(`current canvas context:`, ctx)
        })
    }
  }
})
