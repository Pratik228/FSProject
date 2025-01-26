const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.headers.authorization?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) throw new Error();
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: "Authentication required" });
  }
};

module.exports = auth;
