# Real-Time Chat Application

A modern real-time chat application built with **React** frontend and **Node.js + Express + Socket.io** backend. Features instant messaging, online user tracking, typing indicators, and message persistence.

## 🚀 Features

### Core Features (Implemented)
- ✅ **Real-Time Messaging** - Instant message delivery using Socket.io WebSocket
- ✅ **User Management** - Join chat with username, online user list
- ✅ **Message Persistence** - View chat history after page refresh
- ✅ **Message Timestamps** - Each message displays when it was sent
- ✅ **Connection Status** - Visual indicator showing connection state
- ✅ **Clean UI** - Modern, responsive, gradient-based interface
- ✅ **Error Handling** - Graceful error handling for network issues

### Bonus Features (Implemented)
- ✅ **Typing Indicators** - See when other users are typing
- ✅ **Online/Offline Status** - Real-time user status updates
- ✅ **Message Status** - Track message delivery status
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

## 📁 Project Structure

```
real-time-chat/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js       # In-memory message store
│   │   │   └── socket.js         # Socket.io configuration
│   │   ├── controllers/
│   │   │   └── messageController.js    # API controllers
│   │   ├── middleware/
│   │   │   ├── corsMiddleware.js       # CORS configuration
│   │   │   └── errorMiddleware.js      # Error handling
│   │   ├── models/
│   │   │   ├── Message.js       # Message model
│   │   │   └── User.js          # User model
│   │   ├── routes/
│   │   │   ├── messageRoutes.js # API routes
│   │   │   └── healthRoutes.js  # Health check routes
│   │   ├── socket/
│   │   │   └── socketHandler.js # Socket.io event handlers
│   │   ├── utils/
│   │   │   ├── errorHandler.js  # Error handling utilities
│   │   │   └── validators.js    # Input validators
│   │   └── server.js            # Main server file
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MessageItem.js        # Individual message component
│   │   │   ├── MessageList.js        # Messages container
│   │   │   ├── MessageInput.js       # Message input form
│   │   │   ├── OnlineUsers.js        # Online users list
│   │   │   └── ConnectionStatus.js   # Connection indicator
│   │   ├── pages/
│   │   │   ├── LoginPage.js     # Login/join page
│   │   │   └── ChatPage.js      # Main chat page
│   │   ├── services/
│   │   │   ├── socketService.js # Socket.io setup
│   │   │   └── api.js           # REST API calls
│   │   ├── hooks/
│   │   │   └── useSocket.js     # Custom Socket.io hook
│   │   ├── styles/
│   │   │   ├── LoginPage.css
│   │   │   ├── ChatPage.css
│   │   │   ├── MessageList.css
│   │   │   ├── MessageItem.css
│   │   │   ├── MessageInput.css
│   │   │   ├── OnlineUsers.css
│   │   │   └── ConnectionStatus.css
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── App.css
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── README.md (this file)
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client for REST API calls
- **CSS3** - Styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - HTTP server framework
- **Socket.io** - Real-time bidirectional communication
- **UUID** - Unique ID generation
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd real-time-chat
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env if needed (default values work for local development)
# PORT=5000
# FRONTEND_URL=http://localhost:3000
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env if needed (default values work for local development)
# REACT_APP_API_URL=http://localhost:5000
```

## 🎯 Running the Application

### Option 1: Terminal (Recommended for Development)

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```
The backend will start on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm start
```
The frontend will open automatically at `http://localhost:3000`

### Option 2: Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm install -g serve
serve -s build
```

## 📡 API Documentation

### REST Endpoints

#### Send Message
```
POST /api/messages/send
Body: {
  "userId": "unique_user_id",
  "username": "username",
  "text": "message text"
}
Response: { success: true, data: { id, userId, username, text, timestamp, status } }
```

#### Get Messages
```
GET /api/messages/messages?limit=50
Response: { success: true, data: [...], count: number }
```

#### Get Chat History
```
GET /api/messages/history
Response: { success: true, data: [...], count: number }
```

#### Get Online Users
```
GET /api/messages/users/online
Response: { success: true, data: [...], count: number }
```

#### Health Check
```
GET /api/health
Response: { success: true, message: "Server is running" }
```

### Socket.io Events

#### Client → Server Events

| Event | Payload | Description |
|-------|---------|-------------|
| `user:join` | `{ userId, username }` | User joins the chat |
| `message:send` | `{ userId, username, text }` | Send a message |
| `user:typing` | `{ username, isTyping }` | Typing indicator |
| `users:get` | - | Request online users list |
| `messages:get` | `{ limit: number }` | Request message history |

#### Server → Client Events

| Event | Payload | Description |
|-------|---------|-------------|
| `user:joined` | `{ success, message, userId }` | Confirmation of join |
| `message:received` | `{ id, userId, username, text, timestamp, status }` | New message broadcast |
| `users:updated` | `{ users: [...], count }` | Online users list update |
| `user:disconnected` | `{ username, userId }` | User left the chat |
| `user:typing` | `{ username, isTyping }` | User typing indicator |
| `messages:history` | `{ messages: [...], count }` | Chat history |
| `users:list` | `{ users: [...], count }` | Online users list |
| `error` | `{ message }` | Error message |

## 🏗️ Architecture & Design Decisions

### Backend Architecture

1. **Layered Architecture**
   - **Controllers**: Handle HTTP requests and business logic
   - **Models**: Define data structures
   - **Routes**: Define API endpoints
   - **Middleware**: Cross-cutting concerns (CORS, error handling)
   - **Config**: Configuration files and database setup
   - **Utils**: Reusable utilities and validators

2. **Socket.io Event-Driven Architecture**
   - Real-time events handled through Socket.io handlers
   - Separation of concerns between REST API and WebSocket
   - Proper error handling for socket events

3. **In-Memory Database**
   - `MessageStore` class manages messages and users in memory
   - Can be easily replaced with MongoDB, PostgreSQL, or SQLite
   - Provides consistent interface for data access

### Frontend Architecture

1. **Component-Based Architecture**
   - **Pages**: Top-level page components (LoginPage, ChatPage)
   - **Components**: Reusable UI components
   - **Services**: API and Socket.io services
   - **Hooks**: Custom React hooks for logic reuse
   - **Styles**: Modular CSS for each component

2. **State Management**
   - React hooks (useState, useEffect) for local state
   - Custom `useSocket` hook for Socket.io state management
   - Props drilling for component communication

3. **Real-Time Communication**
   - Socket.io for instant message delivery
   - Automatic reconnection handling
   - Separate instances for socket and API communication

### Design Decisions

| Decision | Reason |
|----------|--------|
| React (instead of React Native) | Faster development, easier debugging, full browser support |
| In-memory DB (initially) | Simplicity for MVP, easily upgradeable to persistent DB |
| Socket.io | Wide adoption, automatic fallbacks, production-ready |
| Express.js | Lightweight, flexible, easy to extend |
| Custom hooks | Better code reusability, separation of logic from UI |
| CSS modules | Scoped styles, maintainability, no style conflicts |

## 📝 Assumptions

1. **User Authentication**
   - Simple username-based login without persistent user storage
   - Each session generates a unique user ID
   - No password or real authentication implemented (can be added)

2. **Message Storage**
   - Messages stored in-memory (lost on server restart)
   - For production, use persistent database
   - Suitable for demo/MVP purposes

3. **Scalability**
   - Single-server deployment
   - Does not use Redis for session management
   - For production with multiple servers, implement Redis or database

4. **Security**
   - CORS enabled from frontend URL only
   - No input sanitization for XSS prevention (add helmet.js for production)
   - No rate limiting (add express-rate-limit for production)
   - No message encryption

5. **Browser Compatibility**
   - Modern browsers only (Chrome, Firefox, Safari, Edge)
   - WebSocket support required
   - No IE11 support

## 🔒 Security Considerations

### Implemented
- ✅ CORS middleware with configurable origins
- ✅ Input validation for messages and usernames
- ✅ Error handling without exposing stack traces in production
- ✅ Socket.io validation of all incoming events

### Recommended for Production
- 🔲 Add `helmet.js` for security headers
- 🔲 Implement rate limiting
- 🔲 Add input sanitization (DOMPurify)
- 🔲 Use HTTPS/WSS
- 🔲 Implement real authentication (JWT)
- 🔲 Add message encryption
- 🔲 Use Redis for session management
- 🔲 Add database for persistent storage

## 🗄️ Database Upgrade Path

To upgrade from in-memory to persistent database:

1. **For MongoDB:**
   ```bash
   npm install mongoose
   # Replace MessageStore with Mongoose models
   ```

2. **For PostgreSQL:**
   ```bash
   npm install pg sequelize
   # Replace MessageStore with Sequelize models
   ```

3. **For SQLite:**
   ```bash
   npm install sqlite3 better-sqlite3
   # Replace MessageStore with SQLite queries
   ```

The data models are already defined in `src/models/`, making migration straightforward.

## 📈 Performance Optimization

- ✅ Lazy message loading (limit to last 50 messages)
- ✅ Auto-scroll to latest message
- ✅ Efficient re-renders using React hooks
- ✅ Socket.io connection pooling
- ✅ Gzip compression support

## 🐛 Troubleshooting

### Connection Issues
- Ensure backend is running on correct port (5000)
- Check `REACT_APP_API_URL` environment variable in frontend
- Check browser console for CORS errors

### Messages Not Appearing
- Verify Socket.io connection in browser DevTools
- Check Network tab for WebSocket connection
- Verify backend logs for socket events

### Typing Indicator Not Working
- Ensure `socket.io-client` version matches backend Socket.io version
- Check that typing events are being emitted in browser console

## 🚀 Deployment

### Deploy Backend

**Option 1: Render.com**
```bash
# Push to GitHub repository
# Connect repository to Render
# Set environment variables
# Deploy
```

**Option 2: Railway.app**
```bash
# Push to GitHub repository
# Connect repository to Railway
# Railway auto-detects Node.js project
# Deploy
```

**Option 3: Heroku (legacy)**
```bash
# Create Procfile: web: npm start
# Push to Heroku
# Set environment variables
# Deploy
```

### Deploy Frontend

**Option 1: Vercel (Recommended for React)**
```bash
# Install Vercel CLI: npm i -g vercel
# Run: vercel
# Follow prompts
```

**Option 2: Netlify**
```bash
# Push to GitHub repository
# Connect repository to Netlify
# Set build command: npm run build
# Netlify auto-deploys on push
```

**Option 3: GitHub Pages**
```bash
# Add to package.json: "homepage": "https://username.github.io/repo"
# Add gh-pages dependency: npm install gh-pages --save-dev
# Add deploy scripts to package.json
# Run: npm run deploy
```

## 🎓 Learning Resources

- [Socket.io Documentation](https://socket.io/docs/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MDN Web Docs - WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👥 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## 🤝 Support

For issues or questions, please open an issue in the repository or contact the maintainers.

---

**Happy Chatting! 💬**
