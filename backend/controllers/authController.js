const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();

    // Set cookie with user ID
    res.cookie("sessionId", user._id, {
      httpOnly: true, // Prevents client-side access to the cookie
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 3600000, // 1 hour
    });

    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set both JWT and session cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// In authController.js
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    // Add password reset token logic here
    // Send email with reset link
    res.status(200).send({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, resetToken, newPassword } = req.body;
  const MASTER_RESET_TOKEN = process.env.MASTER_RESET_TOKEN;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!resetToken || resetToken !== MASTER_RESET_TOKEN) {
      return res.status(400).json({ error: "Invalid reset token" });
    }

    user.password = newPassword;
    await user.save();

    res.clearCookie("token");
    res.json({
      message:
        "Password reset successful. Please login with your new password.",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
