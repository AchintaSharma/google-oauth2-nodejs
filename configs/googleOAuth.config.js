require("dotenv").config();

//Configs
//Client ID, Client Secret, Redirect URIs are obtained
//after setting up the APIs and Services on Google Cloud
//https://console.cloud.google.com/apis/dashboard
//Cookie keys to encrypt the profile/session info before
//setting it to cookies
//maxAge determines the age of the google OAuth login

module.exports = {
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
  cookieKeys: process.env.COOKIE_KEYS.split(","),
  maxAge: 30 * 24 * 60 * 60 * 1000,
};
