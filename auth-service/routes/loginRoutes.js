// Ensure the middleware path is correct (relative to your file structure)
const authenticateJWT = require('../api-gateway/middleware/authenticateJWT');

// Ensure the path to your User model is correct (relative to your file structure)
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./models/User');  // Adjust the path to your User model
const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';  // Store securely in environment variables

const router = express.Router();

// POST /login route for handling login and generating JWT token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database (using async/await for handling database calls)
    const user = await User.findByEmail(email);  // Assuming `findByEmail` is an async function

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, name: user.name },
      secretKey,
      { expiresIn: '1h' }  // Token expires in 1 hour
    );

    // Respond with success message and token
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// If you want to use the middleware later, attach it like this
// router.use(authenticateJWT);  // If needed for other routes

module.exports = router;
