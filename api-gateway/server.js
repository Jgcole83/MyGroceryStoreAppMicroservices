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

// Serve static files from the public directory
app.use(express.static(join(__dirname, 'public')));

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

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'login.html'));
});

app.get('/order', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'order.html'));
});

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
