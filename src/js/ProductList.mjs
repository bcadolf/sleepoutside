import { RenderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  // Calculates the percentage discount
  const discount =
    product.SuggestedRetailPrice > product.FinalPrice
      ? Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
        100)
      : 0;

  // If there is a discount, create the discount tag
  const discountIndicator = discount
    ? `<p class = "discount-indicator">-${discount}% OFF</p>` : '';


  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${product.FinalPrice}</p>
      ${discountIndicator}
    </a>
  </li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    // this.productList = {};
  }

  async init() {
    this.productList = await this.dataSource.getData(this.category);
    this.renderList(this.productList);
    document.querySelector('.title').innerHTML = this.category;

    //Event Listener to dropdown order
    document.getElementById('sort').addEventListener('change', (event) => {
      this.sortProducts(event.target.value);
    });
  }

  renderList(list) {
    RenderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      'afterbegin',
      true,
    );
    
  }

  renderFilteredList() {
    RenderListWithTemplate(
      productCardTemplate,
      this.listElement,
      this.productList.slice(0, 4),
      'afterbegin',
      true,
    );
  }

  //Sort the products based on the criteria
  sortProducts(criteria) {
    if (criteria === 'price-asc') {
      this.productList.sort((a, b) => a.FinalPrice - b.FinalPrice);
    } else if (criteria === 'price-desc') {
      this.productList.sort((a, b) => b.FinalPrice - a.FinalPrice);
    } else if (criteria === 'name-asc') {
      this.productList.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (criteria === 'name-desc') {
      this.productList.sort((a, b) => b.Name.localeCompare(a.Name));
    }
    this.renderList(this.productList); //Re-renderize the list with the new order
  }
}

 //eslint-disable-next-line no-console  
 console.log('ProductList.mjs loaded');
