const mongoose = require("mongoose");
/*
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  accessToken: { 
    type: String, 
    required: true 
  },
});
*/
const userSchema = new mongoose.Schema({
  googleId: String
});

module.exports = mongoose.model("User", userSchema);

/*

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  isValidSession: {
    type: Boolean,
    default: false
  }
}, {versionKey: false, timestamps: true});
*/
