const express = require("express");
const {
  postNews,
  editNews,
  getAllNews,
  getNewsById,
  deleteNews,
} = require("../controllers/newsController");
const { upload } = require("../config/cloudinaryConfig");

const router = express.Router();

router.post("/", upload.single("image"), postNews);
router.put("/:id", upload.single("image"), editNews);
router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.delete("/:id", deleteNews);

module.exports = router;
