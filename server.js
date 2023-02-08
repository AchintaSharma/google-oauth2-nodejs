const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const serverConfig = require("./configs/server.config");
const oauthConfig = require("./configs/googleOAuth.config");

require("./middlewares/passport");

const app = express();
console.log("oauthconfig", oauthConfig)
app.use(
  cookieSession({
    maxAge: oauthConfig.maxAge,
    name: "google-auth-session",
    keys: oauthConfig.cookieKey,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.get("/", (req, res) => {
//   res.json({ message: "You are not logged in" });
// });
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "src/pages/login.html"));
//   res.set("Content-Type", "text/html");
// });

app.get("/failed", (req, res) => {
  res.send("Failed");
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
require('./routes/oauth.route')(app);

app.listen(serverConfig.PORT, () => {
  console.log(`Server running on port ${serverConfig.PORT} `);
});
