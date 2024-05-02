import { updateCartCounter } from "./cart";
import Alert from "./Alert";

const homePageBody = document.querySelector(".home-page");

updateCartCounter();
showAlerts();

function showAlerts() {
  // only on home page
  if (!homePageBody) return;

  const alert = new Alert("../json/alerts.json");
  alert.show(homePageBody);
}
