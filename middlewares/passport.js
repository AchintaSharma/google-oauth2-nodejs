// const clientID = process.env.GOOGLE_OAUTH_CLIENT_ID;
// const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
// const callbackUrl = process.env.GOOGLE_OAUTH_REDIRECT_URI;

const oauthConfig = require('../configs/googleOAuth.config');
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: oauthConfig.clientID,
      clientSecret: oauthConfig.clientSecret,
      callbackURL: oauthConfig.callbackURL,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
