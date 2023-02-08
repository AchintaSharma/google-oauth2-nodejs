const User = require('../models/user.model');

exports.signup = async (req, res) => {
  app.get("/", (req, res) => {
    res.json({ message: "You are not logged in" });
  });
  
  app.get("/failed", (req, res) => {
    res.send("Failed");
  });
  
  app.get("/success", (req, res) => {
    res.send(`Welcome name of user`);
  });
  
  app.get(
    "/google",
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })
  );
  
  app.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/failed",
    }),
    function (req, res) {
      res.redirect("/success");
    }
  );
}