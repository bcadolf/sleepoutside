// import { getLocalStorage, setLocalStorage } from './utils.mjs';
/* eslint-disable no-console */
import loadHeaderFooter from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

loadHeaderFooter();

document.addEventListener('DOMContentLoaded', () => {
  const cart = new ShoppingCart('so-cart', '.product-list');
  const productListElement = document.querySelector('.product-list');
  console.log('productListElement', productListElement);

  if (productListElement) {
    cart.init();

    if (cart.total > 0) {
      document.querySelector('.cart-footer').classList.remove('hide');
    }
  } else {
    console.error('Product list not found');
  }
});
