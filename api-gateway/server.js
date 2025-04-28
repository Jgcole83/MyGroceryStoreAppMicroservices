const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Proxy requests to auth-service
app.use('/auth', async (req, res, next) => {
  try {
    const { method, originalUrl, body, headers } = req;
    const url = `${process.env.AUTH_SERVER_URL}${originalUrl}`;  // Ensure AUTH_SERVER_URL is set in .env
    
    // Log request details
    console.log(`Proxying request to: ${url}`);
    console.log(`Request method: ${method}`);
    console.log(`Request body: ${JSON.stringify(body)}`);
    console.log(`Request headers: ${JSON.stringify(headers)}`);
    
    // Send the request to auth-service
    const response = await axios({
      method,
      url,
      data: body,
      headers: headers,
    });
    
    // Send back the response from auth-service
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Error with auth service proxy:', err.message);
    res.status(500).json({ message: 'Error with auth service proxy', error: err.message });
  }
});

// Proxy requests to order-service
app.use('/orders', async (req, res, next) => {
  try {
    const { method, originalUrl, body, headers } = req;
    const url = `${process.env.ORDERS_SERVER_URL}${originalUrl}`;  // Ensure ORDERS_SERVER_URL is set in .env
    
    // Log request details
    console.log(`Proxying request to: ${url}`);
    console.log(`Request method: ${method}`);
    console.log(`Request body: ${JSON.stringify(body)}`);
    console.log(`Request headers: ${JSON.stringify(headers)}`);
    
    // Send the request to order-service
    const response = await axios({
      method,
      url,
      data: body,
      headers: headers,
    });
    
    // Send back the response from order-service
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Error with order service proxy:', err.message);
    res.status(500).json({ message: 'Error with order service proxy', error: err.message });
  }
});

// Proxy requests to product-service (if implemented)
app.use('/products', async (req, res, next) => {
  try {
    const { method, originalUrl, body, headers } = req;
    const url = `${process.env.PRODUCTS_SERVER_URL}${originalUrl}`;  // Ensure PRODUCTS_SERVER_URL is set in .env
    
    // Log request details
    console.log(`Proxying request to: ${url}`);
    console.log(`Request method: ${method}`);
    console.log(`Request body: ${JSON.stringify(body)}`);
    console.log(`Request headers: ${JSON.stringify(headers)}`);
    
    // Send the request to product-service
    const response = await axios({
      method,
      url,
      data: body,
      headers: headers,
    });
    
    // Send back the response from product-service
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Error with product service proxy:', err.message);
    res.status(500).json({ message: 'Error with product service proxy', error: err.message });
  }
});

// Health check route for the API Gateway
app.get('/health', (req, res) => {
  res.status(200).send('API Gateway is running');
});

// Start the API Gateway server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
