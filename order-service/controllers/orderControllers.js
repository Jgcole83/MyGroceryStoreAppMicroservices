import { calculateTotal, isOrderAffordable } from "../utils/orderUtility.js";

// In-memory storage for orders (can be replaced with a database)
let orders = [];

// Controller: Place Order
export function placeOrder(req, res) {
  try {
    // Accept both 'shoppingList' (user) and 'items' (guest)
    const shoppingList = req.body.shoppingList || req.body.items;
    const { userId, name, email, address, city, state, phone } = req.body;

    if (!Array.isArray(shoppingList) || shoppingList.length === 0) {
      return res.status(400).json({ error: "Shopping list is required and must be an array." });
    }

    for (const item of shoppingList) {
      if (!item.name || !item.price || !item.quantity) {
        return res.status(400).json({ error: "Each item must have a name, price, and quantity." });
      }
    }

    const total = calculateTotal(shoppingList);

    let order;
    if (userId) {
      // User order (optionally check budget if needed)
      order = { userId, shoppingList, total, createdAt: new Date(), type: 'user' };
    } else {
      // Guest order
      if (!name || !email || !address || !city || !state || !phone) {
        return res.status(400).json({ error: "Guest info required for guest checkout." });
      }
      order = {
        guest: { name, email, address, city, state, phone },
        shoppingList,
        total,
        createdAt: new Date(),
        type: 'guest'
      };
    }
    orders.push(order);
    return res.status(200).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
}

// Stub for grocery items (you can update this as needed)
export function getGroceryItems(req, res) {
  res.status(200).json([
    { name: "Apple", price: 1.2 },
    { name: "Bread", price: 2.5 },
    { name: "Milk", price: 3.0 }
  ]);
}
