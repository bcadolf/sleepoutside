import { setLocalStorage } from "./utils.mjs";

function makeProductCard(product) {
    return productCard.innerHTML = `<h3>!!!</h3>

        <h2 class="divider">!!!</h2>

        <img
          class="divider"
          src="!!!"
          alt="!!!"
        />

        <p class="product-card__price">!!!</p>

        <p class="product__color">!!!</p>

        <p class="product__description">
          !!!
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="!!!">Add to Cart</button>
        </div>`;
}


export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    init() {

    }
    renderProductDetails() {



    }