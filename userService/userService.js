const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");  // Import user routes

// Middleware to parse JSON requests
app.use(express.json());

// Use user-specific routes
app.use("/users", userRoutes);  // All user-related routes

// Start the server
app.listen(3003, () => {
  console.log("User Service is running on port 3003");
});
