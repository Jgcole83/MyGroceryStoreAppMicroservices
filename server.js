// root/server.js
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Basic CORS configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());
app.use(express.static(__dirname));

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
  {
    id: '2',
    name: 'Cheddar Cheese',
    price: 4.99,
    category: 'Dairy',
    description: 'Sharp cheddar cheese, aged 6 months'
  },
  {
    id: '3',
    name: 'Greek Yogurt',
    price: 2.99,
    category: 'Dairy',
    description: 'Creamy Greek yogurt, high in protein'
  },
  {
    id: '4',
    name: 'Butter',
    price: 3.49,
    category: 'Dairy',
    description: 'Premium unsalted butter'
  },
  {
    id: '5',
    name: 'Sour Cream',
    price: 2.49,
    category: 'Dairy',
    description: 'Rich and creamy sour cream'
  },
  {
    id: '6',
    name: 'Cottage Cheese',
    price: 2.99,
    category: 'Dairy',
    description: 'Low-fat cottage cheese'
  },
  {
    id: '7',
    name: 'Heavy Cream',
    price: 3.99,
    category: 'Dairy',
    description: 'Pure heavy whipping cream'
  },

  // Produce
  {
    id: '8',
    name: 'Red Apples',
    price: 1.99,
    category: 'Produce',
    description: 'Fresh red delicious apples'
  },
  {
    id: '9',
    name: 'Bananas',
    price: 0.99,
    category: 'Produce',
    description: 'Ripe bananas, perfect for snacking'
  },
  {
    id: '10',
    name: 'Fresh Spinach',
    price: 2.49,
    category: 'Produce',
    description: 'Organic baby spinach leaves'
  },
  {
    id: '11',
    name: 'Tomatoes',
    price: 2.99,
    category: 'Produce',
    description: 'Vine-ripened tomatoes'
  },
  {
    id: '12',
    name: 'Carrots',
    price: 1.49,
    category: 'Produce',
    description: 'Fresh whole carrots'
  },
  {
    id: '13',
    name: 'Broccoli',
    price: 2.29,
    category: 'Produce',
    description: 'Fresh broccoli crowns'
  },
  {
    id: '14',
    name: 'Bell Peppers',
    price: 1.99,
    category: 'Produce',
    description: 'Mixed color bell peppers'
  },

  // Meat
  {
    id: '15',
    name: 'Chicken Breast',
    price: 5.99,
    category: 'Meat',
    description: 'Fresh boneless chicken breast'
  },
  {
    id: '16',
    name: 'Ground Beef',
    price: 7.99,
    category: 'Meat',
    description: 'Premium ground beef, 80/20'
  },
  {
    id: '17',
    name: 'Pork Chops',
    price: 6.99,
    category: 'Meat',
    description: 'Center-cut pork chops'
  },
  {
    id: '18',
    name: 'Salmon Fillet',
    price: 9.99,
    category: 'Meat',
    description: 'Fresh Atlantic salmon fillet'
  },
  {
    id: '19',
    name: 'Turkey Breast',
    price: 4.99,
    category: 'Meat',
    description: 'Boneless turkey breast'
  },
  {
    id: '20',
    name: 'Lamb Chops',
    price: 12.99,
    category: 'Meat',
    description: 'Premium lamb chops'
  },
  {
    id: '21',
    name: 'Bacon',
    price: 5.49,
    category: 'Meat',
    description: 'Thick-cut smoked bacon'
  },

  // Dry Goods
  {
    id: '22',
    name: 'Pasta',
    price: 2.99,
    category: 'Dry Goods',
    description: 'Italian pasta, perfect for any sauce'
  },
  {
    id: '23',
    name: 'White Rice',
    price: 3.99,
    category: 'Dry Goods',
    description: 'Long grain white rice, 5lb bag'
  },
  {
    id: '24',
    name: 'Quinoa',
    price: 4.99,
    category: 'Dry Goods',
    description: 'Organic white quinoa'
  },
  {
    id: '25',
    name: 'Oatmeal',
    price: 3.49,
    category: 'Dry Goods',
    description: 'Steel-cut oats'
  },
  {
    id: '26',
    name: 'Flour',
    price: 2.99,
    category: 'Dry Goods',
    description: 'All-purpose flour, 5lb bag'
  },
  {
    id: '27',
    name: 'Sugar',
    price: 2.49,
    category: 'Dry Goods',
    description: 'Granulated white sugar'
  },
  {
    id: '28',
    name: 'Cereal',
    price: 3.99,
    category: 'Dry Goods',
    description: 'Whole grain breakfast cereal'
  },

  // Bakery
  {
    id: '29',
    name: 'Whole Wheat Bread',
    price: 2.99,
    category: 'Bakery',
    description: 'Fresh whole wheat bread'
  },
  {
    id: '30',
    name: 'Croissants',
    price: 3.49,
    category: 'Bakery',
    description: 'Buttery, flaky croissants'
  },
  {
    id: '31',
    name: 'Bagels',
    price: 3.99,
    category: 'Bakery',
    description: 'Fresh-baked assorted bagels'
  },
  {
    id: '32',
    name: 'Sourdough Bread',
    price: 4.49,
    category: 'Bakery',
    description: 'Artisan sourdough loaf'
  },
  {
    id: '33',
    name: 'Muffins',
    price: 2.99,
    category: 'Bakery',
    description: 'Fresh-baked blueberry muffins'
  },
  {
    id: '34',
    name: 'Dinner Rolls',
    price: 2.49,
    category: 'Bakery',
    description: 'Soft dinner rolls, pack of 8'
  },
  {
    id: '35',
    name: 'Cinnamon Bread',
    price: 3.99,
    category: 'Bakery',
    description: 'Sweet cinnamon swirl bread'
  },

  // Beverages
  {
    id: '36',
    name: 'Orange Juice',
    price: 3.99,
    category: 'Beverages',
    description: 'Fresh squeezed orange juice'
  },
  {
    id: '37',
    name: 'Coffee',
    price: 7.99,
    category: 'Beverages',
    description: 'Premium ground coffee'
  },
  {
    id: '38',
    name: 'Green Tea',
    price: 4.99,
    category: 'Beverages',
    description: 'Organic green tea bags'
  },
  {
    id: '39',
    name: 'Sparkling Water',
    price: 1.99,
    category: 'Beverages',
    description: 'Natural sparkling mineral water'
  },
  {
    id: '40',
    name: 'Almond Milk',
    price: 3.49,
    category: 'Beverages',
    description: 'Unsweetened almond milk'
  },
  {
    id: '41',
    name: 'Sports Drink',
    price: 2.49,
    category: 'Beverages',
    description: 'Electrolyte sports drink'
  },
  {
    id: '42',
    name: 'Hot Chocolate',
    price: 3.99,
    category: 'Beverages',
    description: 'Rich hot chocolate mix'
  },

  // Snacks
  {
    id: '43',
    name: 'Potato Chips',
    price: 2.99,
    category: 'Snacks',
    description: 'Classic salted potato chips'
  },
  {
    id: '44',
    name: 'Chocolate Cookies',
    price: 3.49,
    category: 'Snacks',
    description: 'Delicious chocolate chip cookies'
  },
  {
    id: '45',
    name: 'Trail Mix',
    price: 4.99,
    category: 'Snacks',
    description: 'Mixed nuts and dried fruits'
  },
  {
    id: '46',
    name: 'Granola Bars',
    price: 2.99,
    category: 'Snacks',
    description: 'Oat and honey granola bars'
  },
  {
    id: '47',
    name: 'Popcorn',
    price: 1.99,
    category: 'Snacks',
    description: 'Microwave popcorn, pack of 3'
  },
  {
    id: '48',
    name: 'Pretzels',
    price: 2.49,
    category: 'Snacks',
    description: 'Salted pretzel twists'
  },
  {
    id: '49',
    name: 'Mixed Nuts',
    price: 5.99,
    category: 'Snacks',
    description: 'Premium mixed nuts'
  }
];

// Routes
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'login.html'));
});

app.get('/order', (req, res) => {
  res.sendFile(join(__dirname, 'order.html'));
});

// Get grocery items
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
