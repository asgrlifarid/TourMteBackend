const express = require("express");
const { upload } = require("../config/cloudinaryConfig");
const {
  editParks,
  getAllParks,
  deleteParks,
  postParks,
  getParksById,
} = require("../controllers/parksController");

const router = express.Router();

router.get("/", getAllParks);
router.get("/:id", getParksById);
router.delete("/:id", deleteParks);
router.post("/", upload.single("image"), postParks);
router.put("/:id", upload.single("image"), editParks);

module.exports = router;
