export const validateMessage = (message) => {
  if (!message || typeof message !== 'string') {
    return { valid: false, error: 'Message must be a non-empty string' };
  }

  if (message.trim().length === 0) {
    return { valid: false, error: 'Message cannot be empty' };
  }

  if (message.length > 5000) {
    return { valid: false, error: 'Message is too long (max 5000 characters)' };
  }

  return { valid: true };
};

export const validateUsername = (username) => {
  if (!username || typeof username !== 'string') {
    return { valid: false, error: 'Username must be a non-empty string' };
  }

  if (username.trim().length === 0) {
    return { valid: false, error: 'Username cannot be empty' };
  }

  if (username.length > 50) {
    return { valid: false, error: 'Username is too long (max 50 characters)' };
  }

  return { valid: true };
};

export const validateUserId = (userId) => {
  if (!userId || typeof userId !== 'string') {
    return { valid: false, error: 'User ID must be a non-empty string' };
  }

  return { valid: true };
};
