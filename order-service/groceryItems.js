// groceryItems.js

class GroceryItem {
    constructor(id, name, price, category, subcategory) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.category = category;
      this.subcategory = subcategory;
    }
  }
  
  const groceryItems = [
    new GroceryItem(1, "Whole Milk", 3.99, "Dairy", "Milk"),
    new GroceryItem(2, "Cheddar Cheese", 4.99, "Dairy", "Cheese"),
    new GroceryItem(3, "Yogurt", 1.49, "Dairy", "Yogurt"),
    new GroceryItem(4, "Butter", 2.99, "Dairy", "Butter"),
    new GroceryItem(5, "Cream Cheese", 3.49, "Dairy", "Cheese"),
  
    new GroceryItem(6, "Lettuce", 1.99, "Produce", "Vegetable"),
    new GroceryItem(7, "Tomatoes", 2.49, "Produce", "Vegetable"),
    new GroceryItem(8, "Carrots", 1.29, "Produce", "Vegetable"),
    new GroceryItem(9, "Spinach", 2.99, "Produce", "Vegetable"),
    new GroceryItem(10, "Cucumber", 1.59, "Produce", "Vegetable"),
  
    new GroceryItem(11, "Apples", 1.49, "Fruit", "Fresh Fruit"),
    new GroceryItem(12, "Bananas", 0.69, "Fruit", "Fresh Fruit"),
    new GroceryItem(13, "Strawberries", 3.99, "Fruit", "Berries"),
    new GroceryItem(14, "Blueberries", 4.49, "Fruit", "Berries"),
    new GroceryItem(15, "Oranges", 1.29, "Fruit", "Citrus"),
  
    new GroceryItem(16, "Croissant", 2.99, "Pastries", "Bakery"),
    new GroceryItem(17, "Danish", 3.49, "Pastries", "Bakery"),
    new GroceryItem(18, "Muffin", 2.49, "Pastries", "Bakery"),
    new GroceryItem(19, "Cinnamon Roll", 3.99, "Pastries", "Bakery"),
    new GroceryItem(20, "Bagel", 1.99, "Pastries", "Bakery"),
  ];
  
  module.exports = groceryItems;
  