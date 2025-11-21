const Conversation = require("../models/conversation.model.js");
const Message = require("../models/message.model.js");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // From protectRoute middleware

    console.log("Sender ID:", senderId);
    console.log("Receiver ID from params:", receiverId);
    console.log("Request user:", req.user);
    console.log("Request params:", req.params);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    //SOCKET IO FUNCTIONALITY WILL GO HERE

    // await conversation.save(); //this will run sequentially in the background
    // await newMessage.save();

    await Promise.all([conversation.save(), newMessage.save()]); // this will run in parallel. It is more optimum

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id; //logged in user id from jwt

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages"); //This means inside this conversations, dont just give me the array reference, but the messages one by one

    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
module.exports = { sendMessage, getMessages };
