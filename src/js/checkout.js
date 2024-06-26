import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", "checkout-summary");
checkout.init();

document
  .querySelector("#zip-code")
  .addEventListener("blur", checkout.calculateOrderTotal.bind(checkout));

document.querySelector("#final-checkout").addEventListener("click", (event) => {
  event.preventDefault();

  const form = document.forms[0];
  const checkStatus = form.checkValidity();
  form.reportValidity();

  if (checkStatus) {
    checkout.checkout();
  }
});
