export const socketConfig = {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"]
  },
  transports: ["websocket", "polling"]
};
