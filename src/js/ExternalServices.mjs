/* eslint-disable no-console */
// const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'; //use only for dev.
// const baseURL = 'http://wdd330-backend.onrender.com/checkout/'; // different endpoint week 04
const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: 'servicesError', message: data };
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(Id) {
    console.log('Fetching product Id:', Id);
    const response = await fetch(baseURL + `product/${Id}`);
    console.log('API response:', response)
    const data = await convertToJson(response);
    console.log('Product Data:', data);
    return data.Result;
  }

  async checkout(payLoad) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payLoad),
    };
    return await fetch(baseURL + 'checkout/', options).then(convertToJson);
  }
}
