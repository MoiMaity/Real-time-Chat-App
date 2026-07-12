import React, { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import OnlineUsers from '../components/OnlineUsers';
import ConnectionStatus from '../components/ConnectionStatus';
import '../styles/ChatPage.css';

const ChatPage = ({ userId, username, onLogout }) => {
  const { isConnected, messages, onlineUsers, typingUsers, error, sendMessage, sendTypingIndicator } = useSocket(userId, username);
  const [showUserList, setShowUserList] = useState(false);

  const handleSendMessage = (text) => {
    sendMessage(text);
  };

  const handleTyping = (isTyping) => {
    sendTypingIndicator(isTyping);
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="header-content">
          <h1>Real-Time Chat</h1>
          <ConnectionStatus isConnected={isConnected} error={error} />
        </div>
        <div className="header-actions">
          <button
            className="toggle-users-btn"
            onClick={() => setShowUserList(!showUserList)}
          >
            Users ({onlineUsers.length})
          </button>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="chat-container">
        <div className="messages-container">
          <MessageList
            messages={messages}
            currentUserId={userId}
            typingUsers={typingUsers}
          />
        </div>

        {showUserList && (
          <div className="users-sidebar">
            <OnlineUsers users={onlineUsers} currentUsername={username} />
          </div>
        )}
      </div>

      <div className="input-container">
        <MessageInput
          onSendMessage={handleSendMessage}
          onTyping={handleTyping}
          isConnected={isConnected}
        />
      </div>
    </div>
  );
};

export default ChatPage;
