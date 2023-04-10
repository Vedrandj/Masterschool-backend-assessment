const express = require("express");
const {
  getRawPhotos,
  getPhotoById,
} = require("../controllers/photoController");

const router = express.Router();

router.get("/", getRawPhotos);
router.get("/:id", getPhotoById);
module.exports = router;
