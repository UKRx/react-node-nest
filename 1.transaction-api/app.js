// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const transferRoutes = require('./routes/transferRoutes');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', transferRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Transfer API',
    endpoints: {
      create: 'POST /api/transfers',
      update: 'PUT /api/transfers/:id',
      get: 'GET /api/transfers/:id'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found'
  });
});

// Start the server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}`);
  });
}

module.exports = app;
