import express from 'express';
import dotenv from 'dotenv';
import orderRoutes from './routes/orderRoutes.js'; // Assuming you have the routes defined here
import cors from 'cors';  // For enabling CORS
import { Pool } from 'pg';  // PostgreSQL client for querying the database
import authenticateJWT from './middleware/authenticateJWT.js';
import jwt from 'jsonwebtoken';

dotenv.config();  // Load environment variables

const app = express();

// Set up CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));  // Apply the CORS configuration

// Middleware to parse JSON requests
app.use(express.json());

// Set up PostgreSQL connection using environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:yourpassword@localhost:5432/grocerydb',
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-here';

// Sample product data
const products = [
    { id: 1, name: 'Apples', price: 2.99, category: 'Fruits' },
    { id: 2, name: 'Bananas', price: 1.99, category: 'Fruits' },
    { id: 3, name: 'Milk', price: 3.49, category: 'Dairy' },
    { id: 4, name: 'Bread', price: 2.49, category: 'Bakery' },
    { id: 5, name: 'Eggs', price: 4.99, category: 'Dairy' }
];

// In-memory storage for orders (replace with database in production)
const orders = [];

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Mount API routes (order routes will be under /api)
app.use('/api', authenticateJWT, orderRoutes);  // Apply JWT authentication middleware to order routes

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Order service is running' });
});

// Get all products
app.get('/products', (req, res) => {
    res.json(products);
});

// Get product by ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

// Create new order
app.post('/orders', authenticateToken, (req, res) => {
    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Invalid order items' });
        }

        const order = {
            id: Date.now().toString(),
            userId: req.user.userId,
            items,
            status: 'pending',
            createdAt: new Date()
        };

        orders.push(order);
        res.status(201).json(order);
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Get user's orders
app.get('/orders', authenticateToken, (req, res) => {
    const userOrders = orders.filter(order => order.userId === req.user.userId);
    res.json(userOrders);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server on the specified port
const PORT = process.env.ORDER_PORT || 3002;
app.listen(PORT, () => {
  console.log(`Order Service running on http://localhost:${PORT}`);
});
