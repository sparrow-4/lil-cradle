require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Security & Performance Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // Allow images to be loaded cross-origin
}));
app.use(compression());
app.use(express.json({ limit: '5mb' }));

// Rate Limiting: Max 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

app.use(cors({ 
  origin: [
    'http://localhost:4200', 
    'http://localhost:4300', 
    /\.vercel\.app$/,
    'https://lil-cradle.vercel.app'
  ],
  credentials: true 
}));

// Serve uploaded images as static files
app.use('/uploads', express.static(uploadsDir));

// Also serve the Angular public images folder
app.use('/images', express.static(path.join(__dirname, '../src/assets/images')));

// API Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/site-content', require('./routes/site-content'));
app.use('/api/orders', require('./routes/orders'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Lil Cradle API running on http://localhost:${PORT}`);
      console.log(`📦 Endpoints:`);
      console.log(`   GET  /api/products`);
      console.log(`   GET  /api/site-content`);
      console.log(`   GET  /api/orders`);
      console.log(`   GET  /api/health`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
