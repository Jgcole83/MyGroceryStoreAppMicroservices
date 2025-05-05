// /productService/server.js
require('dotenv').config();
const express = require("express");
const cors = require('cors');
const connectDB = require('./utils/db');
const productRoutes = require("./routes/productRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", productRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Product Service is running on port ${PORT}`);
});
