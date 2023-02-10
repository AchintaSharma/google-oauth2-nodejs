require('dotenv').config();

module.exports = {
  clientID : process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret : process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri : process.env.GOOGLE_OAUTH_REDIRECT_URI,
  cookieKeys : process.env.COOKIE_KEYS,
  maxAge: 30 * 24 * 60 * 60 * 1000
}