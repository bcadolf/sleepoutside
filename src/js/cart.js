import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  cartItems.forEach((item) =>
    document
      .getElementById(item.Id)
      .addEventListener('click', generateRemoveItemHandler(item.Id)),
  );
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <button class="cart-card__remove" id="${item.Id}">Remove</button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}

function removeItemFromCart(id) {
  const cartItems = getLocalStorage('so-cart');
  const updatedCart = cartItems.filter((item) => item.Id !== id);
  setLocalStorage('so-cart', updatedCart);
  renderCartContents();
}

function generateRemoveItemHandler(id) {
  return function () {
    removeItemFromCart(id);
  };
}

renderCartContents();
