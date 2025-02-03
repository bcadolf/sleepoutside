/* eslint-disable no-console */

import { setLocalStorage, getLocalStorage } from './utils.mjs';

function makeProductCardHtml(product) {
  let basePrice = product.ListPrice;
  let priceHtml = `<p class='product-card__price'>$${product.ListPrice}</p>`;
  if ('SuggestedRetailPrice' in product) {
    basePrice = product.SuggestedRetailPrice;
  }
  if (basePrice != product.FinalPrice) {
    priceHtml = `<p class='product-card__price'>Original Price: $<del>${basePrice}</del></p>
    <p class='product-card__final-price'>Discounted price: $${product.FinalPrice} (save $${(basePrice - product.FinalPrice).toFixed(2)})</p>`;
  }

  return `<section class='product-detail'>
      <h3>${product.Brand.Name}</h3>
      <h2 class='divider'>${product.NameWithoutBrand}</h2>
      <img class='divider' 
      src='${product.Images.PrimaryLarge}'
      alt='${product.NameWithoutBrand}'/>
      ${priceHtml}
      <p class='product-card__price'>$${product.FinalPrice}</p>
      <p class='product__color'>${product.Colors[0].ColorName}</p>
      <p class='product__description'>${product.DescriptionHtmlSimple}</p>
      <div class='product-detail__add'>
        <button id='addToCart' data-id='${product.Id}'>Add to Cart</button>
      </div>
    </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    console.log(this.productId);
    this.product = await this.dataSource.findProductById(this.productId);    
    
    // once we have the product details we can render out the HTML
    this.renderProductDetails('main');
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    // get the current cart from local storage
    const cart = getLocalStorage('so-cart') || [];
    // add the current product to the cart
    cart.push(this.product);
    // save the cart back to local storage
    setLocalStorage('so-cart', cart);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML('afterBegin', makeProductCardHtml(this.product));
  }


}
