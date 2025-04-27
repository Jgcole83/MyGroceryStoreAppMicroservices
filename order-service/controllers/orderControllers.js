const express = require("express");
const router = express.Router();
const { calculateTotal, isOrderAffordable } = require("../utils/orderUtility");

// In-memory storage for orders (can be replaced with a database)
let orders = [];

// Place an Order (Check Total Cost Against Budget)
router.post("/orders", (req, res) => {
  const { userId, shoppingList, budget } = req.body;

  // Calculate the total cost of the order using the utility function
  const total = calculateTotal(shoppingList);

  // Check if the total cost exceeds the user's budget
  if (!isOrderAffordable(total, budget)) {
    return res.status(400).json({ error: "You do not have enough funds for this order" });
  }

  // Create the order
  const order = {
    userId,
    shoppingList,
    total
  };

  orders.push(order);
  res.status(200).json({ message: "Order placed successfully", order });
});

module.exports = router;
