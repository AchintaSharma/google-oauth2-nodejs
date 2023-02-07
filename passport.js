const CLIENT_ID = '398435231371-ojfqb4ciae1qv2saunagdjg0opjho9jb.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const callbackUrl = "http://localhost:5000/google/callback";

const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        callbackURL: callbackUrl,
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));