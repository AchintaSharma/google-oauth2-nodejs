const oauthController = require('../controllers/oauth.controller');
const passport = require('../middlewares/passport');
const path = require('path');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../src/pages/login.html"));
    res.set("Content-Type", "text/html");
  });

  app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/pages/home.html"));
    res.set("Content-Type", "text/html");
    return;
  });
}