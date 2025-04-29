const express = require("express");

const router = express.Router();

// Mock product data (replace with database queries)
let products = [
  { id: 1, name: 'Product 1', price: 10.99 },
  { id: 2, name: 'Product 2', price: 12.99 },
];

// Get all products
router.get('/products', (_, res) => {
  res.status(200).json(products);
});

// Get a specific product by ID
router.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.status(200).json(product);
});

// Add a new product
router.post('/products', (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };

  products.push(newProduct);
  res.status(201).json({ message: 'Product added', product: newProduct });
});

// Update an existing product
router.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, price } = req.body;
  product.name = name || product.name;
  product.price = price || product.price;

  res.status(200).json({ message: 'Product updated', product });
});

// Delete a product
router.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products.splice(productIndex, 1);
  res.status(200).json({ message: 'Product deleted' });
});

module.exports = router;
