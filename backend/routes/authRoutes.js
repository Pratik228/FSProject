const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const auth = require("../middleware/auth");
const errorHandler = require("../middleware/error");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", auth, (req, res) => {
  res.json(req.user);
});

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.clearCookie("sessionId");
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  });
});

router.use(errorHandler);

module.exports = router;
