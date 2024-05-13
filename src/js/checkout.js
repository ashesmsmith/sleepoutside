import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", "checkout-summary");
checkout.init();

document.querySelector("#zip-code")
    .addEventListener("blur", checkout.calculateOrderTotal.bind(checkout));
