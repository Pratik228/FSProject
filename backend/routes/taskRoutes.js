const router = require("express").Router();
const auth = require("../middleware/auth");
const errorHandler = require("../middleware/error");
const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

router.use(auth);
router.post("/", createTask);
router.get("/", getTasks);
router.patch("/:id/status", updateTaskStatus);
router.delete("/:id", deleteTask);

router.use(errorHandler);

module.exports = router;
