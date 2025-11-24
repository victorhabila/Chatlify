const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routes/auth.routes.js");
const messageRoutes = require("./routes/message.routes.js");
const userRoutes = require("./routes/user.routes.js");

const { connectToMongoDB } = require("./db/connectToMongoDB.js");
const { app, server } = require("./socket/socket.js");

const PORT = process.env.PORT || 5000;

dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// For deployment - use a different approach
// Serve static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all handler - use a function instead of direct route
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    // If it's an API route that hasn't been handled, return 404
    return res.status(404).json({ error: "API route not found" });
  }
  // For all other routes, serve the React app
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});

// const express = require("express");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const path = require("path"); //added for deployment

// const authRoutes = require("./routes/auth.routes.js");
// const messageRoutes = require("./routes/message.routes.js");
// const userRoutes = require("./routes/user.routes.js");

// const { connectToMongoDB } = require("./db/connectToMongoDB.js");
// const { app, server } = require("./socket/socket.js");

// const PORT = process.env.PORT || 5000;

// //const __dirname = path.resolve();

// dotenv.config();

// //Note that app is imported from socket which will enable us to get real time messages
// // Middleware
// app.use(express.json()); // To parse JSON request bodies from req.body
// app.use(cookieParser());
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);

// //added for deployment
// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

// server.listen(PORT, () => {
//   connectToMongoDB();
//   console.log(`Server is running on port ${PORT}`);
// });
