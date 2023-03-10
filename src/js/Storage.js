const products = [
  {
    id: 1,
    title: 'React.js',
    category: 'frontend ',
    quantity: '3',
    createdAt: '2021-9-31T15:03:23.556Z',
  },
  {
    id: 2,
    title: 'Node.js',
    category: 'backend ',
    quantity: '4',
    createdAt: '2021-10-31T15:03:23.556Z',
  },
  {
    id: 3,
    title: 'Vue.js',
    category: 'frontend ',
    quantity: '5',
    createdAt: '2021-11-31T15:03:23.556Z',
  },
];
const categories = [
  {
    id: 1,
    title: 'frontend',
    description: 'frontend of application',
    createdAt: '2021-11-01T10:47:26.889Z',
  },
  {
    id: 2,
    title: 'backend',
    description: 'the backend of application',
    createdAt: '2021-10-31T15:03:23.556Z',
  },
];

export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem('category')) || [];
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }
  static saveCategories(categoryToSave) {
    const categories = Storage.getAllCategories();
    const existedCategories = categories.find((category) => category.id === categoryToSave.id);
    if (existedCategories) {
      existedCategories.title = categoryToSave.title;
      existedCategories.description = categoryToSave.description;
      existedCategories.createdAt = new Date().toISOString();
    } else {
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      categories.push(categoryToSave);
    }
    localStorage.setItem('category', JSON.stringify(categories));
  }

  static getAllProducts(sort = 'newest') {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    return savedProducts.sort((a, b) => {
      if (sort === 'newest') {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === 'oldest') {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
  }
  static saveProducts(productToSave) {
    const Products = Storage.getAllProducts();
    const existedProducts = categories.find((product) => product.id === productToSave.id);
    if (existedProducts) {
      // edit
      existedProducts.title = productToSave.title;
      existedProducts.category = productToSave.category;
      existedProducts.quantity = productToSave.quantity;
      existedProducts.createdAt = new Date().toISOString();
    } else {
      // new
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      Products.push(productToSave);
    }
    localStorage.setItem('products', JSON.stringify(Products));
  }
  static deleteProducts(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id !== parseInt(id));
    localStorage.setItem('products', JSON.stringify(filteredProducts));
  }
}
