const express = require("express");
const {
  getRawPhotos,
  getPhotoById,
  getPhotoByUsername,
} = require("../controllers/photoController");

const router = express.Router();

router.get("/", getRawPhotos);
router.get("/:id", getPhotoById);
router.get("/user/:username", getPhotoByUsername);

module.exports = router;
