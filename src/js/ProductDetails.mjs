/* eslint-disable no-console */
import { setLocalStorage, getLocalStorage, alertMessage } from './utils.mjs';

function makeProductCardHtml(product) {
  if (!product || !product.ListPrice || !product.FinalPrice || !product.Brand || !product.Images || !product.Colors || !product.DescriptionHtmlSimple) {
    console.error('Product data is missing required fields', product);
    return `<p>Product data is missing required fields</p>`;
  }

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
      
      <img id='product-image' class='divider product-image' 
      src='${product.Images.PrimaryLarge}'
      alt='${product.NameWithoutBrand}'/>

      ${priceHtml}
      <p class='product-card_price'>$${product.FinalPrice}</p>

      <div class='product-colors'>
      <label>Choose a color:</label>
      <div id="color-options">
      ${product.Colors.map(color => `
        <div class='color-option'>
          <img class='color-chip'
          src='${color.ColorChipImageSrc}'
          alt='${color.ColorName}'
          data-preview='${color.ColorPreviewImageSrc}'
          title='${color.ColorName}'/>
        </div>
      `).join('')}
      </div>
      </div>
      <p class='product__description'>${product.DescriptionHtmlSimple}</p>   

      <div class='product-detail__add'>
        <button id='addToCart' data-id='${product.Id}'>Add to Cart</button>
      </div>
    </section>`;
}

function addColorSelectEvent() {
  const colorChips = document.querySelectorAll('.color-chip');
  const productImage = document.getElementById('product-image');

  colorChips.forEach(chip => {
    chip.addEventListener('click', function() {
      const newImageSrc = this.getAttribute('data-preview');
      if (productImage && newImageSrc) {
        productImage.src = newImageSrc;
      }
    });
  });
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      const product = await this.dataSource.findProductById(this.productId);
      if (!product) {
        console.error('Product not found', this.productId);
        return;
      }
      this.product = product;
      this.renderProductDetails('#product-main');
    } catch (error) {
      console.error('Error initializing product details', error);
    }
  }

  addToCart() {
    let cart = getLocalStorage('so-cart');

    if (!cart) {
      cart = []; // if cart is empty, create an empty array
    } else if (typeof cart === 'string') {
      try {
        cart = JSON.parse(cart); // Convert to array if it's a string
      } catch (error) {
        console.error('Error parsing cart data', error);
        cart = [];
      }
    }
    cart.push(this.product);  // Add to cart
    setLocalStorage('so-cart', cart); // Save in localStorage
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);

    if (!element) {
      console.error(`Element '${selector}' not found`);
      return;
    }
    element.insertAdjacentHTML('afterBegin', makeProductCardHtml(this.product));   
    
    document.getElementById('addToCart').addEventListener('click', this.addToCart.bind(this));

    addColorSelectEvent();
  }
}
