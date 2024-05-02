import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { updateCartCounter } from "./cart";

function productDetailsTemplate(product) {
    return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}"/>
        <p class="product-card__price">${product.FinalPrice}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">${product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
    </section>`
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init(){
        // get data on the product
        this.product = await this.dataSource.findProductById(this.productId);
        // add product details under main html element
        this.renderProductDetails("main");

        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart() {
        let cart = getLocalStorage("so-cart");
        if (!Array.isArray(cart)) cart = [];
      
        let existingProduct = cart.find((item) => item.id === this.product.Id);
      
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.push({ id: this.product.Id, quantity: 1, ...this.product });
        }
      
        updateCartCounter(cart);
      
        setLocalStorage("so-cart", cart);
    }

    renderProductDetails(selector) {
        // use specific element i.e. main or section
        const element = document.querySelector(selector);
        // insert product details formated with template after selected element
        element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
    }
}