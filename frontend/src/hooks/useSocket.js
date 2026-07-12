import { useState, useEffect, useRef } from 'react';
import { getSocket } from '../services/socketService';

export const useSocket = (userId, username) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [error, setError] = useState(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const socket = getSocket();

    // Connection handlers
    const handleConnect = () => {
      console.log('Connected to socket server');
      setIsConnected(true);
      setError(null);

      // Emit join event
      if (userId && username) {
        socket.emit('user:join', { userId, username });
      }

      // Request message history
      socket.emit('messages:get', { limit: 50 });

      // Request online users
      socket.emit('users:get');
    };

    const handleDisconnect = () => {
      console.log('Disconnected from socket server');
      setIsConnected(false);
    };

    const handleError = (errorData) => {
      console.error('Socket error:', errorData);
      setError(errorData?.message || 'Connection error');
    };

    // Message handlers
    const handleMessageReceived = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleMessagesHistory = (data) => {
      setMessages(data.messages);
    };

    const handleUsersUpdated = (data) => {
      setOnlineUsers(data.users);
    };

    const handleUsersJoined = (data) => {
      setError(null);
    };

    const handleUserDisconnected = (data) => {
      console.log(`${data.username} left the chat`);
    };

    const handleUserTyping = (data) => {
      if (data.isTyping) {
        setTypingUsers((prev) => new Set(prev).add(data.username));
      } else {
        setTypingUsers((prev) => {
          const updated = new Set(prev);
          updated.delete(data.username);
          return updated;
        });
      }
    };

    // Attach event listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('error', handleError);
    socket.on('message:received', handleMessageReceived);
    socket.on('messages:history', handleMessagesHistory);
    socket.on('users:updated', handleUsersUpdated);
    socket.on('user:joined', handleUsersJoined);
    socket.on('user:disconnected', handleUserDisconnected);
    socket.on('user:typing', handleUserTyping);

    // If already connected, trigger connect handler
    if (socket.connected) {
      handleConnect();
    }

    // Cleanup
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('error', handleError);
      socket.off('message:received', handleMessageReceived);
      socket.off('messages:history', handleMessagesHistory);
      socket.off('users:updated', handleUsersUpdated);
      socket.off('user:joined', handleUsersJoined);
      socket.off('user:disconnected', handleUserDisconnected);
      socket.off('user:typing', handleUserTyping);
    };
  }, [userId, username]);

  const sendMessage = (text) => {
    const socket = getSocket();
    if (socket && isConnected) {
      socket.emit('message:send', {
        userId,
        username,
        text
      });
    }
  };

  const sendTypingIndicator = (isTyping) => {
    const socket = getSocket();
    if (socket && isConnected) {
      socket.emit('user:typing', {
        username,
        isTyping
      });

      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Auto-stop typing after 3 seconds
      if (isTyping) {
        typingTimeoutRef.current = setTimeout(() => {
          socket.emit('user:typing', {
            username,
            isTyping: false
          });
        }, 3000);
      }
    }
  };

  return {
    isConnected,
    messages,
    onlineUsers,
    typingUsers,
    error,
    sendMessage,
    sendTypingIndicator
  };
};
