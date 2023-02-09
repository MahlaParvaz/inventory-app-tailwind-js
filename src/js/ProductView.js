import Storage from './Storage.js';

const productTitle = document.querySelector('#product-title');
const productQuantity = document.querySelector('#product-quantity');
const productCategory = document.querySelector('#product-category');
const addNewProductBtn = document.querySelector('#add-new-product');

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener('click', (event) => this.addNewProduct(event));
    this.products = [];
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  addNewProduct(event) {
    event.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;
    if (!title || !quantity || !category) return;
    Storage.saveProducts({ title, quantity, category });
    this.products = Storage.getAllProducts();
    // updated dom
    this.createProductsList();
    productTitle.value = '';
    productQuantity.value = '';
  }

  createProductsList() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let result = ` `;
    this.products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find((c) => c.id == item.category);
      result += ` <div  class="flex items-center justify-between mb-4">
      <span class="text-slate-700 font-bold">${item.title}</span>
      <div class="flex items-center justify-between gap-x-2">
        <span>${new Date().toLocaleDateString(undefined, options)}</span>
        <span class="border border-slate-400 px-3 py-0.5 rounded-2xl">${selectedCategory.title}</span>
        <span
          class="w-7 h-7 border border-2 border-slate-400 rounded-full flex items-center justify-center bg-blue-600 text-white text-sm"
          >${item.quantity}</span>
        <button class="border border-red-600 text-red-600 px-2 py-0.5 rounded-2xl" data-id=${item.id}>delete</button>
      </div>
    </div>`;
    });
    const productsListDiv = document.querySelector('#products-list');
    productsListDiv.innerHTML = result;
  }
}

export default new ProductView();
