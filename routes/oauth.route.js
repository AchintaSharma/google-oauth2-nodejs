const oauthController = require("../controllers/oauth.controller");
const isAuthorized = require('../middlewares/isAuthorized');
const passport = require("passport");

module.exports = (app) => {
  app.get("/", oauthController.login);
  app.get("/auth/google", oauthController.authenticate);
  app.get("/auth/google/callback",oauthController.callbackAuthenticate);
  app.get("/home", isAuthorized, oauthController.home);
  app.get("/logout", oauthController.logout);
};

/*
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/home', (req, res) => {
    res.send('Home Page');
    res.sendFile(path.join(__dirname, "../src/pages/home.html"));
    res.set("Content-Type", "text/html");
    return;
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../src/pages/login.html"));
    res.set("Content-Type", "text/html");
  });

  app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/pages/home.html"));
    res.set("Content-Type", "text/html");
    return;
  }); */
