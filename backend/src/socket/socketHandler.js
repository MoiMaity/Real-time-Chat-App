import { messageStore } from '../config/database.js';
import { User } from '../models/User.js';
import { Message } from '../models/Message.js';
import { validateMessage, validateUsername } from '../utils/validators.js';

export const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // User joins
    socket.on('user:join', (data) => {
      try {
        const { userId, username } = data;

        // Validate username
        const validation = validateUsername(username);
        if (!validation.valid) {
          socket.emit('error', { message: validation.error });
          return;
        }

        // Add user to store
        messageStore.addUser(userId, username, socket.id);

        // Send confirmation
        socket.emit('user:joined', {
          success: true,
          message: `Welcome ${username}`,
          userId,
          timestamp: new Date().toISOString()
        });

        // Notify all users
        const onlineUsers = messageStore.getOnlineUsers();
        io.emit('users:updated', {
          users: onlineUsers,
          count: onlineUsers.length,
          timestamp: new Date().toISOString()
        });

        console.log(`${username} joined the chat`);
      } catch (error) {
        socket.emit('error', { message: 'Failed to join chat' });
        console.error('Error in user:join:', error);
      }
    });

    // Send message
    socket.on('message:send', (data) => {
      try {
        const { userId, username, text } = data;

        // Validate message
        const validation = validateMessage(text);
        if (!validation.valid) {
          socket.emit('error', { message: validation.error });
          return;
        }

        // Create and store message
        const message = new Message(userId, username, text);
        const savedMessage = messageStore.addMessage(message);

        // Broadcast to all users
        io.emit('message:received', {
          ...savedMessage,
          timestamp: new Date(savedMessage.timestamp).toISOString()
        });

        console.log(`Message from ${username}: ${text}`);
      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' });
        console.error('Error in message:send:', error);
      }
    });

    // Typing indicator
    socket.on('user:typing', (data) => {
      try {
        const { username, isTyping } = data;
        socket.broadcast.emit('user:typing', {
          username,
          isTyping,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error in user:typing:', error);
      }
    });

    // Get online users
    socket.on('users:get', () => {
      try {
        const onlineUsers = messageStore.getOnlineUsers();
        socket.emit('users:list', {
          users: onlineUsers,
          count: onlineUsers.length,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        socket.emit('error', { message: 'Failed to get users' });
        console.error('Error in users:get:', error);
      }
    });

    // Get message history
    socket.on('messages:get', (data = {}) => {
      try {
        const { limit = 50 } = data;
        const messages = messageStore.getMessages(limit);
        socket.emit('messages:history', {
          messages,
          count: messages.length,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        socket.emit('error', { message: 'Failed to get messages' });
        console.error('Error in messages:get:', error);
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      try {
        const user = messageStore.getUserBySocketId(socket.id);
        if (user) {
          messageStore.removeUser(socket.id);
          console.log(`${user.username} disconnected`);

          // Notify all users
          const onlineUsers = messageStore.getOnlineUsers();
          io.emit('users:updated', {
            users: onlineUsers,
            count: onlineUsers.length,
            timestamp: new Date().toISOString()
          });

          io.emit('user:disconnected', {
            username: user.username,
            userId: user.userId,
            timestamp: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('Error in disconnect:', error);
      }
    });

    // Error handler
    socket.on('error', (error) => {
      console.error('Socket error:', error);
      socket.emit('error', { message: 'An error occurred' });
    });
  });
};
