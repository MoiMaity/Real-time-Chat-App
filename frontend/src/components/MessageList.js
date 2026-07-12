import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import '../styles/MessageList.css';

const MessageList = ({ messages, currentUserId, typingUsers }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="no-messages">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            isOwnMessage={message.userId === currentUserId}
          />
        ))
      )}

      {typingUsers.size > 0 && (
        <div className="typing-indicator">
          <span className="typing-users">
            {Array.from(typingUsers).join(', ')} is typing...
          </span>
          <div className="typing-animation">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
