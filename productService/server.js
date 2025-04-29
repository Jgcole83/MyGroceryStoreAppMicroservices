// /productService/server.js
const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");

// Middleware to parse JSON requests
app.use(express.json());

// Use product routes
app.use("/api", productRoutes);

const PORT = process.env.PORT || 5003;  // Set the correct port to 5003
app.listen(PORT, () => {
  console.log(`Product Service is running on port ${PORT}`);
});
