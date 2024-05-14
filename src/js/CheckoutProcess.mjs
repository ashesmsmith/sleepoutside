import { setLocalStorage, getLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// convert data from the form on checkout index page to json
function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

export default class CheckoutProcess {
    constructor (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        // get items from cart in local storage
        this.list = getLocalStorage(this.key);
        this.calculateSubtotal();
    }

    calculateSubtotal() {
        const summaryElement = document.querySelector("#subtotal");
    
        // create new list/ item price * quantity
        const amounts = this.list.map((item) => item.FinalPrice * item.quantity);
        // add the totals from the new list together and assign value to this.itemTotal
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        // display subtotal
        summaryElement.textContent = `Subtotal: $${this.itemTotal.toFixed(2)}`;
    }

    calculateOrderTotal() {
        // list of each items quantity in the cart
        const quantity = this.list.map((item) => item.quantity);
        // calculate the total quantity of items in the cart
        const newQty = quantity.reduce((sum, item) => sum + item);
        // subtract one from the total quantity because the first item
        // ships for $10 and the others ship for additional $2
        const trueQty = newQty - 1;
        // calculate shipping and tax
        this.shipping = 10 + (trueQty * 2);
        this.tax = (this.itemTotal * .06);
        // Calculate final total with items, shipping and tax
        this.orderTotal = (this.itemTotal + this.shipping + this.tax);
        
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const shipping = document.querySelector("#shipping");
        const tax = document.querySelector("#tax");
        const orderTotal = document.querySelector("#orderTotal");

        shipping.textContent = `Shipping: $${this.shipping.toFixed(2)}`;
        tax.textContent = `Tax: $${this.tax.toFixed(2)}`;
        orderTotal.textContent = `Final Total: $${this.orderTotal.toFixed(2)}`;
    }

    async checkout(form) {
        // get form from checkout index page
        const formElement = document.forms["checkout"];

        // convert data from form to json
        const json = formDataToJSON(formElement);
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        
        console.log(json);

        try {
            const res = await services.checkout(json);
            console.log(res);
            // empty the cart on successful submit
            setLocalStorage("so-cart", []);
            // send user to success page
            location.assign("/checkout/success.html");
        } 
        // display error in console if there was one
        catch (err) { 
            // clear existing alerts
            removeAllAlerts();
            for (let message in err.message) {
                alertMessage(err.message[message]);
            }

            console.log(err);
        }
    }
}

function packageItems(items) {
    const simpleItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: item.quantity,
        };
    });

    return simpleItems;
}
