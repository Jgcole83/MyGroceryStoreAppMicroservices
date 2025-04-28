// utils/orderUtility.js

// Function to calculate the total cost of an order
function calculateTotal(orderItems) {
  let total = 0;
  orderItems.forEach(({ item, quantity, price }) => {
    // Check if quantity and price are valid numbers
    if (typeof quantity !== 'number' || typeof price !== 'number') {
      throw new Error('Invalid quantity or price.');
    }
    total += quantity * price;
  });

  // Return the total rounded to 2 decimal places
  return parseFloat(total.toFixed(2));
}

// Function to check if the total exceeds the user's budget
function isOrderAffordable(total, budget) {
  // Ensure budget is a valid number
  if (typeof budget !== 'number') {
    throw new Error('Invalid budget.');
  }
  return total <= budget;
}

module.exports = {
  calculateTotal,
  isOrderAffordable
};
