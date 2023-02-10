const User = require("../models/user.model");
const passport = require("passport");
const cookieSession = require("cookie-session");
const path = require('path')
require("../middlewares/passport");

exports.login = (req, res) => {
  console.log("req user in login:", req.user);
  res.sendFile(path.join(__dirname, "../src/pages/login.html"));
  res.set("Content-Type", "text/html");
};

exports.home = (req, res) => {
  console.log("req in home:", req.user);
  // res.sendFile(path.join(__dirname, "../src/pages/home.html"));
  // res.set("Content-Type", "text/html");
  // return;
  return res.send(`Hello ${req.user.displayName}`);
};

exports.authenticate = passport.authenticate("google", {
  scope: ["email", "profile"],
});

exports.callbackAuthenticate = passport.authenticate("google", {
  successRedirect: "/home",
  failureRedirect: "/",
});

exports.logout = (req, res) => {
  console.log("req in logout:", req.user);
  req.session = null;
  req.logout();
  res.redirect("/");
};
