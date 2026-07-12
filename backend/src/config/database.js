// In-memory database for messages
// In production, replace with MongoDB, PostgreSQL, or SQLite
export class MessageStore {
  constructor() {
    this.messages = [];
    this.users = new Map();
  }

  addMessage(message) {
    const newMessage = {
      id: message.id,
      userId: message.userId,
      username: message.username,
      text: message.text,
      timestamp: message.timestamp,
      status: 'delivered'
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  getMessages(limit = 50) {
    // Return last N messages
    return this.messages.slice(-limit).map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp).toISOString()
    }));
  }

  getAllMessages() {
    return this.messages.map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp).toISOString()
    }));
  }

  addUser(userId, username, socketId) {
    this.users.set(socketId, {
      userId,
      username,
      socketId,
      status: 'online',
      connectedAt: new Date()
    });
  }

  removeUser(socketId) {
    this.users.delete(socketId);
  }

  getOnlineUsers() {
    return Array.from(this.users.values()).map(user => ({
      userId: user.userId,
      username: user.username,
      status: user.status
    }));
  }

  getUserBySocketId(socketId) {
    return this.users.get(socketId);
  }
}

export const messageStore = new MessageStore();
