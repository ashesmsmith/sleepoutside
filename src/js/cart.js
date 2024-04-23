import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const cartKey = "so-cart";

function renderCartContents() {
  const productList = document.querySelector(".product-list");
  if (!productList) return;
  const cartItems = getLocalStorage(cartKey) || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.qty}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export function addProductToCart(product) {
  const cart = getLocalStorage(cartKey);

  let dataToSave;

  if (!cart) {
    // if the cart is empty, add new product
    dataToSave = [{ ...product, qty: 1 }];
  } else {
    let productExists = false;
    for (const p of cart) {
      if (p.Id === product.Id) {
        // if the product is in cart already just increase his quantity
        p.qty++;
        productExists = true;
        break;
      }
    }

    if (!productExists) {
      // add new product to existing cart
      dataToSave = [...cart, { ...product, qty: 1 }]
    } else dataToSave = cart;
  }

  setLocalStorage(cartKey, dataToSave);
}

renderCartContents();
