require('dotenv').config();  // Load environment variables from .env file
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const User = require("../models/userModel");
let resetTokens = {};  // In-memory store for reset tokens

// Utility function to send password reset email
class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  // Use email from environment variables
        pass: process.env.EMAIL_PASS   // Use password from environment variables
      }
    });
  }

  sendPasswordResetEmail(to, resetLink) {
    const mailOptions = {
      from: process.env.EMAIL_USER,  // From email
      to,
      subject: "Reset Password",
      text: `Reset your password: ${resetLink}`
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (err) => {
        if (err) reject("Failed to send reset email");
        else resolve("Reset email sent");
      });
    });
  }
}

// Controller for registration
exports.register = async (req, res) => {
  const { name, email, password, address, city, state, phone, budget } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword, address, city, state, phone, budget });
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller for login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller for forgotten password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const tokenExpiryTime = Date.now() + 3600000; // 1 hour expiration
    resetTokens[token] = { email, expiresAt: tokenExpiryTime };

    const resetLink = `http://localhost:5000/reset-password.html?token=${token}`;
    const emailService = new EmailService();
    await emailService.sendPasswordResetEmail(email, resetLink);
    res.status(200).json({ message: "Reset email sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller for resetting password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ error: "New password is required" });
  }

  const tokenData = resetTokens[token];
  if (!tokenData) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }

  const { email, expiresAt } = tokenData;
  if (Date.now() > expiresAt) {
    delete resetTokens[token];  // Clean up expired token
    return res.status(400).json({ error: "Token has expired" });
  }

  try {
    // Hash the new password before storing it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updatePassword(email, hashedPassword);
    delete resetTokens[token];  // Clean up used token
    res.status(200).json({ message: "Password successfully updated!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
