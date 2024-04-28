import { updateCartCounter } from "./cart";
import ProductData from "./utils.mjs";
import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductListing("tents", dataSource, element);

listing.init();
updateCartCounter();
