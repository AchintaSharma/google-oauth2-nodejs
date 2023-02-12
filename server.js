//Dependencies
const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require("mongoose");

//Configs
const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");
const oauthConfig = require("./configs/googleOAuth.config");

//Importing the passport script and passing the passport obj imported
require("./middlewares/passport")(passport);

//Init app
const app = express();

//Connect to DB
mongoose.set("strictQuery", false);
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("### Error while connecting to MongoDB ####");
});
db.once("open", () => {
  console.log("#### Connected to MongoDB ####");
});

//Use cookie session middleware
app.use(
  cookieSession({
    maxAge: oauthConfig.maxAge,
    name: "google-auth-session",
    keys: oauthConfig.cookieKeys,
  })
);

//Use passport init and passport session
app.use(passport.initialize());
app.use(passport.session());

//Plug OAuth route
require("./routes/oauth.route")(app);

//Server Listen
app.listen(serverConfig.PORT, () => {
  console.log(`Server running on port ${serverConfig.PORT} `);
});
