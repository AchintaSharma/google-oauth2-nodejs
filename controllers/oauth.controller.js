const passport = require("passport");
const path = require("path");

//Login controller will send the login.html file
const login = (req, res) => {
  res.sendFile(path.join(__dirname, "../src/pages/login.html"));
  res.set("Content-Type", "text/html");
};

//Home controller will send the user information for further use
const home = (req, res) => {
  return res.send({
    name: req.user.name,
    email: req.user.email,
    photo: req.user.photo,
  });
};

//Authenticate controller will call passport for authentication
//and the strategy passed will be google. The scope defines that
//we will have access to email and profile details.
const authenticate = passport.authenticate("google", {
  scope: ["email", "profile"],
});

//This controller handles the callback of the Google Oauth
//upon successful redirection, it will take to home. To
//handle any failure, a middleware shall be added to the
//callback route.
const callbackAuthenticate = (req, res) => {
  //Successful authentication
  res.redirect("/home");
};

//This controller will terminate the session and redirect
//the user back to the login page
const logout = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
};

//Exporting the controllers
module.exports = {
  login,
  home,
  authenticate,
  callbackAuthenticate,
  logout,
};
