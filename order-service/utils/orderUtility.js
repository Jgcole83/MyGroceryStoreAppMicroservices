// utils/orderUtility.js

// Function to calculate the total cost of an order
export function calculateTotal(orderItems) {
  let total = 0;
  orderItems.forEach(({ item, quantity, price }) => {
    total += quantity * price;
  });
  return total;
}

// Function to check if the total exceeds the user's budget
export function isOrderAffordable(total, budget) {
  return total <= budget;
}
