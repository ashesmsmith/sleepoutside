import { getParams } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";

// get category value from URL
const category = getParams("category");

document.querySelector(".page-title").innerHTML += `${category}`;

// create an instance of ExternalServices
const dataSource = new ExternalServices(category);

// ul on index.html with class of product-list
const element = document.querySelector(".product-list");

// send category, json link and html element to ProductListing
const listing = new ProductListing(category, dataSource, element);

// create and display list of products on page
listing.init();
