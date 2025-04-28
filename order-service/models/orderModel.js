let orders = [];  // In-memory store for orders

class Order {
  static create(orderData) {
    const newOrder = { ...orderData, id: orders.length + 1 };  // Simulating order ID
    orders.push(newOrder);
    return newOrder;
  }

  static findAll() {
    return orders;
  }

  static findById(id) {
    return orders.find(order => order.id === id);
  }

  static update(id, updatedData) {
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex !== -1) {
      orders[orderIndex] = { ...orders[orderIndex], ...updatedData };
      return orders[orderIndex];
    }
    return null;
  }

  static delete(id) {
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex !== -1) {
      return orders.splice(orderIndex, 1);
    }
    return null;
  }
}

module.exports = Order;
