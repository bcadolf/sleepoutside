import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import getParams from './utils.mjs';

const productId = getParams('product');
const dataSource = new ProductData('tents');
// const cartKey = 'so-cart';

const product = new ProductDetails(productId, dataSource);
product.init();

// console.log(dataSource.findProductById(productId));

// function addProductToCart(product) {
//   // gets existing data
//   let cartItems = getLocalStorage(cartKey) || [];

//   // appends new item to list
//   cartItems.push(product);

//   // sets new value to local storage
//   setLocalStorage(cartKey, cartItems);
// }

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// add listener to Add to Cart button
// document.getElementById('addToCart').addEventListener('click', product);
