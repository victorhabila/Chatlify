const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/message.controller.js");
const protectRoute = require("../middleware/protectRoute.js");

const router = express.Router();

router.get("/:id", protectRoute, getMessages); // this will get the messages between two users
router.post("/send/:id", protectRoute, sendMessage); // id is the receiver's user ID, protectRoute middleware to authenticate user

module.exports = router;
