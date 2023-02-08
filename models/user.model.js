const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  isValidSession: {
    type: Boolean,
    default: false
  }
}, {versionKey: false, timestamps: true});
