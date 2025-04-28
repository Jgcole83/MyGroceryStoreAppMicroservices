const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const groceryItems = require('./groceryItems');  // <-- Import the grocery items

// Define CORS options
const corsOptions = {
  origin: '*',   // Allow all origins for development
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

// Use CORS middleware
app.use(cors(corsOptions));

// Body parser
app.use(express.json());

// Route
app.get('/orders/api/grocery-items', (req, res) => {
  res.json(groceryItems);   // <-- Serve the organized list!
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Order Service is running on port ${PORT}`);
});
