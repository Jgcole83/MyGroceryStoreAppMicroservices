import dotenv from 'dotenv';  // Load environment variables from .env file
import express from 'express';  // Express.js framework
import path from 'path';  // For handling file paths
import { createProxyMiddleware } from 'http-proxy-middleware';  // Proxy middleware
import authenticateJWT from './middleware/authenticateJWT.js';  // Authentication middleware
import { fileURLToPath } from 'url';  // For handling __dirname in ES Modules
import cors from 'cors';  // Import the CORS package
import morgan from 'morgan';

// Initialize environment variables
dotenv.config();

// Initialize express
const app = express();

// Enable CORS for specific origin (your frontend)
const allowedOrigins = ['http://localhost:5500', 'http://127.0.0.1:5500'];  // Frontend URL

// Use CORS middleware (added to top for better processing)
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Add logging middleware
app.use(morgan('dev'));

// Get the __dirname value in ES modules context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static HTML files from the root directory (e.g., login.html, order.html)
app.use(express.static(__dirname)); // Serve static files directly from root

// Serve login.html at root ('/')
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve order.html at '/order'
app.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname, 'order.html'));
});

// Middleware to parse JSON requests
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
});

// Proxy for /auth/register (No authentication required here)
app.post('/auth/register', createProxyMiddleware({
  target: process.env.AUTH_SERVER_URL || 'http://localhost:3001',  // Auth server URL
  changeOrigin: true,
  pathRewrite: {
    '^/auth/register': '/auth/register',  // Keep the original path
  },
  onError: (err, req, res) => {
    console.error('Auth Service Error:', err);
    res.status(503).json({
      success: false,
      error: 'Service Unavailable',
      message: 'Authentication service is currently unavailable'
    });
  }
}));

// Proxy for /auth/login (No authentication required here)
app.post('/auth/login', createProxyMiddleware({
  target: process.env.AUTH_SERVER_URL || 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/auth/login': '/auth/login',  // Keep the original path
  },
  onError: (err, req, res) => {
    console.error('Auth Service Error:', err);
    res.status(503).json({
      success: false,
      error: 'Service Unavailable',
      message: 'Authentication service is currently unavailable'
    });
  }
}));

// Proxy for /auth/forgot-password (No authentication required here)
app.post('/auth/forgot-password', createProxyMiddleware({
  target: process.env.AUTH_SERVER_URL || 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/auth/forgot-password': '/auth/forgot-password',
  },
}));

// Proxy for /auth/reset-password (No authentication required here)
app.post('/auth/reset-password', createProxyMiddleware({
  target: process.env.AUTH_SERVER_URL || 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/auth/reset-password': '/auth/reset-password',
  },
}));

// Proxy for /orders service
app.post('/orders', createProxyMiddleware({
  target: process.env.ORDERS_SERVER_URL || 'http://localhost:5002',
  changeOrigin: true,
  pathRewrite: {
    '^/orders': '',
  },
}));

// Authenticated routes for /orders (GET, PUT, DELETE)
app.use('/orders', authenticateJWT, createProxyMiddleware({
  target: process.env.ORDERS_SERVER_URL || 'http://localhost:5002',
  changeOrigin: true,
  pathRewrite: {
    '^/orders': '',
  },
}));

// Proxy for /api/grocery-items (Products service)
app.use('/api/grocery-items', createProxyMiddleware({
  target: process.env.PRODUCTS_SERVER_URL || 'http://localhost:5003',
  changeOrigin: true,
  pathRewrite: {
    '^/api/grocery-items': '/api/grocery-items'
  },
  timeout: 5000, // 5 second timeout
  proxyTimeout: 5000, // 5 second proxy timeout
  onError: (err, req, res) => {
    console.error('Product Service Error:', err);
    // Return mock data if the service is down
    res.status(200).json({
      success: true,
      data: {
        'Dairy': [
          { id: '1', name: 'Milk', price: 3.99, stock: 100, description: 'Fresh whole milk' },
          { id: '2', name: 'Cheese', price: 4.99, stock: 100, description: 'Sharp cheddar cheese' }
        ],
        'Produce': [
          { id: '3', name: 'Apples', price: 1.99, stock: 100, description: 'Fresh red delicious apples' },
          { id: '4', name: 'Bananas', price: 0.99, stock: 100, description: 'Ripe bananas' }
        ],
        'Meat': [
          { id: '5', name: 'Chicken', price: 5.99, stock: 100, description: 'Fresh chicken breast' },
          { id: '6', name: 'Beef', price: 7.99, stock: 100, description: 'Premium ground beef' }
        ],
        'Dry Goods': [
          { id: '7', name: 'Pasta', price: 2.99, stock: 100, description: 'Italian pasta' },
          { id: '8', name: 'Rice', price: 3.99, stock: 100, description: 'Long grain white rice' }
        ]
      },
      timestamp: new Date().toISOString(),
      message: 'Using fallback data'
    });
  }
}));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    message: 'API Gateway is running',
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

// Start the server on the specified port
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
  console.log('Health check available at /health');
});
