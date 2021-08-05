Page({
  data:{
    checked:false
  },
  Confirmchenge(){
    var checked=this.data.checked;
    if(checked){
      checked=false
    }else{
      checked=true
    }
    this.setData({
      checked
    })
  }
})
