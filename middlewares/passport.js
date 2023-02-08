// const clientID = process.env.GOOGLE_OAUTH_CLIENT_ID;
// const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
// const callbackUrl = process.env.GOOGLE_OAUTH_REDIRECT_URI;

const oauthConfig = require("../configs/googleOAuth.config");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.email);
});

// passport.deserializeUser(function (email, done) {
//   done(null, user);
// });

passport.deserializeUser((id, done) => {
  User.findOne(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: oauthConfig.clientID,
      clientSecret: oauthConfig.clientSecret,
      callbackURL: oauthConfig.redirectUri,
      passReqToCallback: true,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token, ", accessToken);
      console.log("refresh token, ", refreshToken);

      console.log("profile:", profile);
      User.findOne({ email: profile.email }).then((existingUser) => {
        if (existingUser) {
          // we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record!
          new User({
            email: profile.email,
            name: profile.name,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
