require("dotenv").config();

//Express server connection config
module.exports = {
  PORT: process.env.NODE_ENV !== "production" ? 5000 : process.env.PORT,
};
