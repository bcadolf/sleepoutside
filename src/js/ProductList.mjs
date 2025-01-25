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
    <a href="product_pages/?product=${product.Id}">
      <img
        src="${product.Image}"
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
    this.productList = {};
  }

  async init() {
    this.productList = await this.dataSource.getData();
    this.renderList(this.productList);
  }

  renderList(list) {
    RenderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      'afterbegin',
      true,
    );
    // const htmlStrings = this.productList.map(productCardTemplate);
    // console.log(htmlStrings);
    // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
    // this.listElement.innerHTML = '';
    // this.productList.forEach((product) => {
    //   this.listElement.innerHTML += productCardTemplate(product);
    // });
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
}

