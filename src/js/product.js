import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { updateCartCounter } from "./cart";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");
  if (!Array.isArray(cart)) cart = [];

  let existingProduct = cart.find((item) => item.id === product.Id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ id: product.Id, quantity: 1, ...product });
  }

  updateCartCounter(cart);

  setLocalStorage("so-cart", cart);
}

// Add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
