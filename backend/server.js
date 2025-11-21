const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes.js");
const messageRoutes = require("./routes/message.routes.js");
const userRoutes = require("./routes/user.routes.js");

const { connectToMongoDB } = require("./db/connectToMongoDB.js");

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// Middleware
app.use(express.json()); // To parse JSON request bodies from req.body
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.listen(5000, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
