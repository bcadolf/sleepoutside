import { getLocalStorage, setLocalStorage, getParams } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');
const cartKey = 'so-cart';
const productId = getParams('product');

console.log(dataSource.findProductById(productId));

function addProductToCart(product) {
  // gets existing data
  let cartItems = getLocalStorage(cartKey) || [];

  // appends new item to list
  cartItems.push(product);

  // sets new value to local storage
  setLocalStorage(cartKey, cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
