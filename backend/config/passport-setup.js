const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

const callbackURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.BACKEND_URL}/api/auth/google/callback`
    : "http://localhost:5004/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in our db
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        // If not, create a new user in our db
        const newUser = await new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        }).save();
        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;
