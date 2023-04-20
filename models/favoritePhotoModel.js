const mongoose = require("mongoose");

const favoritePhotosSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please add user id"],
    ref: "User",
  },
  url: {
    type: String,
    required: [true, "Please add a password"],
  },
  // String is shorthand for {type: String}
  description: String,
  username: {
    type: String,
    required: [true, "Please add a username of the author"],
  },
});

module.exports = mongoose.model("favoritesPhotos", favoritePhotosSchema);
