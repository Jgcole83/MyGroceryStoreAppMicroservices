// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/AuthRoutes');  // Import AuthRoutes

const app = express();
const port = 5000;  // Or whatever port you're using

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Ensure you have body-parser to handle JSON data

// Use routes
app.use('/auth', authRoutes);  // Use AuthRoutes for the '/auth' endpoint

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
