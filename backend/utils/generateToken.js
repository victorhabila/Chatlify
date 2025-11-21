const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // Accessible only by web server prevents XSS attacks cross-site scripting attacks
    sameSite: "strict", //CSRF protection
    secure: process.env.NODE_ENV !== "development", // Set to false in development
  });
};
module.exports = generateTokenAndSetCookie;
