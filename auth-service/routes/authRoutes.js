const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registration route
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

// Forgot Password route
router.post("/forgot-password", authController.forgotPassword);

// Reset Password route
router.post("/reset-password", authController.resetPassword);

module.exports = router;
