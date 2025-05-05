import express from 'express';
import jwt from 'jsonwebtoken';
import User from './models/User';  // Ensure the correct path to your User model
import bcrypt from 'bcryptjs';
import { authenticateJWT } from '../api-gateway/middleware/authenticateJWT';  // Adjust path if necessary

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';  // Secure this in your environment variables
const router = express.Router();

// POST /login route for handling login and generating JWT token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findByEmail(email);  // Assuming `findByEmail` is an async function

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the hashed password from the DB with the provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, name: user.name },
      secretKey,
      { expiresIn: '1h' }  // Token expires in 1 hour
    );

    // Respond with success message and token
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /register route for handling user registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email is already registered
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = { name, email, password: hashedPassword };

    // Store the user in the database (using your User model's create method)
    await User.create(newUser);

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Example of protected route using JWT authentication middleware
router.get('/protected', authenticateJWT, (req, res) => {
  // If the token is valid, this code will execute
  res.status(200).json({ message: 'This is a protected route' });
});

module.exports = router;
