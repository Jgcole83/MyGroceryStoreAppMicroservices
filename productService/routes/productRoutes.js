// /productService/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Get all products
router.get("/products", productController.getAllProducts);

// Get a product by ID
router.get("/products/:id", productController.getProductById);

// Create a new product
router.post("/products", productController.createProduct);

module.exports = router;
