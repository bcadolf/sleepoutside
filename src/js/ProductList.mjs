export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.productList = {};
  }

  async init() {
    this.productList = await this.dataSource.getData();
    // this.renderProductList();
  }

  renderProductList() {
    target = document.querySelector(this.listElement);
  }
}
