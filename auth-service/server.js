import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import jwt from 'jsonwebtoken';

const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const app = express();

// Set port using environment variable or default to 3001
const port = process.env.PORT || 3001; 

app.use(express.json());

// PostgreSQL connection using environment variables for DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:yourpassword@localhost:5432/grocerydb',
});

// Register
app.post('/auth/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, hashedPassword, email]
    );

    res.status(201).json({ message: 'User registered successfully!', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'default_secret_key', {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Forgot password
app.post('/auth/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }

    // In real life, you would send an email. We'll just mock a reset token.
    const resetToken = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET || 'default_secret_key', {
      expiresIn: '15m',
    });

    res.json({ message: 'Reset token generated', resetToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process forgot password' });
  }
});

// Reset password
app.post('/auth/reset-password', async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET || 'default_secret_key');

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, decoded.userId]);

    res.json({ message: 'Password reset successfully!' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid or expired reset token' });
  }
});

// Add health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Auth service is running' });
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});
