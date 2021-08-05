// pages/components/earnings-Details-List/earnings-Details-List.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDetails(event){
     let index =  event.currentTarget.dataset.index
  
    let list = this.data.list
    list[index].isHidden = !list[index].isHidden
    this.setData({
      list
    })
    }
  }
})
