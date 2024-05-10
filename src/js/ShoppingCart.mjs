import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const cartLSKey = "so-cart";

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
    <button class="cart-card_delete"><span data-id="${item.Id}">⨉</span></button>
    <p class="cart-card__quantity">Qty:
      <button class="decrease" data-id="${item.Id}">-</button>
      <span class="qty">${item.quantity}</span>
      <button class="increase" data-id="${item.Id}">+</button>
    </p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  
    return newItem;
  }

function renderCartContents() {
  const productList = document.querySelector(".cart-page .product-list");
  if (!productList) return;

  const cartItems = getLocalStorage(cartLSKey) || [];
  if (cartItems.length === 0) {
    productList.innerHTML = `<p class="empty-cart-message">There are currently no items in your cart</p>`;
    document.querySelector(".cart-total").style.display = "none";
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productList.innerHTML = htmlItems.join("");

    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total = total + cartItems[i].quantity * cartItems[i].FinalPrice;
    }

    document.querySelector(".cart-total").style.display = "block";
    document.querySelector(".cart-total").textContent =
      `Total: $${total.toFixed(2)}`;

    // Delete Button
    const deleteButtons = productList.querySelectorAll(
      ".cart-card_delete span",
    );
    deleteButtons.forEach((button) => {
      button.addEventListener("click", deleteFromCart);
    });

    // Quantity Buttons
    const decreaseQty = productList.querySelectorAll(".decrease");
    decreaseQty.forEach((button) => {
      button.addEventListener("click", minus);
    });

    const increaseQty = productList.querySelectorAll(".increase");
    increaseQty.forEach((button) => {
      button.addEventListener("click", plus);
    });
  }
}

function minus(event){
  // get the span element below the minus button
  let qtyElem = event.target.nextElementSibling;
  // get the qty value from the span element
  let qty = parseInt(qtyElem.innerHTML);
  // item id from the button clicked
  let itemId = event.target.dataset.id;
  // current cart in local storage
  let cart = getLocalStorage("so-cart");
  // separate product from cart
  let product = cart.find((item) => item.id === itemId)

  if (product.quantity > 1) {
    // update value on screen
    qty -= 1;
    qtyElem.innerHTML = qty; 

    // update value in local storage
    product.quantity -= 1;

    // update counter, local storage and price
    updateCartCounter(cart);
    setLocalStorage("so-cart", cart);
    renderCartContents();
  }  
}

function plus(event){
  // get the span element above the plus button
  let qtyElem = event.target.previousElementSibling;
  // get the qty value from the span element
  let qty = parseInt(qtyElem.innerHTML);
  // item id from the button clicked
  let itemId = event.target.dataset.id;
  // current cart in local storage
  let cart = getLocalStorage("so-cart");
  let product = cart.find((item) => item.id === itemId)

  if (product) {
    // update value on screen
    qty += 1;
    qtyElem.innerHTML = qty;

    // update value in local storage
    product.quantity += 1;

    // update counter, local storage and price
    updateCartCounter(cart);
    setLocalStorage("so-cart", cart);
    renderCartContents();
  } 
}

function deleteFromCart(event) {
  const itemId = event.target.dataset.id;

  if (!itemId) return;

  const cartItems = getLocalStorage(cartLSKey) || [];

  const updatedCart = cartItems.filter((item) => item.Id !== itemId);
  setLocalStorage(cartLSKey, updatedCart);

  renderCartContents();
  updateCartCounter(updatedCart);
}

export function updateCartCounter(cart = null) {
  const cartCounter = document.querySelector(".cart-counter");
  if (!cartCounter) return;

  const cartItems = cart || getLocalStorage(cartLSKey) || [];

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    cartCounter.innerHTML = 0;
    cartCounter.style.display = "none";
  } else {
    cartCounter.innerHTML = cartItems.reduce(
      (total, current) => total + current.quantity,
      0,
    );
    cartCounter.style.display = "block";
  }
}

renderCartContents();