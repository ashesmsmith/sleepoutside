const baseURL = import.meta.env.VITE_SERVER_URL
// Error when changed to below URL
// const baseURL = 'http://wdd330-backend.onrender.com/checkout';

async function convertToJson(res) {
  const data = await res.json();

  if (res.ok) {
    return data;
  } 
  else {
    throw {name: "servicesError", message: data};
  }
}

// create link to json file
export default class ExternalServices {
  // assign a category of products to get the path to correct json file
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }

  // create list of products from json file
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${this.category}`);
    const data = await convertToJson(response);
    return data.Result;
    // return fetch(this.path)
    //   .then(convertToJson)
    //   .then((data) => data); // function(data) {...code to update data... return data; }
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
    // const products = await this.getData();
    // return products.find((item) => item.Id === id); //function(item) { return item.Id === id; }
  }

  async checkout(order) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }

    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}
