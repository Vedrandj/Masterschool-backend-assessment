const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a name"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
