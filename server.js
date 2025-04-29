// root/server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static HTML files from root
app.use(express.static(__dirname));

// Example: Serve login.html at /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Optional: serve order.html separately
app.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname, 'order.html'));
});

const PORT = 5500; // 
app.listen(PORT, () => {
  console.log(`Root HTML server is running on port ${PORT}`);
});
