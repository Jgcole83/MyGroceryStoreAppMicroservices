// models/orderModels.js
let orders = []; // In-memory storage for orders

class Order {
  constructor(userId, shoppingList, total) {
    this.userId = userId;
    this.shoppingList = shoppingList;
    this.total = total;
    this.createdAt = new Date();
  }

  static createOrder(order) {
    orders.push(order);
  }

  static findOrdersByUserId(userId) {
    return orders.filter(order => order.userId === userId);
  }
}

export default Order;
