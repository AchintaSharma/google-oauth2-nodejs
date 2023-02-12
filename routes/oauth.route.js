const oauthController = require("../controllers/oauth.controller");
const { isAuthenticated, oauthFailRedirect } = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/", oauthController.login);
  app.get("/auth/google", oauthController.authenticate);
  app.get(
    "/auth/google/callback",
    oauthFailRedirect,
    oauthController.callbackAuthenticate
  );
  app.get("/home", isAuthenticated, oauthController.home);
  app.get("/logout", oauthController.logout);
};
