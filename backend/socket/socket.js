const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors"); // Add this

const app = express();

// Add Express CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const server = http.createServer(app);
//because socket will give us cors error we need to add origin
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  //io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// ADD THIS PART - Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Socket.io server running on port ${PORT}`);
// });

module.exports = { app, io, server, getReceiverSocketId };
