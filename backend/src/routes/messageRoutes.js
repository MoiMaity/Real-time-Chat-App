import express from 'express';
import {
  sendMessage,
  getMessages,
  getChatHistory,
  getOnlineUsers
} from '../controllers/messageController.js';

const router = express.Router();

// Message endpoints
router.post('/send', sendMessage);
router.get('/messages', getMessages);
router.get('/history', getChatHistory);
router.get('/users/online', getOnlineUsers);

export default router;
