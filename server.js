const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require('mongoose');
const serverConfig = require("./configs/server.config");
const dbConfig = require('./configs/db.config');
const oauthConfig = require("./configs/googleOAuth.config");

require("./middlewares/passport");

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("### Error while connecting to MongoDB ####");
});
db.once("open", () => {
  console.log("#### Connected to MongoDB ####");
});

app.use(
  cookieSession({
    maxAge: oauthConfig.maxAge,
    name: "google-auth-session",
    keys: ["key1", "key2"]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/oauth.route")(app); 

app.listen(serverConfig.PORT, () => {
  console.log(`Server running on port ${serverConfig.PORT} `);
});

// console.log("oauthconfig", oauthConfig)


// app.get("/", (req, res) => {
//   res.json({ message: "You are not logged in" });
// });
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "src/pages/login.html"));
//   res.set("Content-Type", "text/html");
// });

// app.get("/failed", (req, res) => {
//   res.send("Failed");
// });

// app.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["email", "profile"],
//   })
// );

// app.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/failed",
//   }),
//   function (req, res) {
//     res.redirect("/success");
//   }
// );
// require('./routes/oauth.route')(app);
