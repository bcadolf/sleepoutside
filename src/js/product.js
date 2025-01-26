import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { getParams } from './utils.mjs';
import loadHeaderFooter from './utils.mjs';
loadHeaderFooter();

let category = getParams('category');
if (!category) {
    category = localStorage.getItem('category'); // Retrieve from local storage if not in URL
}
const productId = getParams('product');
const dataSource = new ProductData(category);
const product = new ProductDetails(productId, dataSource, category);
product.init();
