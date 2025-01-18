import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';

const tentsData = new ProductData('tents');
const productsList = new ProductListing('tents', tentsData, 'main');
console.log(productsList);
productsList.init();
console.log(productsList);
