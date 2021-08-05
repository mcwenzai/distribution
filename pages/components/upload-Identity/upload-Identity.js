// pages/components/upload-Identity/upload-Identity.js
import { config } from '../../../config';
import {UserApi} from '../../../api/user'
const userApi = new UserApi()
var app=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    Identity:[
      {
        name:"头像面",
        noodles:"上传您的身份证头像面",
        imageUrl:"/image/touxiangmian.png"
      },
      {
        name:"国徽面",
        noodles:"上传您的身份证国徽面",
        imageUrl:"/image/guohuimian.png"
      },
      // {
      //   name:"手持身份证",
      //   noodles:"上传您的手持身份证头像面",
      //   imageUrl:"/image/shouchi.png"
      // }
    ],
    Role:[
      {
        id:1,
        label:'市级代理'
      },
      {
        id:2,
        label:'商圈代理'
      },
      {
        id:3,
        label:'合伙人'
      }
    ],
    frontIdCardImage:"",
    behindIdCardImage:"",
    handIdCardImage:"",
    checked:true,
    dentity:'',
    isShowSelect:false,
    areaStr:"",
    name:"",
    phone:"",
    bank:"",
    maxStep:2,
    dentityId:"",
    selectbusinessArea:{},
    townList:[],
    isShowBankSelect:false,
    bankName:""
  },
  lifetimes:{
    attached(){
      var id = getApp().requestDetailid;
      if(id==3){
        this.setData({
          maxStep:3,
        })
      }
      this.setData({
        dentityId:getApp().requestDetailid
      })
      var role=this.data.Role;
      role.forEach(item=>{
        if(id==item.id){
          this.setData({
            dentity:item.label
          })
        }
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //银行开户银行相关 start
    //开户银行选择成功
    showBankSelect(){
      this.setData({
        isShowBankSelect:true
      })
    },
    selectBankEnd(e){
      let bankName = e.detail
      this.setData({
        bankName,
      })
    },
    //银行开户银行相关 end
    submit(){
      if(!this.data.checked){
        return
      }
      let phone = this.data.phone
      let name = this.data.name
      let bank = this.data.bank
      let  frontIdCardImage = this.data.frontIdCardImage
      let  behindIdCardImage = this.data.behindIdCardImage
      let  handIdCardImage = this.data.handIdCardImage
      // if(!frontIdCardImage){
      //   wx.showToast({
      //     title: '请上传身份证头像面!',
      //   })
      //   return
      // }
      // if(!behindIdCardImage){
      //   wx.showToast({
      //     title: '请上传身份证国徽面!',
      //   })
      //   return
      // }
      // if(!handIdCardImage){
      //   wx.showToast({
      //     title: '请上传手持身份证照!',
      //   })
      //   return
      // }
      if(!name){
        wx.showToast({
          icon:"none",
          title: '请输入真实姓名!',
        })
        return
      }
      console.log(bank)
      if(!bank){
        wx.showToast({
          icon:"none",
          title: '请输入银行卡号!',
        })
        return
      }
      var reg1 = /^(\d{16}|\d{19})$/
      if(!reg1.test(bank)){
        wx.showToast({
          icon:"none",
          title: '请输入正确的银行卡号!',
        })
        return
      }
      if(!this.data.bankName){
        wx.showToast({
          icon:"none",
          title: '请选择开户银行!',
        })
        return
      }
      let reg = /^1[0-9]{10}$/
      if(!phone){
        wx.showToast({
          icon:"none",
          title: '请输入联系电话!',
        })
        return
      }
      if(!reg.test(phone)){
        wx.showToast({
          icon:"none",
          title: '请输入正确的手机号码!',
        })
        return
      }
      if(this.data.dentityId==3){
        if(!this.data.selectbusinessArea.code){
          wx.showToast({
            icon:"none",
            title: '请选择城市商圈!',
          })
          return
        }else{

        }
      }else{
        if(!this.data.provinceCodeId || !this.data.cityCodeId ){
          wx.showToast({
            icon:"none",
            title: '请选择代理的城市!',
          })
          return
        }
      }
      let userInfo = wx.getStorageSync('userInfo')
      let requestData = {
        frontIdCardImage,
        behindIdCardImage,
        accountBankNo:bank,
        type:this.data.dentityId,
        agentUserId:userInfo.id,
        phone,
        userName:name,
        provinceCodeId:this.data.provinceCodeId,
        cityCodeId:this.data.cityCodeId,
        addressTownId:this.data.selectbusinessArea ? this.data.selectbusinessArea.code : "",
        openAccountBank:this.data.bankName
      }
     
      userApi.authentication(requestData).then(res=>{
        if(res.code==200){
          wx.showToast({
            title: '资料提交成功!',
          })
          setTimeout(()=>{
            wx.switchTab({
              url: '/pages/achievement/achievement',
            })
          },1000)
        }else{
         
          wx.showToast({
            icon:'none',
            title: res.message
          })
        }
      }).catch(()=>{
        wx.showToast({
          icon:"none",
          title: '身份信息提交失败!',
        })
      })
    },
    nameInput(e){
      this.setData({
        name: e.detail.value
      })
    },
    phoneInput(e){
      this.setData({
        phone: e.detail.value
      })
    },
    bankInput(e){
     
      this.setData({
        bank: e.detail.value
      })
    },
    selectEnd(value){
      let data = value.detail
      let str = data.selectbusinessArea ? "·"+ data.selectbusinessArea.name : ""
      let areaStr = data.provinceName + "·" + data.selectCity.name + str
      console.log({
        areaStr,
        provinceCodeId:data.selectProvinceId,
        cityCodeId:data.selectCity.code,
        selectbusinessArea:data.selectbusinessArea,
        townList: data.selectbusinessArea ?  data.selectbusinessArea.townName ? data.selectbusinessArea.townName.split(",") : [] : ''
      })
      this.setData({
        areaStr,
        provinceCodeId:data.selectProvinceId,
        cityCodeId:data.selectCity.code,
        selectbusinessArea:data.selectbusinessArea,
        townList: data.selectbusinessArea ?  data.selectbusinessArea.townName ? data.selectbusinessArea.townName.split(",") : [] :''
      })
    },
    showAreaSelect(){
      this.setData({
        isShowSelect:true
      })
    },
    updateIdCard(event){
     let tapIndex = event.currentTarget.dataset.index
     let that = this
     wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        console.log(tempFilePaths)
        var imgKey = 'Identity['+tapIndex+'].imageUrl';
        let updateImgKey = tapIndex == 0 ? 'frontIdCardImage' : tapIndex == 1 ? "behindIdCardImage" : "handIdCardImage"
        wx.uploadFile({
          filePath: tempFilePaths,
          name: 'file',
          url: config.baseUrl + '/shanghutong-system/oss/uploadFileList',
          header:{
           'Content-Type':"multipart/form-data",
           'Authorization':wx.getStorageSync('token')
          //  'token':
          },
          success(res){
            let data =  JSON.parse(res.data)
            console.log(data)
            if(data.code==200){
              let imgUrl = data.data.url
              that.setData({
                [imgKey]:imgUrl,
                [updateImgKey]:imgUrl
              })
              wx.showToast({
                title: '图片上传成功!',
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
    Checkedgoods(event){
      this.setData({
        checked:!event.currentTarget.dataset.checked
      })
    },
  }
})
