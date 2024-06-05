function reload() {
  let names = {
    basic: "Básico",
    normal: "Normal",
    advanced: "Avanzado"
  }
  let prices = {
    basic: 5000,
    normal: 10000,
    advanced: 15000
  }
  let cart = CartManager.getData();

  let html_cart = "";
  for (let type of ["basic", "normal", "advanced"]) {
    if (cart[type]) {
      let name = names[type]
      html_cart += `<li class="list-group-item d-flex justify-content-between lh-sm">
      <div>
        <h6 class="my-0 btnrem-${type}">Casatainer · ${name} <small>x${cart[type]}</small></h6>
        <small class="text-body-secondary btnrem-${type}">${prices[type].toLocaleString("es-es")} €</small>
      </div>
      <span class="text-body-secondary">${(prices[type] * cart[type]).toLocaleString("es-es")} €</span>
    </li>`
    }
  }
  let reduction = 0;
  let total_nopromo = (prices.basic * cart["basic"] + prices.normal * cart["normal"] + prices.advanced * cart["advanced"]);
  let params = new URLSearchParams(window.location.search);
  let discount = 0;
  let promo = params.get("promocode");

  if (promo) {
    if (promo === "helloworld") {
      discount = 20;
    }
    if (promo === "hacker") {
      discount = 100;
    }
  }

  reduction = total_nopromo * (discount / 100)

  if (discount > 0) {
    html_cart += `<li class="list-group-item d-flex justify-content-between bg-body-tertiary">
    <div class="text-success">
      <h6 class="my-0">Código promocional</h6>
      <small>${promo} · ${discount}%</small>
    </div>
    <span class="text-success">−${reduction.toLocaleString("es-es")} €</span>
  </li>`
  }

  let total = total_nopromo - reduction;

  html_cart += `
  <li class="list-group-item d-flex justify-content-between">
    <span>Total (EUR)</span>
    <strong>${total.toLocaleString("es-es")} €</strong>
  </li>`

  document.querySelector("#count-cart").innerHTML = cart["basic"] + cart["normal"] + cart["advanced"]

  document.querySelector("#scart").innerHTML = html_cart;
  for (let type of ["basic", "normal", "advanced"]) {
    document.querySelectorAll(".btnrem-" + type).forEach(e => {
      e.addEventListener("click", ev => {
        ev.preventDefault();
        CartManager.addCartItem(type, -1);
        reload();
      })
    })
  }
}

(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  });


  reload();
  document.querySelector("#btn-redeem").addEventListener("click", e => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("promocode", document.querySelector("#redeem-code").value);
    window.location.replace(window.location.origin + window.location.pathname + "?" + params.toString());
  })
  


})()