require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const authenticateJWT = require('./middleware/authenticateJWT');  // Import JWT auth middleware
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Proxy for /auth/register (No authentication required here)
app.use('/auth/register', createProxyMiddleware({
  target: process.env.AUTH_SERVER_URL || 'http://localhost:5000',  // Use environment variable for auth server URL
  changeOrigin: true,
  pathRewrite: {
    '^/auth/register': '/auth/register',  // Keep '/register' in the forwarded request
  },
}));

// Proxy for /auth/login (No authentication required here)
app.use('/auth/login', createProxyMiddleware({
  target: process.env.AUTH_SERVER_URL || 'http://localhost:5000',  // Use environment variable for auth server URL
  changeOrigin: true,
  pathRewrite: {
    '^/auth/login': '/auth/login',  // Keep '/login' in the forwarded request
  },
}));

// Proxy for /auth/forgot-password (No authentication required here)
app.use('/auth/forgot-password', createProxyMiddleware({
  target: process.env.AUTH_SERVER_URL || 'http://localhost:5000',  // Use environment variable for auth server URL
  changeOrigin: true,
  pathRewrite: {
    '^/auth/forgot-password': '/auth/forgot-password',  // Keep '/forgot-password' in the forwarded request
  },
}));

// Proxy for /auth/reset-password (No authentication required here)
app.use('/auth/reset-password', createProxyMiddleware({
  target: process.env.AUTH_SERVER_URL || 'http://localhost:5000',  // Use environment variable for auth server URL
  changeOrigin: true,
  pathRewrite: {
    '^/auth/reset-password': '/auth/reset-password',  // Keep '/reset-password' in the forwarded request
  },
}));

// Proxy for /orders service (Authentication required)
app.use('/orders', authenticateJWT, createProxyMiddleware({
  target: process.env.ORDERS_SERVER_URL || 'http://localhost:3002',  // Order service (running on port 3002)
  changeOrigin: true,
  pathRewrite: {
    '^/orders': '',  // Remove '/orders' from the request before forwarding
  },
}));

// Proxy for /products service (No authentication required here)
app.use('/products', createProxyMiddleware({
  target: process.env.PRODUCTS_SERVER_URL || 'http://localhost:3003',  // Product service (running on port 3003)
  changeOrigin: true,
  pathRewrite: {
    '^/products': '',  // Remove '/products' from the request before forwarding
  },
}));

const PORT = process.env.PORT || 3000;  // Use the PORT from .env or default to 3000
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
