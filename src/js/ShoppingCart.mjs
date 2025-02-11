/* eslint-disable no-console */
import { getLocalStorage } from './utils.mjs';

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
    <a href='#' class='cart-card__image'>
      <img
        src='${item.Images.PrimaryMedium}'
        alt='${item.Name}'
      />
    </a>
    <a href='#'>
      <h2 class='card__name'>${item.Name}</h2>
    </a>
    <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
    <p class='cart-card__quantity'>qty: 1</p>
    <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }

  async init() {
    const list = getLocalStorage(this.key);
    this.calculateListTotal(list);
    this.renderCartContents(list);
  }

  calculateListTotal(list) {
    const amounts = list.map((item) => item.FinalPrice);
    this.total =
      Math.round(amounts.reduce((sum, item) => sum + item) * 100) / 100;
    console.log('Cart Total:', this.total); // add 04/02
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    const productListElement = document.querySelector(this.parentSelector);

    console.log('Product list element:', productListElement); // Log to ensure it's found

    if (productListElement) {
      productListElement.innerHTML = htmlItems.join('');
      const listTotalElement = document.querySelector('.cart-subtotal');
      if (listTotalElement) {
        listTotalElement.innerText = `Total: $${this.total}`;
      } else {
        console.error('Element .cart-subtotal not found');
      }
    }
  }
}