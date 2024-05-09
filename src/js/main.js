import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { updateCartCounter } from "./ShoppingCart.mjs";
import Alert from "./Alert";

const homePageBody = document.querySelector(".home-page");

function showProducts() {
  if (!homePageBody) return;
  // send category of "tents" to ProductData class to create access to file
  const dataSource = new ProductData("tents");

  // ul on index.html with class of product-list
  const element = homePageBody.querySelector(".product-list");

  // send category, json link and html element to ProductListing
  const listing = new ProductListing("tents", dataSource, element);

  // create and display list of products on page
  listing.init();
}

function showAlerts() {
  // only on home page
  if (!homePageBody) return;

  const alert = new Alert("/json/alerts.json");
  alert.show(homePageBody);
}

document.addEventListener("DOMContentLoaded", function () {
  loadHeaderFooter();
});

showProducts();
updateCartCounter();
showAlerts();
