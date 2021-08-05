// pages/components/address/address.js
import {
  BusinessApi
} from "../../../api/business"
const businessApi = new BusinessApi()
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    cityCode: {
      type: String,
      value: "",
      observer: 'cityChange'
    },
    detailsStreetList: {
      type: Array,
      value: [],
      // observer: 'detailsStreetListChange'
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    flag: false,
    ellipsis: false,
    selectList: [],
    selectElementList:[],
    list:[],
    commitList:[]
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      // this.getProvincesCitiesTown()
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
    ready() {
      // this.getPickerArray()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    detailsStreetListChange(newVal, oldVal){
      // console.log(newVal)
     
      // if(newVal && this.data.cityCode){
      //   businessApi.getProvincesCitiesTown(this.data.cityCode).then(res=>{
      //     if(res.code==200){
      //       let array = res.data
      //       for (let index = 0; index < array.length; index++) {
      //         const element = array[index];
      //         for (let j = 0;  j < newVal.length;  j++) {
      //           const value = newVal[j];
      //           if(element.districtCode==value.districtCode){
      //            console.log(array[index])
      //             for (let k = 0; k <  array[index].townList.length; k++) {
      //               const townValue =  array[index].townList[k];
      //               console.log(townValue.townCode)
      //               console.log(townValue.townCode == value.townCode)
      //               if(townValue.townCode == value.townCode){
                      
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //   })
      // }
    },
    cityChange(newVal, oldVal) {
      this.getProvincesCitiesTown(newVal)
    },
    getProvincesCitiesTown(id) {
      businessApi.getProvincesCitiesTown(id).then(res => {
        if (res.code == 200) {
          let arr = []
          res.data.forEach(v => {
            arr.push({
              open: false,
              check: []
            })
          })
          
          this.setData({
            list: res.data,
            selectList: arr
          })
        }
      })
    },
    hideRess() {
      this.setData({
        flag: !this.data.flag
      })
    },
    showRess() {
      this.setData({
        flag: !this.data.flag
      })
    },
    selectStreet(event) {
      let index = event.currentTarget.dataset.index
      let upIndex = event.currentTarget.dataset.upindex
      let townName = event.currentTarget.dataset.townname
      let townCode = event.currentTarget.dataset.towncode
      let key = 'selectList[' + upIndex + '].check[' + index + ']'
      let flag = Boolean(this.data.selectList[upIndex].check[index])
      let selectElementList = this.data.selectElementList
      if (!flag) {
        //選中 當前點擊項的街道
        selectElementList.push({
          townName,
          townCode
        })
        this.setData({
          selectElementList
        })
       
      } else {
        //取消選中 刪除當前點擊項的街道
        let tapIndex
        selectElementList.forEach((v,i)=>{
          if(v.townCode == townCode){
            tapIndex = i 
          }
        })
        selectElementList.splice(tapIndex,1)
        this.setData({
          selectElementList
        })
      }
     
      this.setData({
        [key]: !flag
      })
     
    },
    elliPsis(event) {
      
      let index = event.currentTarget.dataset.index
      let key = 'selectList[' + index + '].open'
      let flag = !this.data.selectList[index].open
      this.setData({
        [key]: flag
      })
     
    },
    onCancel() {
      if(this.data.commitList.length>0){
        this.setData({
          selectList: JSON.parse(JSON.stringify(this.data.commitList))
        })
      }else{
        let arr = []
        this.data.selectList.forEach(v => {
          arr.push({
            open: false,
            check: []
          })
        })
        //清除选中状态
        this.setData({
          selectList: arr
        })
  
      }
    
      this.hideRess()
      this.triggerEvent("onCancel");
    },
    onConfirm() {
      this.setData({
       commitList:JSON.parse(JSON.stringify(this.data.selectList))
      })
      this.hideRess()
      this.triggerEvent("success",this.data.selectElementList);
    }
  }
})