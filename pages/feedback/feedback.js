  Page({
    data:{
      max:500,
    },
    getValueLength:function(e){
      let value=e.detail.value;
      let len=parseInt(value.length);
      if(len>this.data.max) return;
      this.setData({
        currentWordNumber:len
      })

    }
  })