// routes/AuthRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// === Mock database (temporary) ===
const mockDatabase = {
  users: [
    {
      email: 'testuser@example.com',
      password: bcrypt.hashSync('password123', 10), // hashed password
      name: 'Test User',
    },
  ],
};

// === POST /register ===
router.post('/register', async (req, res) => {
  const { name, email, password, address, city, state, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  // Check if user already exists
  const existingUser = mockDatabase.users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  // Hash password and save new user
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { name, email, password: hashedPassword, address, city, state, phone };
  mockDatabase.users.push(newUser);

  res.status(201).json({ message: 'Registration successful' });
});

// === POST /login ===
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = mockDatabase.users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT Token
  const token = jwt.sign(
    { email: user.email, name: user.name },
    'your-secret-key', // Replace this secret key with a real environment variable in production
    { expiresIn: '1h' }
  );

  res.status(200).json({ message: 'Login successful', token });
});

module.exports = router;
