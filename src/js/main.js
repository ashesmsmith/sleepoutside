import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { updateCartCounter } from "./cart";

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

showProducts();
updateCartCounter();
