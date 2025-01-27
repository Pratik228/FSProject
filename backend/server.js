require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { generateToken } = require("./controllers/authController");
const cors = require("cors");
require("./config/passport-setup"); // Import passport configuration

const app = express();
connectDB();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRoutes);

// Google OAuth routes
app.get(
  "/api/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CORS_ORIGIN}/auth`,
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
    });
    res.redirect(`${process.env.CORS_ORIGIN}/home`);
  }
);

app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
