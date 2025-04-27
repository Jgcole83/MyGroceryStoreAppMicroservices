// /order-service/server.js

const express = require('express');
const app = express();
const orderRoutes = require('./routes/orderRoutes');  // Import order routes

// Middleware to parse JSON requests
app.use(express.json());

// Use order-specific routes
app.use('/orders', orderRoutes);

app.listen(3002, () => {
  console.log('Order Service is running on port 3002');
});
