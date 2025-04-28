require('dotenv').config();  // Load environment variables from .env file

const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  // Get token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1];  // Format: "Bearer <token>"

  if (!token) {
    return res.status(403).json({ error: 'Access denied, no token provided' });
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {  // Use environment variable for secret key
    if (err) {
      return res.status(403).json({ error: 'Access denied, invalid token' });
    }
    req.user = user;  // Store the user info in the request object
    next();  // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateJWT;
