const express = require("express");
const router = express.Router();
const {
  getFavorites,
  setFavorite,
  updateFavorite,
  deleteFavorite,
} = require("../controllers/favoritesController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getFavorites);
router.post("/", protect, setFavorite);
router.put("/:id", protect, updateFavorite);
router.delete("/:id", protect, deleteFavorite);

module.exports = router;
