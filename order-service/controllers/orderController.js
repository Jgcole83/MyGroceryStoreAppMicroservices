const Order = require('../models/orderModel');

// Controller to create an order
exports.createOrder = (req, res) => {
  const { item, quantity, price } = req.body;
  try {
    const newOrder = Order.create({ item, quantity, price });
    res.status(201).json({ message: 'Order created', order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to get all orders
exports.getAllOrders = (req, res) => {
  try {
    const orders = Order.findAll();
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to get a specific order by ID
exports.getOrderById = (req, res) => {
  const { id } = req.params;
  try {
    const order = Order.findById(parseInt(id));
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to update an order
exports.updateOrder = (req, res) => {
  const { id } = req.params;
  const { item, quantity, price } = req.body;
  try {
    const updatedOrder = Order.update(parseInt(id), { item, quantity, price });
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order updated', order: updatedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to delete an order
exports.deleteOrder = (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = Order.delete(parseInt(id));
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to get grocery items (new method)
exports.getGroceryItems = (req, res) => {
  // Example list of grocery items
  const groceryItems = [
    { id: 1, name: 'Apple', price: 1.0 },
    { id: 2, name: 'Banana', price: 0.5 },
    { id: 3, name: 'Carrot', price: 0.7 },
    // Add more items as needed
  ];

  res.status(200).json(groceryItems);  // Return the grocery items as JSON
};
