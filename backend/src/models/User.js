export class User {
  constructor(userId, username, socketId) {
    this.userId = userId;
    this.username = username;
    this.socketId = socketId;
    this.status = 'online';
    this.connectedAt = new Date();
    this.typingStatus = false;
    this.lastSeen = new Date();
  }

  toJSON() {
    return {
      userId: this.userId,
      username: this.username,
      status: this.status,
      typingStatus: this.typingStatus,
      lastSeen: this.lastSeen.toISOString()
    };
  }
}
