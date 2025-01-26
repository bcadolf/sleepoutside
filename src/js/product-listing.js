import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';
import loadHeaderFooter, { getParams } from './utils.mjs';

loadHeaderFooter();

const category = getParams('category');
const dataSource = new ProductData();
const listElement = document.querySelector('ul.product-list');
const listing = new ProductListing(category, dataSource, listElement);

listing.init();

// needed to store selected category for proper load of the product page. 
function storeCategory() {
    if (category) {
        localStorage.setItem('category', category);
    }
}
storeCategory();
