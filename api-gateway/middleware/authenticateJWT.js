const express = require('express');
const axios = require('axios');
const path = require('path'); // Make sure to import path for correct file handling
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Serve static files from the root directory (adjusted for public folder if needed)
app.use(express.static(path.join(__dirname, 'public'))); // Serving files from the public directory

// Serve the order.html page first (ensure this is above the proxy routes)
app.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'order.html')); // Adjust the path to where your order.html is located
});

// Proxy requests to auth-service
app.use('/auth', async (req, res, next) => {
  try {
    const { method, originalUrl, body, headers } = req;
    const url = `http://auth-service:${process.env.AUTH_SERVICE_PORT}${originalUrl}`;
    
    console.log(`Proxying request to: ${url}`);
    const response = await axios({ method, url, data: body, headers, timeout: 5000 });
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Error with auth service proxy:', err.message);
    res.status(500).json({ message: 'Error with auth service proxy', error: err.message });
  }
});

// Proxy requests to order-service
app.use('/order', async (req, res, next) => {
  try {
    const { method, originalUrl, body, headers } = req;
    const url = `http://order-service:${process.env.ORDER_SERVICE_PORT}${originalUrl}`;
    
    console.log(`Proxying request to: ${url}`);
    const response = await axios({ method, url, data: body, headers, timeout: 5000 });
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Error with order service proxy:', err.message);
    res.status(500).json({ message: 'Error with order service proxy', error: err.message });
  }
});

// Health check route for the API Gateway
app.get('/health', async (req, res) => {
  try {
    const authResponse = await axios.get(`http://auth-service:${process.env.AUTH_SERVICE_PORT}/health`);
    const orderResponse = await axios.get(`http://order-service:${process.env.ORDER_SERVICE_PORT}/health`);
    
    if (authResponse.status === 200 && orderResponse.status === 200) {
      res.status(200).send('API Gateway is healthy');
    } else {
      res.status(500).send('One or more services are down');
    }
  } catch (err) {
    res.status(500).send('Error checking service health');
  }
});

// Start the API Gateway server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
