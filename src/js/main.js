import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';
import loadHeaderFooter from './utils.mjs';
loadHeaderFooter();

const tentsData = new ProductData('tents');
const element = document.querySelector('ul.product-list');
const productsList = new ProductListing('Tents', tentsData, element);

productsList.init();
