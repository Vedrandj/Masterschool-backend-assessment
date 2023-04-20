//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const favoritesPhotos = require("../models/favoritePhotoModel");

const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await favoritesPhotos.find({ user: req.user.id });

  return res.status(200).json(favorites);
});

const setFavorite = asyncHandler(async (req, res) => {
  const { url, description, username } = req.body;
  const { id } = req.user;

  if (!url || !description || !username) {
    res.status(400);
    throw new Error("Please fill all text fields");
  }

  const newFavoritePhoto = await FavoritePhotos.create({
    user: id,
    url,
    username,
    description,
  });

  return res.status(201).json(newFavoritePhoto._id);
});

const updateFavorite = asyncHandler(async (req, res) => {
  const photo = await FavoritePhotos.findById(req.params.id);

  if (!photo) {
    res.status(400);
    throw new Error("Photo not found");
  }

  if (photo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPhoto = await FavoritePhotos.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  return res.status(200).json(updatedPhoto);
});

const deleteFavorite = asyncHandler(async (req, res) => {
  const photo = await FavoritePhotos.findById(req.params.id);

  if (!photo) {
    res.status(400);
    throw new Error("Photo not found");
  }

  if (photo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await photo.remove();

  return res.status(200).json(req.params.id);
});

module.exports = {
  getFavorites,
  setFavorite,
  updateFavorite,
  deleteFavorite,
};
