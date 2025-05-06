// /productService/server.js
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import morgan from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logging middleware

// Products data
const products = [
  // Dairy Products
  {
    id: '1',
    name: 'Fresh Milk',
    price: 3.99,
    category: 'Dairy',
    description: 'Fresh whole milk from local farms'
  },
  { id: '2', category: 'Dairy', name: 'Cheese', price: 4.99, stock: 100, description: 'Sharp cheddar cheese' },
  { id: '9', category: 'Dairy', name: 'Yogurt', price: 2.49, stock: 100, description: 'Greek yogurt, plain' },
  { id: '10', category: 'Dairy', name: 'Butter', price: 3.49, stock: 100, description: 'Unsalted butter' },
  { id: '11', category: 'Dairy', name: 'Cream', price: 2.99, stock: 100, description: 'Heavy whipping cream' },
  { id: '12', category: 'Dairy', name: 'Sour Cream', price: 1.99, stock: 100, description: 'Full fat sour cream' },

  // Produce
  { id: '3', category: 'Produce', name: 'Apples', price: 1.99, stock: 100, description: 'Fresh red delicious apples' },
  { id: '4', category: 'Produce', name: 'Bananas', price: 0.99, stock: 100, description: 'Ripe bananas' },
  { id: '13', category: 'Produce', name: 'Carrots', price: 1.49, stock: 100, description: 'Fresh organic carrots' },
  { id: '14', category: 'Produce', name: 'Broccoli', price: 2.49, stock: 100, description: 'Fresh broccoli florets' },
  { id: '15', category: 'Produce', name: 'Tomatoes', price: 2.99, stock: 100, description: 'Vine-ripened tomatoes' },
  { id: '16', category: 'Produce', name: 'Spinach', price: 2.99, stock: 100, description: 'Fresh baby spinach' },

  // Meat
  { id: '5', category: 'Meat', name: 'Chicken', price: 5.99, stock: 100, description: 'Fresh chicken breast' },
  { id: '6', category: 'Meat', name: 'Beef', price: 7.99, stock: 100, description: 'Premium ground beef' },
  { id: '17', category: 'Meat', name: 'Pork Chops', price: 6.99, stock: 100, description: 'Center-cut pork chops' },
  { id: '18', category: 'Meat', name: 'Salmon', price: 9.99, stock: 100, description: 'Fresh Atlantic salmon' },
  { id: '19', category: 'Meat', name: 'Turkey', price: 4.99, stock: 100, description: 'Ground turkey' },
  { id: '20', category: 'Meat', name: 'Bacon', price: 5.49, stock: 100, description: 'Thick-cut bacon' },

  // Dry Goods
  { id: '7', category: 'Dry Goods', name: 'Pasta', price: 2.99, stock: 100, description: 'Italian pasta' },
  { id: '8', category: 'Dry Goods', name: 'Rice', price: 3.99, stock: 100, description: 'Long grain white rice' },
  { id: '21', category: 'Dry Goods', name: 'Flour', price: 2.49, stock: 100, description: 'All-purpose flour' },
  { id: '22', category: 'Dry Goods', name: 'Sugar', price: 2.99, stock: 100, description: 'Granulated white sugar' },
  { id: '23', category: 'Dry Goods', name: 'Cereal', price: 3.49, stock: 100, description: 'Whole grain cereal' },
  { id: '24', category: 'Dry Goods', name: 'Oats', price: 2.99, stock: 100, description: 'Rolled oats' },

  // Bakery
  { id: '25', category: 'Bakery', name: 'Bread', price: 2.99, stock: 100, description: 'Fresh whole wheat bread' },
  { id: '26', category: 'Bakery', name: 'Bagels', price: 3.49, stock: 100, description: 'Fresh plain bagels' },
  { id: '27', category: 'Bakery', name: 'Croissants', price: 2.99, stock: 100, description: 'Buttery croissants' },
  { id: '28', category: 'Bakery', name: 'Muffins', price: 3.99, stock: 100, description: 'Blueberry muffins' },

  // Beverages
  { id: '29', category: 'Beverages', name: 'Orange Juice', price: 3.99, stock: 100, description: 'Fresh squeezed orange juice' },
  { id: '30', category: 'Beverages', name: 'Coffee', price: 7.99, stock: 100, description: 'Premium ground coffee' },
  { id: '31', category: 'Beverages', name: 'Tea', price: 4.99, stock: 100, description: 'Assorted tea bags' },
  { id: '32', category: 'Beverages', name: 'Soda', price: 1.99, stock: 100, description: 'Assorted soft drinks' },

  // Snacks
  { id: '33', category: 'Snacks', name: 'Chips', price: 2.99, stock: 100, description: 'Potato chips' },
  { id: '34', category: 'Snacks', name: 'Cookies', price: 3.49, stock: 100, description: 'Chocolate chip cookies' },
  { id: '35', category: 'Snacks', name: 'Nuts', price: 4.99, stock: 100, description: 'Mixed nuts' },
  { id: '36', category: 'Snacks', name: 'Crackers', price: 2.49, stock: 100, description: 'Assorted crackers' }
];

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'An unexpected error occurred'
    });
});

// Routes
app.get('/api/grocery-items', (req, res) => {
  try {
    const groupedProducts = products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description
      });
      return acc;
    }, {});
    
    res.json({
      success: true,
      data: groupedProducts
    });
  } catch (error) {
    console.error('Error fetching grocery items:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch products',
      message: error.message 
    });
  }
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        status: 'ok',
        message: 'Product Service is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Not found handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'The requested resource was not found'
    });
});

app.listen(port, () => {
    console.log(`Product Service running on port ${port}`);
    console.log('Using in-memory storage with default products');
    console.log('Health check available at /health');
});
