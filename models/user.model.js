const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  emailId: String,
  isValidSession: {
    type: Boolean,
    default: false
  }
}, {versionKey: false, timestamps: true});
