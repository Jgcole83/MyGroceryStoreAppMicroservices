import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';  // Importing JWT for token signing/verification
import cors from 'cors';

const app = express();

// Set port using environment variable or default to 5000
const port = process.env.AUTH_PORT || 3001;

// Middleware
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());

// PostgreSQL connection using environment variables for DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:yourpassword@localhost:5432/grocerydb',
});

// Register (Sign up)
app.post('/auth/register', async (req, res) => {
  const { name, email, password, address, city, state, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, password, email, address, city, state, phone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, username, email',
      [name, hashedPassword, email, address, city, state, phone]
    );

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY || 'default_secret_key', {
      expiresIn: '1h',
    });

    res.status(201).json({ 
      message: 'User registered successfully!', 
      token,
      user: {
        id: user.id,
        name: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login (Sign in)
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY || 'default_secret_key', {
      expiresIn: '1h',  // Set expiration for 1 hour
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Forgot password (Generate reset token)
app.post('/auth/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }

    // Generate a reset token (in a real scenario, you would send it by email)
    const resetToken = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET_KEY || 'default_secret_key', {
      expiresIn: '15m',  // Set expiration to 15 minutes
    });

    res.json({ message: 'Reset token generated', resetToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process forgot password' });
  }
});

// Reset password (Update password using reset token)
app.post('/auth/reset-password', async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET_KEY || 'default_secret_key');

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
  console.log(`Authentication Service running on http://localhost:${port}`);
});
