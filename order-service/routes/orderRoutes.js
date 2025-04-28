// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderControllers");

// Route to get grocery items
router.get("/api/grocery-items", orderController.getGroceryItems);

// Route to place an order
router.post("/orders", orderController.placeOrder);

module.exports = router;
