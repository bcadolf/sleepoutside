// const baseURL = 'http://server-nodejs.cit.byui.edu:3000/';
const baseURL = '../json';

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    console.log(baseURL + `/${category}`);
    const response = await fetch(baseURL + `/${category}.json`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `/${id}.json`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
