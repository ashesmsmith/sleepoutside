import { getLocalStorage } from "./utils.mjs";

let total = 0;

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      `<p class="empty-cart-message">There are currently no items in your cart</p>`;
    document.querySelector(".cart-total").style.display = "none";
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    for (let i = 0; i < cartItems.length; i++) {
      total = total + cartItems[i].quantity * cartItems[i].FinalPrice;
    }

    document.querySelector(".cart-total").style.display = "block";
    document.querySelector(".cart-total").textContent = `Total: $${total}`;
  }
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
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
