const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the root directory (where your HTML files are located)
app.use(express.static(path.join(__dirname))); // Serving from the current directory

// Route for the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html')); // Adjust the path if necessary
});

// Route for the order page
app.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname, 'order.html')); // Adjust the path if necessary
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
