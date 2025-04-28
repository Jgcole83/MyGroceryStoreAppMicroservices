// utils/orderUtility.js

// Function to calculate the total cost of an order
function calculateTotal(orderItems) {
    let total = 0;
    orderItems.forEach(({ item, quantity, price }) => {
      total += quantity * price;
    });
    return total;
  }
  
  // Function to check if the total exceeds the user's budget
  function isOrderAffordable(total, budget) {
    return total <= budget;
  }
  
  module.exports = {
    calculateTotal,
    isOrderAffordable
  };
  