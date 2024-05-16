import { setLocalStorage, getLocalStorage, alertMessage } from "./utils.mjs";
import { updateCartCounter } from "./ShoppingCart.mjs";

function productDetailsTemplate(product) {
    const hasDiscount = product.SuggestedRetailPrice > product.FinalPrice;
    const discountAmount = hasDiscount ? product.SuggestedRetailPrice - product.FinalPrice : 0;
    const discountPercentage = hasDiscount ? Math.round((discountAmount / product.SuggestedRetailPrice) * 100) : 0;

    return `<section class="product-detail">
        <a href="/product-listing/index.html?category=${product.Category}" id="breadcrumbs">${product.Category}</a>
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <div class="image-container">
            <img class="divider" src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}"/>
            ${hasDiscount ? `<span class="discount-flag">Discounted ${discountPercentage}%</span>` : ""}
        </div>
        <p class="product-card_price">
        <strong>$${product.FinalPrice}</strong>
        ${hasDiscount ? ` <span class="discount-pill">${discountPercentage}% off</span> <span class="original-price">was $${product.SuggestedRetailPrice.toFixed(2)}</span>` : ""}
        </p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">${product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
    </section>`;
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

        alertMessage(`${this.product.NameWithoutBrand} was successfully added to the cart.`);
    }

    renderProductDetails(selector) {
        // use specific element i.e. main or section
        const element = document.querySelector(selector);
        // insert product details formatted with template after selected element
        element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
    }
}
