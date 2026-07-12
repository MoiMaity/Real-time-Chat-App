import React from 'react';
import '../styles/OnlineUsers.css';

const OnlineUsers = ({ users, currentUsername }) => {
  return (
    <div className="online-users-container">
      <h3 className="users-title">
        Online Users ({users.length})
      </h3>
      <div className="users-list">
        {users.length === 0 ? (
          <p className="no-users">No users online</p>
        ) : (
          users.map((user) => (
            <div key={user.userId} className="user-item">
              <span className="user-status-indicator online"></span>
              <span className="user-name">
                {user.username}
                {user.username === currentUsername && ' (You)'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OnlineUsers;
