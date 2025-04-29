// /userService/controllers/userController.js

import User from '../models/user';  // Assuming you have a User model defined
import EmailService from '../services/emailService';
import crypto from 'crypto';
const resetTokens = {};  // Store tokens temporarily

// Register User Route Handler
export const register = (req, res) => {
  const { name, email, password, address, city, state, phone, budget } = req.body;

  // Check if user already exists
  if (User.findByEmail(email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Create new user (this is just in-memory, should be saved to a database in production)
  const newUser = new User(name, email, password, address, city, state, phone, budget);
  User.save(newUser);  // Save to the 'database' (in-memory for now)

  res.status(201).json({ message: 'Registration successful' });
};

// Login User Route Handler
export const login = (req, res) => {
  const { email, password } = req.body;
  const user = User.findByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful' });
};

// Forgot Password Route Handler (Send Reset Email)
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = User.findByEmail(email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    // Generate a reset token
    const token = crypto.randomBytes(20).toString('hex');
    resetTokens[token] = email;

    // Create the reset link
    const resetLink = `http://localhost:5000/reset-password.html?token=${token}`;

    // Send the reset email
    await EmailService.sendPasswordResetEmail(email, resetLink);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reset Password Route Handler (After User Clicks Reset Link)
export const resetPassword = (req, res) => {
  const { token, newPassword } = req.body;

  const email = resetTokens[token];
  if (!email) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  // Update password in user model (this is just in-memory for now)
  User.updatePassword(email, newPassword);

  // Delete the reset token after use
  delete resetTokens[token];

  res.status(200).json({ message: 'Password successfully updated' });
};

// Get All Users (Optional, for testing or admin purposes)
export const getUsers = (res) => {
  res.json(User.getAllUsers());  // Assuming you have a method to fetch all users
};
