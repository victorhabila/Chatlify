const User = require("../models/user.model");

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }); // this means find all users except the one NOT EQUAL($ne) to the loggedin user or ourselves
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUserForSidebar", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { getUsersForSidebar };
