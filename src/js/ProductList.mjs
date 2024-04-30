// Purpose: Create a list  of product cards in HTML form array
// small product card for home page or pages with multiple products listed
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h3 class="card_brand">${product.Brand.Name}</h3>
            <h2 class="card_name">${product.Name}</h2>
            <p class="product-card_price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}

export default class ProductListing {
    constructor(
        category, // options will be tents, sleeping-bags and backpacks
        dataSource, // json file link created in ProductData.mjs after instance in main.js
        listElement // HTML list element
        ) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        // dataSource is connected to ProductData.mjs
        // getData() creates the list of products from that source
        const list = await this.dataSource.getData();

        //remove extra products from list
        this.removeExtra(list);

        // use list data to fill in productCardTemplate
        this.renderList(list);
    }

    renderList(list) {
        // reusable way to accomplish same as below
        // send template, html element, and list of products
        renderListWithTemplate(productCardTemplate, this.listElement, list);

        // // split data into key-value pairs for each product (map)
        // // pass each product into template
        // const htmlStrings = list.map(productCardTemplate);
        // // add each product card after the previous element
        // this.listElement.insertAdjacentHTML("afterBegin", htmlStrings.join(''));
    }

    removeExtra(list) {
        const topProducts = ["880RR", "985RF", "985PR", "344YJ"]

        list.forEach((product) => {
            if(topProducts.includes(product.Id)) {
             // do nothing
            }
            else {
                list.pop(product);
            }
        })
    }
}
