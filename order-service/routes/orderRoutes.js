const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // Adjust if necessary

// Define the routes for order-related endpoints
router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

// New route for grocery items
router.get('/api/grocery-items', orderController.getGroceryItems); // Add this route for fetching grocery items

module.exports = router;
