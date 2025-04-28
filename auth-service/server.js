require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');  // Ensure correct path

app.use(bodyParser.json());  // Middleware to parse JSON requests

// Ensure that the prefix '/auth' is applied to all auth-related routes
app.use('/auth', authRoutes);  // Routes will now be prefixed with '/auth'

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
