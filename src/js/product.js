/* eslint-disable no-console */
import { getParams } from './utils.mjs';
import loadHeaderFooter from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();

async function initProductDetails() {
  const dataSource = new ExternalServices('tents');
  console.log(window.location.search); //URL search params

  const productId = getParams('product');
  console.log('Product Id find in URL:', productId); //product Id value

  if (!productId) {
    console.error('Product ID is undefined or null');
    return;
  }
  const product = new ProductDetails(productId, dataSource);
  try {
    await product.init();
  } catch (error) {
    console.error('Error initializing product details:', error);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  initProductDetails();
});
