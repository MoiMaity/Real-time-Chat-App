import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('No response from server');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const messageAPI = {
  sendMessage: (userId, username, text) => {
    return apiClient.post('/messages/send', {
      userId,
      username,
      text
    });
  },

  getMessages: (limit = 50) => {
    return apiClient.get('/messages/messages', {
      params: { limit }
    });
  },

  getChatHistory: () => {
    return apiClient.get('/messages/history');
  },

  getOnlineUsers: () => {
    return apiClient.get('/messages/users/online');
  }
};

export const healthAPI = {
  checkHealth: () => {
    return apiClient.get('/health');
  }
};

export default apiClient;
