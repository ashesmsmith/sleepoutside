import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCounter } from "./ShoppingCart.mjs";
import Alert from "./Alert";

const homePageBody = document.querySelector(".home-page");

function showAlerts() {
  // only on home page
  if (!homePageBody) return;

  const alert = new Alert("/json/alerts.json");
  alert.show(homePageBody);
}

document.addEventListener("DOMContentLoaded", function () {
  loadHeaderFooter();
});

updateCartCounter();
showAlerts();
