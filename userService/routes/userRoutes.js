const express = require('express');
import userController from "./controllers/userController.js";

const router = express.Router();

// In-memory storage for users (this can be replaced with a database)
let users = [
  { email: "test@example.com", password: "password123", name: "Test User", budget: 50 }
];

// Register User Route
router.post("/register", userController.register);

// Login User Route
router.post("/login", userController.login);

// Forgot Password Route (Send Reset Email)
router.post("/forgot-password", userController.forgotPassword);

// Reset Password Route (After User Clicks Reset Link)
router.post("/reset-password", userController.resetPassword);

router.get("/users", (_, res) => {
  res.json(users);  // Send the in-memory user data for now
});


module.exports = router;
