const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // if (!decoded) {
    //   return res.status(401).json({ error: "Unauthorized: Invalid token" });
    // }

    const user = await User.findById(decoded.userId).select("-password"); // Exclude password field
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    req.user = user;
    next(); // Proceed to the next middleware or route handler, if authentication is successful. in message.routes.js class, after protectRoute, sendMessage function will be called
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = protectRoute;
