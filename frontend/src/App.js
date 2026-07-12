import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import { connectSocket, disconnectSocket } from './services/socketService';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  // Initialize socket on mount
  useEffect(() => {
    connectSocket();

    return () => {
      // Don't disconnect on unmount, keep connection alive
      // disconnectSocket();
    };
  }, []);

  const handleLogin = (newUserId, newUsername) => {
    setUserId(newUserId);
    setUsername(newUsername);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    disconnectSocket();
    setIsLoggedIn(false);
    setUserId(null);
    setUsername(null);
  };

  return (
    <div className="app">
      {isLoggedIn ? (
        <ChatPage userId={userId} username={username} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
