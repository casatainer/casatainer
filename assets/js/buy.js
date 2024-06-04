(() => {
  'use strict'

  CartManager.getData();

  let btn_basic = document.querySelector("#btd-basic");
  let btn_normal = document.querySelector("#btd-normal");
  let btn_advanced = document.querySelector("#btd-advanced");

  btn_basic.addEventListener("click",e=>{
    CartManager.addCartItem("basic",1)
  });
  btn_normal.addEventListener("click",e=>{
    CartManager.addCartItem("normal",1)
  })
  btn_advanced.addEventListener("click",e=>{
    CartManager.addCartItem("advanced",1)
  })
})()
