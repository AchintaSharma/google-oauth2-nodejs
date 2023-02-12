//Use Google Auth Strategy from passport.js
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");
const oauthConfig = require("../configs/googleOAuth.config");

//Export function which takes in the passport object and
//requests google for authentication
module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: oauthConfig.clientID,
        clientSecret: oauthConfig.clientSecret,
        callbackURL: oauthConfig.redirectUri,
      },
      async function (accessToken, refreshToken, profile, done) {
        console.log("Trying to access google account ", profile);
        try {
          //Find user in db
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            console.log("User info exists in database.");
            done(null, user);
          } else {
            //create new user if it doesn't exist
            const newUser = {
              googleId: profile.id,
              name: profile.displayName,
              photo: profile.photos[0].value,
              email: profile.emails[0].value,
            };
            user = await User.create(newUser);
            console.log("User info added to database.");
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  //Serialize user
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  //Deserialize user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
