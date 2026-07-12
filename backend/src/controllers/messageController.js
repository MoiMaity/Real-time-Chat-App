import { messageStore } from '../config/database.js';
import { Message } from '../models/Message.js';
import { validateMessage, validateUserId, validateUsername } from '../utils/validators.js';
import { AppError, asyncHandler } from '../utils/errorHandler.js';

export const sendMessage = asyncHandler(async (req, res) => {
  const { userId, username, text } = req.body;

  // Validate inputs
  const userIdValidation = validateUserId(userId);
  if (!userIdValidation.valid) {
    throw new AppError(userIdValidation.error, 400);
  }

  const usernameValidation = validateUsername(username);
  if (!usernameValidation.valid) {
    throw new AppError(usernameValidation.error, 400);
  }

  const messageValidation = validateMessage(text);
  if (!messageValidation.valid) {
    throw new AppError(messageValidation.error, 400);
  }

  // Create message
  const message = new Message(userId, username, text);
  const savedMessage = messageStore.addMessage(message);

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: savedMessage,
    timestamp: new Date().toISOString()
  });
});

export const getMessages = asyncHandler(async (req, res) => {
  const { limit = 50 } = req.query;
  const limitNumber = Math.min(parseInt(limit) || 50, 100);

  const messages = messageStore.getMessages(limitNumber);

  res.status(200).json({
    success: true,
    data: messages,
    count: messages.length,
    timestamp: new Date().toISOString()
  });
});

export const getChatHistory = asyncHandler(async (req, res) => {
  const messages = messageStore.getAllMessages();

  res.status(200).json({
    success: true,
    data: messages,
    count: messages.length,
    timestamp: new Date().toISOString()
  });
});

export const getOnlineUsers = asyncHandler(async (req, res) => {
  const users = messageStore.getOnlineUsers();

  res.status(200).json({
    success: true,
    data: users,
    count: users.length,
    timestamp: new Date().toISOString()
  });
});
