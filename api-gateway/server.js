import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
app.use(cors());
app.use(express.json());

// Serve static files from the public directory if it exists
try {
  app.use(express.static(join(__dirname, 'public')));
} catch (error) {
  console.log('Static files not found, continuing without them');
}

// Proxy configuration for product service
const productServiceProxy = createProxyMiddleware({
  target: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/grocery-items': '/api/grocery-items'
  }
});

// Routes
app.use('/api/grocery-items', productServiceProxy);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'API Gateway is running' });
});

// Order endpoint - will serve order.html if it exists
app.get('/order', (req, res) => {
  try {
    res.sendFile(join(__dirname, 'public', 'order.html'));
  } catch (error) {
    res.json({ status: 'Order endpoint available, but order.html not found' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`API Gateway running on http://localhost:${port}`);
});
