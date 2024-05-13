// Purpose: Create a list  of product cards in HTML form array
// small product card for home page or pages with multiple products listed
import ProductData from "./ProductData.mjs";
import { renderListWithTemplate, getLocalStorage, setLocalStorage } from "./utils.mjs";

function productCardTemplate(product) {
  const hasDiscount = product.SuggestedRetailPrice > product.FinalPrice;
  const discountAmount = hasDiscount ? product.SuggestedRetailPrice - product.FinalPrice : 0;
  const discountPercentage = hasDiscount ? Math.round((discountAmount / product.SuggestedRetailPrice) * 100) : 0;

  return `<li class="product-card">
        <a href="/product_pages/index.html?product=${product.Id}&category=${product.Category}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
            <h3 class="card_brand">${product.Brand.Name}</h3>
            <h2 class="card_name">${product.NameWithoutBrand}</h2>
            <p class="product-card_price">
                <strong>$${product.FinalPrice} - </strong> 
                ${hasDiscount ? ` <span style="color: green;"><strong>after ${discountPercentage}% off</strong></span>` : ""}
            </p>
        </a>
    </li>`;
}

export default class ProductListing {
  constructor(
    category, // options will be tents, sleeping-bags and backpacks
    listElement // HTML list element
  ) {
    this.category = category;
    this.listElement = listElement;
    this.sortingLSKey = "sorting";
  }

  async init() {
    // create an instance of ProductData (json file link)
    const dataSource = new ProductData(this.category);
    // getData() creates the list of products from that source
    const list = await dataSource.getData(this.category);

    // default sorting
    list.sort((a, b) => a.NameWithoutBrand > b.NameWithoutBrand);
    setLocalStorage(this.sortingLSKey, null);

    // use list data to fill in productCardTemplate
    this.renderList(list);
    this.renderSorting(list);

    // breadcrumbs
    document.querySelector("#breadcrumbs").innerHTML = `${this.category} &#10132; (${list.length} items)`;
  }

  renderList(list) {
    // send template, html element, and list of products
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  renderSorting(fetchedList) {
    const brands = fetchedList.reduce((acc, product) => {
      const brand = product.Brand.Name;
      if (!acc.includes(brand)) acc.push(brand);
      return acc;
    }, []);

    const topLine = document.querySelector(".top-line");
    topLine.innerHTML += `
      <span>Order by: </span>
      <select id="orderBy" name="orderBy">
        <option value="name">name</option>
        <option value="price">price</option>
      </select>
      <label>
        <input id="allBrands" type="checkbox" name="allBrands" value="all-brands" checked/>
        <span>All Brands</span>
      </label>
      ${brands.map(brand => `
      <label>
        <input type="checkbox" name="brands" value="${brand}"/>
        <span>${brand}</span>
      </label>
      `).join("")}
    `;

    const orderBy = document.querySelector("#orderBy");
    const brandCheckboxes = document.querySelectorAll("input[name='brands']");

    orderBy.addEventListener("change", (e) => {
      e.preventDefault();
      const sortingData = getLocalStorage(this.sortingLSKey) || fetchedList;

      const sortedList = orderProducts(sortingData, orderBy.value);
      this.updateRender(sortedList);
    });

    brandCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", (e) => {
        e.preventDefault();
        const allBrands = document.querySelector("#allBrands");
        if (allBrands.checked && e.target.checked) allBrands.checked = false;

        const selectedBrands = Array.from(brandCheckboxes).reduce((acc, current) => {
          if (current.checked) acc.push(current.value);
          return acc;
        }, []);

        let sortedList;

        if (selectedBrands.length > 0) {
          sortedList = fetchedList.filter(product => selectedBrands.includes(product.Brand.Name));
          sortedList = orderProducts(sortedList, orderBy.value);
        } else { // all brands
          allBrands.checked = true;
          sortedList = orderProducts(fetchedList, orderBy.value);
        }

        this.updateRender(sortedList);
      });
    });

    function orderProducts(sortingData, orderByValue = "name") {
      if (orderByValue === "price") {
        sortingData.sort((a, b) => a.FinalPrice > b.FinalPrice);
      } else if (orderByValue === "name") {
        sortingData.sort((a, b) => a.NameWithoutBrand > b.NameWithoutBrand);
      }

      return sortingData;
    }
  }

  updateRender(sortedList) {
    this.listElement.innerHTML = "";
    this.renderList(sortedList);
    setLocalStorage(this.sortingLSKey, sortedList);
  }
}
