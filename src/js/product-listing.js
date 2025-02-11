/* eslint-disable no-console */
import loadHeaderFooter, { getParams } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductListing from './ProductList.mjs';


loadHeaderFooter();

const category = getParams('category');
const dataSource = new ExternalServices();
const listElement = document.querySelector('.product-list');
const listing = new ProductListing(category, dataSource, listElement);

listing.init();
