import { v4 as uuidv4 } from 'uuid';

export class Message {
  constructor(userId, username, text) {
    this.id = uuidv4();
    this.userId = userId;
    this.username = username;
    this.text = text;
    this.timestamp = new Date();
    this.status = 'pending'; // pending, delivered, read
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      username: this.username,
      text: this.text,
      timestamp: this.timestamp.toISOString(),
      status: this.status
    };
  }
}
