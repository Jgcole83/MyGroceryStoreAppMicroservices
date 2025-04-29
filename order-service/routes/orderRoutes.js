import express from 'express';
import * as orderController from '../controllers/orderControllers.js';

const router = express.Router();

// GET /api/grocery-items
router.get('/grocery-items', orderController.getGroceryItems);

// POST /api/orders
router.post('/orders', orderController.placeOrder);

export default router;
