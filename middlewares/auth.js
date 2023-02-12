const passport = require("passport");

//Protect the routes if google oAuth is not used.
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("Authenticated");
    return next();
  } else {
    console.log("User not authenticated. Redirecting to login...");
    res.status(401).send({
      message: "Not Authenticated. Please login.",
    });
  }
};

//Handle if google oauth encounters any failure and
//redirect to login page
const oauthFailRedirect = passport.authenticate("google", {
  failureRedirect: "/",
});

//Export middlewares
module.exports = {
  isAuthenticated,
  oauthFailRedirect,
};
