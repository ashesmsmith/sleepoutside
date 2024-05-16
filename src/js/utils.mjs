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

export function renderWithTemplate(template, parent, data, callback) {
  parent.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const html = await response.text();
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.innerHTML;
}

export async function loadHeaderFooter() {
  const headerTemplateElement = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplateElement = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  if (headerElement && footerTemplateElement && footerElement && headerTemplateElement) {
    renderWithTemplate(headerTemplateElement, headerElement);
    renderWithTemplate(footerTemplateElement, footerElement);
  } else {
    console.error("Some elements or templates are not loaded correctly");
  }
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert-messages");
  alert.innerHTML = `<p>${message}</p><span id="close-alert">X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });

  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}