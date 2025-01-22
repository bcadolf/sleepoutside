import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `
    <li class='product-card'>
    <a href='product_pages/index.html?product=${product.Id}'>
    <img src = '${product.Image}' alt='Image of${product.Name}'>
    <h3 class= 'card_brand'>${product.Brand.Name}</h3>
    <h2 class='card__name'>${product.Name}</h2>
    <p class='product-card_price'>$${product.Finalprice}</p>
    </a>
    </li>
    `;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }    

    async init() {
        const list = await this.dataSource.getData();
        console.log('Products ok', list); // testar se carrega os produtos
        this.renderList(list);
    }

   //render after doing the first stretch
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

// renderList(list) {
//     const htmlStrings = list.map(productCardTemplate);
//     this.listElement.innerAdjacentHTML('afterbegin', htmlStrings.join(''));
// }
}