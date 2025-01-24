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
  calculateSubtotal(); // added to update the subtotal everytime an item is removed from the cart.
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
} // error in the function this removes all of the same item from the cart not just one from the array. This needs to be fixed along with the add to cart adding the whole item twice instead of just changing the qty and price.

function generateRemoveItemHandler(id) {
  return function () {
    removeItemFromCart(id);
  };
}

function calculateSubtotal() {
  //this is used to add the Final price of each item in the cart to create and diplay a subtotal to the customer.
  let subtotal = 0;
  const cartSubtotal = document.querySelector('.cart-subtotal');
  const items = getLocalStorage('so-cart');
  if (items != '') {
    for (var item of items) {
      let cost = item.FinalPrice;
      subtotal += cost;
    }
    cartSubtotal.classList.remove('hide');
    cartSubtotal.innerHTML = `Subtotal: ${subtotal}`;
  } else {
    cartSubtotal.classList.add('hide');
  }
}

renderCartContents();
