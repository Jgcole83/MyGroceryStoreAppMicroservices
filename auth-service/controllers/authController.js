const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Adjust the path to your User model

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Store securely in environment variables

// Registration logic
const register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({ email, password: hashedPassword, name });

    // Generate JWT token
    const token = jwt.sign(
      { email: newUser.email, name: newUser.name },
      secretKey,
      { expiresIn: '1h' }
    );

    // Respond with success message and token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error(`Error during registration: ${err}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login logic
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find the user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, name: user.name },
      secretKey,
      { expiresIn: '1h' }
    );

    // Respond with success message and token
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(`Error during login: ${err}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Forgot Password logic
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // In a real implementation, you would send a password reset link via email.
    // For now, just return a success message indicating the reset process has started.
    // You could also implement an email service like Nodemailer to send a link to the user.

    res.status(200).json({ message: 'Password reset link sent to your email (not implemented yet)' });
  } catch (err) {
    console.error(`Error during forgot password: ${err}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Reset Password logic
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, secretKey);

    // Find the user by email
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(`Error during password reset: ${err}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Exporting functions
module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword
};
