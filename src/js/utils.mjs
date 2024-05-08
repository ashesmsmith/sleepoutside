// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get product Id from url
export function getParams(param) {
  // url in search
  const queryString = window.location.search;
  // parse the params in url
  const urlParams = new URLSearchParams(queryString);
  // get the first param/product Id
  const product = urlParams.get(param);
  // return product Id/first param
  console.log(product);
  return product;
}

 // take template, parent html element, list of products
 // insert objects as HTML into the DOM
 // most often afterbegin is used and we don't want to clear out the existing contents so we set them as default values
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterBegin", clear = false) {
  // split data into key-value pairs for each product (map)
  // pass each product into template
  const htmlStrings = list.map(templateFn);
  // if clear is true, clear out contents of parent element
  if (clear) {
    parentElement.innerHTML = "";
  }
  // add each product card after the previous element
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}