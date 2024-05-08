import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

// get category value from URL
const category = getParams("category");

// create an instance of ProductData
const dataSource = new ProductData();

// ul on index.html with class of product-list
const element = document.querySelector(".product-list");

// send category, json link and html element to ProductListing
const listing = new ProductListing(category, dataSource, element);

// create and display list of products on page
listing.init();
