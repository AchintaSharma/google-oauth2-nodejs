const passport = require("passport");
const mongoose = require('mongoose');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const oauthConfig = require("../configs/googleOAuth.config");
const User = require('../models/user.model');

passport.use(
  new GoogleStrategy(
    {
      clientID: oauthConfig.clientID,
      clientSecret: oauthConfig.clientSecret,
      callbackURL: oauthConfig.redirectUri,
      // passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      return done(null, profile);

      // console.log("access token, ", accessToken);
      // console.log("refresh token, ", refreshToken);

      console.log("profile:", profile);
      // User.findOne({ googleId: profile.id }).then((existingUser) => {
      //   if (existingUser) {
      //     // we already have a record with the given profile ID
      //     done(null, existingUser);
      //   } else {
      //     // we don't have a user record with this ID, make a new record!
      //     new User({
      //      googleId: profile.id,
      //     })
      //       .save()
      //       .then((user) => done(null, user));
      //   }
      // });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
  // User.findById(id)
  // .then((user) => {
  //   console.log("User:", user);
  //   done(null, user);
  // })
  // .catch(err => {
  //   console.error(err);
  // });
});
