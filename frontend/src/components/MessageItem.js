import React from 'react';
import '../styles/MessageItem.css';

const MessageItem = ({ message, isOwnMessage }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message-item ${isOwnMessage ? 'own-message' : 'other-message'}`}>
      <div className="message-content">
        <div className="message-header">
          <span className="message-username">{message.username}</span>
          <span className="message-time">{formatTime(message.timestamp)}</span>
        </div>
        <div className="message-text">{message.text}</div>
        {message.status && (
          <span className="message-status">{message.status}</span>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
