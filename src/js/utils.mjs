/* eslint-disable no-console */
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// parameter extraction from url
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
  // const paramId = urlParams.get(param);
  // console.log(paramId);
  // return paramId;
  // const paramId = urlParams.get(param);
  // return paramId;
}

export function RenderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false,
) {
  const htmlStrings = list.map(templateFn);

  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate(
  templateHtml,
  parentElement,
  data,
  callback,
) {
  // parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('afterbegin', templateHtml);
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export default async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('../partials/header.html');
  const footerTemplate = await loadTemplate('../partials/footer.html');
  const headerElement = document.querySelector('header');
  const footerElement = document.querySelector('footer');
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span></span>`;

  alert.addEventListener('click', function (e) {
    if (e.target.tagName === 'SPAN') {
      main.removeChild(this);
    }
  });

  const main = document.querySelector('main');
  main.prepend(alert);
  if (scroll) window.scrollTo(0, 0);
}

// left this here to show how you could remove the alert automatically after a certain amount of time.
// setTimeout(function () {
//   main.removeChild(alert);
// }, duration);

export function removeAllAlerts() {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach((alert) => document.querySelector('main').removeChild(alert));
}


