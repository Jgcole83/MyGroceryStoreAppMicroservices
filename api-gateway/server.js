import dotenv from 'dotenv';  // Load environment variables from .env file
import express from 'express';  // Express.js framework
import path from 'path';  // For handling file paths
import { createProxyMiddleware } from 'http-proxy-middleware';  // Proxy middleware
import authenticateJWT from './middleware/authenticateJWT.js';  // Authentication middleware
import { fileURLToPath } from 'url';  // For handling __dirname in ES Modules

// Initialize environment variables
dotenv.config();

// Initialize express
const app = express();

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

// Proxy for /auth/register (No authentication required here)
app.use('/auth/register', createProxyMiddleware({
  target: process.env.AUTH_SERVER_URL || 'http://localhost:5000',  // Auth server URL
  changeOrigin: true,
  pathRewrite: {
    '^/auth/register': '/auth/register',  // Keep the original path
  },
}));

// Proxy for /auth/login (No authentication required here)
app.use('/auth/login', createProxyMiddleware({
  target: process.env.AUTH_SERVER_URL || 'http://localhost:5000',
  changeOrigin: true,
  pathRewrite: {
    '^/auth/login': '/auth/login',  // Keep the original path
  },
}));

// Proxy for /auth/forgot-password (No authentication required here)
app.use('/auth/forgot-password', createProxyMiddleware({
  target: process.env.AUTH_SERVER_URL || 'http://localhost:5000',
  changeOrigin: true,
  pathRewrite: {
    '^/auth/forgot-password': '/auth/forgot-password',
  },
}));

// Proxy for /auth/reset-password (No authentication required here)
app.use('/auth/reset-password', createProxyMiddleware({
  target: process.env.AUTH_SERVER_URL || 'http://localhost:5000',
  changeOrigin: true,
  pathRewrite: {
    '^/auth/reset-password': '/auth/reset-password',
  },
}));

// Proxy for /orders service (Authentication required)
app.use('/orders', authenticateJWT, createProxyMiddleware({
  target: process.env.ORDERS_SERVER_URL || 'http://localhost:5002',  // Order service
  changeOrigin: true,
  pathRewrite: {
    '^/orders': '',  // Remove '/orders' from the request
  },
}));

// Proxy for /products service (No authentication required here)
app.use('/products', createProxyMiddleware({
  target: process.env.PRODUCTS_SERVER_URL || 'http://localhost:5003',  // Product service
  changeOrigin: true,
  pathRewrite: {
    '^/products': '',  // Remove '/products' from the request
  },
}));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'API Gateway is running' });
});

// Start the server on the specified port
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
