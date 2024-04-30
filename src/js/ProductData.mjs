function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// create link to json file
export default class ProductData {
  // assign a category of products to get the path to correct json file
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  // create list of products from json file
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data); // function(data) {...code to update data... return data; }
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id); //function(item) { return item.Id === id; }
  }
}
