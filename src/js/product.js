import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// create a link to needed json file
const category = getParams("category");
const dataSource = new ProductData(category);

// get product Id from url to show details we need
const productId = getParams("product");

// create product page
const product = new ProductDetails(productId, dataSource);
product.init();
