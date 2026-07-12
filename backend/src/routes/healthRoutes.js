import express from 'express';

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Real-time Chat API Server',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

export default router;
