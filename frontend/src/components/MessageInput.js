import React, { useState } from 'react';
import '../styles/MessageInput.css';

const MessageInput = ({ onSendMessage, onTyping, isConnected }) => {
  const [message, text] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    text(value);

    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      onTyping(true);
    } else if (isTyping && value.length === 0) {
      setIsTyping(false);
      onTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && isConnected) {
      onSendMessage(message);
      text('');
      setIsTyping(false);
      onTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <textarea
        className="message-input"
        placeholder={isConnected ? "Type a message..." : "Connecting..."}
        value={message}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        disabled={!isConnected}
        rows="3"
      />
      <button
        type="submit"
        className="send-button"
        disabled={!message.trim() || !isConnected}
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
