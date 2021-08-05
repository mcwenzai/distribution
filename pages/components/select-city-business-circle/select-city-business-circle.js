import {AreaApi} from "../../../api/area"
const areaApi = new AreaApi()
Component({
  
/**
   * 组件的属性列表
   */
  properties: {
    isShowSelect:{
      type:Boolean,
      value:false
    },
    maxStep:{
      type:Number,
      value:2
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    step:1,
    identityType:0,
    provinceName:"",
    selectProvinceId:'',
    selectCity:{},
    cityName:"",
    cityIndex:0,
    businessName:"",
    selectList:[],
    provinceList:[],
    scrollTop:0
  },
  lifetimes:{
    attached(){
      this.getProvince()
      
     
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    close(){
      this.setData({
        step:1,
        provinceName:"请选择",
        selectList:this.data.provinceList,
        selectCity:{},
        cityName:"",
        selectProvinceId:"",
        cityList:[],
      })
      this.hideRess()
    },
    getProvince(){
      let arr = []
      areaApi.getProvince().then(res=>{
        if(res.code==200){
          res.data.forEach((v,i)=>{
            arr.push({
              id:v.id,
              name:v.provinceName,
              code:v.provinceCode
            })
          })
          this.setData({
            selectList:arr,
            provinceList:arr
          })
        }
      })
    },
    selectCity(){
      if(this.data.step<=2){
        return
      }else{
        this.setData({
          step:2,
          selectList:this.data.cityList,
          cityName:"请选择",
          selectCity:{},
          selectCity:{},
          scrollTop:0,
          selectbusinessArea:{}
        })
      }
    },
    
    selectProvincial(){
      if(this.data.step<=1){
        return
      }else{
        this.setData({
          step:1,
          provinceName:"请选择",
          selectList:this.data.provinceList,
          cityName:"",
          selectCity:{},
          selectbusinessArea:{},
          scrollTop:0
        })
      }
    },
    selectOption(event){
      let index =  event.currentTarget.dataset.index
      let id =  event.currentTarget.dataset.id
      let code =  event.currentTarget.dataset.code
      let step = this.data.step
      let areaList = this.data.areaList
      let arr = []
      switch (step) {
        //step 1 時 為選擇省會後
        //step 2 時 為選擇市後
        //step 3 時 為選擇商圈後
        case 1:
          areaApi.getCity({
            provinceCode:code
          }).then(res=>{
            if(res.code==200){
              res.data.forEach((v,i)=>{
                arr.push({
                  id:v.id,
                  name:v.cityName,
                  code:v.cityCode
                })
              })
              console.log(this.data.selectList[index])
              this.setData({
                selectList:arr,
                step:2,
                provinceName:this.data.selectList[index].name,
                selectProvinceId:this.data.selectList[index].code,
                scrollTop:0
              })
            }
          })
          break;
          case 2:
            //當用戶身份為市級代理與商圈代理市地區選擇為 省-市 2級聯動
            if(this.data.maxStep==2){
                let selectCity = this.data.selectList[index]
                console.log(selectCity)
                this.setData({
                  selectCity,
                  cityName:selectCity.name
                })
                this.triggerEvent("selectEnd",{
                  provinceName:this.data.provinceName,
                  selectProvinceId:this.data.selectProvinceId,
                  selectCity,
                });
                this.hideRess();
            }else{
            // //當用戶身份為市級代理與商圈代理市地區選擇為 省-市-商圈 3級聯動
                let selectCity = this.data.selectList[index]
                console.log(selectCity)
                this.setData({
                  cityList:this.data.selectList,
                  cityName:selectCity.name,
                  selectCity
                })
                areaApi.selectBusinessAreaNameList({
                  cityCode:selectCity.code
                }).then(res=>{
                  if(res.code==200){
                    res.data.forEach((v,i)=>{
                      arr.push({
                        id:v.id,
                        name:v.businessAreaName,
                        code:v.businessAreaCode,
                        townName:v.townName
                      })
                    })
                    this.setData({
                      selectList:arr,
                      step:3,
                      scrollTop:0
                    })
                  }
                })
            }
            break;
          case 3:
            console.log(this.data.selectList[index])
            let selectbusinessArea = this.data.selectList[index]
                this.setData({
                  selectbusinessArea,
                })
              
                let obj = {
                  provinceName:this.data.provinceName,
                  selectProvinceId:this.data.selectProvinceId,
                  selectCity:this.data.selectCity,
                  selectbusinessArea,
                }
              
                this.triggerEvent("selectEnd",obj);
                console.log(obj)
            this.hideRess()

            break;
        default:
          break;
      }
      
    },
    hideRess(){
      this.setData({
        isShowSelect:!this.data.isShowSelect
      })
    },
    
    showRess(){
      this.setData({
        isShowSelect:!this.data.isShowSelect
      })
    },
    
    onCancel() {
      this.hideRess()
      this.triggerEvent("error");
    },
    onConfirm(){
      this.hideRess()
      this.triggerEvent("error");
    }
  }
})
