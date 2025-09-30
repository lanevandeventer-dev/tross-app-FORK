const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:8080", "http://localhost:3000"]
    }
  }
}));

// Request logging (only in development)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Enable CORS for Flutter web frontend
app.use(cors({
  origin: [
    'http://localhost:8080',  // Flutter web dev default
    'http://localhost:3000',  // Alternative Flutter port
    'http://127.0.0.1:8080',
    'http://127.0.0.1:3000'
  ],
  credentials: true,
  optionsSuccessStatus: 200 // Support legacy browsers
}));

// Parse JSON bodies with size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes with enhanced logging and validation
app.get('/api/hello', (req, res) => {
  const clientInfo = {
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  };
  
  console.log(`🎉 Hello API called from ${clientInfo.ip} at ${clientInfo.timestamp}`);
  
  res.json({ 
    message: 'Hello, World! from TrossApp Backend!',
    timestamp: clientInfo.timestamp,
    source: 'TrossApp Backend API',
    version: '1.0.0'
  });
});

// Enhanced health check with system info
app.get('/api/health', (req, res) => {
  const healthData = {
    status: 'healthy', 
    service: 'TrossApp Backend',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime(),
    memory: {
      used: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100,
      total: Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100
    },
    node_version: process.version
  };
  
  res.json(healthData);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('💥 Server Error:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for unknown endpoints
app.use((req, res) => {
  console.log(`❌ 404: ${req.method} ${req.originalUrl} from ${req.ip}`);
  res.status(404).json({
    error: 'API endpoint not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    available_endpoints: ['/api/hello', '/api/health']
  });
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('📴 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('📴 SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Only start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`🚀 TrossApp Backend Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🎯 Hello endpoint: http://localhost:${PORT}/api/hello`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  // Handle server errors
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use. Please use a different port.`);
    } else {
      console.error('❌ Server error:', err);
    }
    process.exit(1);
  });
}

module.exports = app;
