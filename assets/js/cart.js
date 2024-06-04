const CartManager = {
    getData: function(){
      let data = window.localStorage.getItem("cart");
      if (data===null) return {
        basic:0,
        normal:0,
        advanced:0
      }
      return JSON.parse(data);
    },
  
    setData: function(data){
  
      let dataStr = JSON.stringify(data);
  
      window.localStorage.setItem("cart",dataStr);
    },
  
    addCartItem: function(item,amount) {
      if (!["basic","normal","advanced"].includes(item)) throw new Error("Invalid item");
      let data = this.getData();
      data[item]=data[item]+amount;
      this.setData(data)
    }
  };