const router = require("express").Router();
const auth = require("../middleware/auth");
const { upload } = require("../utils/upload");
const errorHandler = require("../middleware/error");
const {
  createPost,
  getPosts,
  deletePost,
} = require("../controllers/postController");

router.use(auth);
router.post("/", upload.single("image"), createPost);
router.get("/", getPosts);
router.delete("/:id", deletePost);

router.use(errorHandler);

module.exports = router;
