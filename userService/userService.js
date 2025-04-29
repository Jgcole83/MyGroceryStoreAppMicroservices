const express = require('express');
import userRoutes from "./routes/userRoutes.js";  // Import user routes
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use user-specific routes
app.use("/users", userRoutes);  // All user-related routes

// Start the server
app.listen(3003, () => {
  console.log("User Service is running on port 3003");
});
