// /productService/server.js

const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");

// Middleware to parse JSON requests
app.use(express.json());

// Use product routes
app.use("/api", productRoutes);

app.listen(3003, () => {
  console.log("Product Service is running on port 3003");
});
