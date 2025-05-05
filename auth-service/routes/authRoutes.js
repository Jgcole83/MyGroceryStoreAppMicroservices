import express from 'express';
import { register, login, forgotPassword, resetPassword } from '../controllers/authController';  // Ensure the path is correct

const router = express.Router();

// Registration route
router.post("/register", register);

// Login route
router.post("/login", login);

// Forgot Password route
router.post("/forgot-password", forgotPassword);

// Reset Password route
router.post("/reset-password", resetPassword);

export default router;
