# Real-Time Chat Application Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Option 1: Run Both Backend and Frontend (Recommended)

```bash
# From project root
npm install

# Install dependencies for both backend and frontend
npm run install-all

# Run both servers in parallel (requires concurrently)
npm run dev
```

This will start:
- Backend on `http://localhost:5000`
- Frontend on `http://localhost:3000`

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

### Option 3: Using Docker (Optional)

To be added in future updates for containerized deployment.

## 📚 Documentation

- See [README.md](./README.md) for full project documentation
- See [backend/README.md](./backend/README.md) for backend-specific docs (to be created)
- See [frontend/README.md](./frontend/README.md) for frontend-specific docs (to be created)

## 🔧 Environment Configuration

### Backend (.env)
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

Copy `.env.example` to `.env` in both backend and frontend directories.

## 🧪 Testing the Application

1. **Start both servers** using `npm run dev` or manually
2. **Open browser**: `http://localhost:3000`
3. **Enter username** and join the chat
4. **Open another browser tab/window** and join with different username
5. **Send messages** and see real-time updates
6. **Check online users** in the sidebar
7. **Try typing** to see typing indicators

## 📁 Project Structure

```
.
├── backend/          # Express + Socket.io server
├── frontend/         # React application
├── README.md         # Full documentation
├── SETUP.md          # This file
├── package.json      # Root package.json for monorepo management
└── .gitignore        # Git ignore rules
```

## 🛠️ Development Tools

- **Backend Development**: Use `npm run dev-backend` for auto-reload with nodemon
- **Frontend Development**: Use `npm run dev-frontend` for hot reload with React
- **Production Build**: Use `npm run build` to build optimized frontend bundle
- **Production Start**: Use `npm start-backend` and `npm start-frontend`

## 🚨 Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:

```bash
# Change port in backend/.env
PORT=5001

# Change API URL in frontend/.env
REACT_APP_API_URL=http://localhost:5001
```

### Cannot Find Module
```bash
# Delete node_modules and reinstall
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install-all
```

### Socket Connection Issues
1. Check that backend is running on correct port
2. Verify FRONTEND_URL in backend/.env matches frontend origin
3. Check browser console for CORS errors
4. Ensure WebSocket connection is not blocked by firewall

## 📝 Next Steps

1. ✅ Run the application
2. ✅ Test messaging functionality
3. ✅ Verify real-time updates
4. ✅ Check online users feature
5. ⏳ (Optional) Add database support
6. ⏳ (Optional) Add authentication
7. ⏳ (Optional) Deploy to hosting platform

## 🎯 Features to Explore

- **Real-Time Messaging**: Messages appear instantly without refresh
- **Online Users**: See who's currently in the chat
- **Typing Indicators**: Know when someone is typing
- **Message History**: View previous messages after refresh
- **Responsive Design**: Works on desktop and mobile

## 📞 Support

For detailed API documentation, feature explanations, and architecture details, see [README.md](./README.md).

---

**Ready to chat? Start with `npm run dev`!** 💬
