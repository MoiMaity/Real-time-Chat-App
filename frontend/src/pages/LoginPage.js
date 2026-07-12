import React, { useState } from 'react';
import '../styles/LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const generateUserId = () => {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError('Username cannot be empty');
      return;
    }

    if (trimmedUsername.length > 50) {
      setError('Username must be less than 50 characters');
      return;
    }

    const userId = generateUserId();
    onLogin(userId, trimmedUsername);
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Real-Time Chat</h1>
          <p>Join the conversation</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="form-input"
              placeholder="Enter your username"
              value={username}
              onChange={handleChange}
              autoFocus
              maxLength="50"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button">
            Join Chat
          </button>
        </form>

        <div className="info-section">
          <h3>Features</h3>
          <ul>
            <li>✓ Real-time messaging</li>
            <li>✓ See online users</li>
            <li>✓ Typing indicators</li>
            <li>✓ Message timestamps</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
