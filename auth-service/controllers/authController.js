const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');  // Ensure path to User model is correct

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';
const resetTokens = new Map();

// Register
exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if email is already registered
    const existingUser = await User.findByEmail(email);  // Ensure this is async
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword, name, budget: 0 };

    // Create the new user in the database
    await User.create(newUser);

    res.status(201).json({ message: 'User registered successfully', user: { email, name } });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findByEmail(email);  // Ensure this is async
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, name: user.name },
      secretKey,
      { expiresIn: '1h' }  // Token expires in 1 hour
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findByEmail(email);  // Ensure this is async
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a random token for password reset
    const token = crypto.randomBytes(32).toString('hex');
    resetTokens.set(token, email);

    // In a production environment, you would send the reset link via email
    console.log(`🔐 Reset link (for dev): http://localhost:5000/reset-password?token=${token}`);

    res.status(200).json({ message: 'Password reset link sent (check console)' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Get the email associated with the token
    const email = resetTokens.get(token);
    if (!email) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Hash the new password before saving it to the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await User.updatePassword(email, hashedPassword);

    // Remove the reset token from the map
    resetTokens.delete(token);

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
