import express from 'express';
import dotenv from 'dotenv';
import orderRoutes from './routes/orderRoutes.js'; // Assuming you have the routes defined here
import cors from 'cors';  // For enabling CORS
import { Pool } from 'pg';  // PostgreSQL client for querying the database
import authenticateJWT from './middleware/authenticateJWT.js';



dotenv.config();  // Load environment variables

const app = express();

// Set up CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3002', // Allow CORS from frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));  // Apply the CORS configuration

// Middleware to parse JSON requests
app.use(express.json());

// Set up PostgreSQL connection using environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:yourpassword@localhost:5432/grocerydb',
});

// Mount API routes (order routes will be under /api)
app.use('/api', authenticateJWT, orderRoutes);  // Apply JWT authentication middleware to order routes

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Order service is running' });
});

// Start the server on the specified port
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
