const mongoose = require("mongoose");

//Mongoose schema to store the user information on db
const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

//Export mongoose model for user schema
module.exports = mongoose.model("User", userSchema);
