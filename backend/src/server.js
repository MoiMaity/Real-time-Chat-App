import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import { corsMiddleware } from './middleware/corsMiddleware.js';
import { errorMiddleware, notFoundMiddleware } from './middleware/errorMiddleware.js';
import messageRoutes from './routes/messageRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { setupSocketHandlers } from './socket/socketHandler.js';
import { socketConfig } from './config/socket.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const httpServer = createServer(app);

// Initialize Socket.io
const io = new SocketIOServer(httpServer, socketConfig);

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', healthRoutes);
app.use('/api/messages', messageRoutes);

// Socket.io handlers
setupSocketHandlers(io);

// 404 handler
app.use(notFoundMiddleware);

// Error handler (must be last)
app.use(errorMiddleware);

// Server startup
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║   Real-Time Chat Server is Running                     ║
║   Port: ${PORT}                                              ║
║   Environment: ${process.env.NODE_ENV || 'development'}                       ║
║   WebSocket Transport: Socket.io                       ║
╚════════════════════════════════════════════════════════╝
  `);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\nServer terminating...');
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export { app, httpServer, io };
