import React from 'react';
import '../styles/ConnectionStatus.css';

const ConnectionStatus = ({ isConnected, error }) => {
  return (
    <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
      <span className="status-indicator"></span>
      <span className="status-text">
        {isConnected ? 'Connected' : 'Connecting...'}
      </span>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default ConnectionStatus;
