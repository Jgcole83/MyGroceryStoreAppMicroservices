// /productService/services/productService.js

// Placeholder for future database or service integration

const products = []; // Example in-memory array for products

export const getAllProducts = () => {
  return products; // Return products from the in-memory array
};

export const getProductById = (id) => {
  return products.find(product => product.id === id); // Fetch a product by ID
};

export const createProduct = (product) => {
  products.push(product); // Add the product to the in-memory array
  return product;
};
  