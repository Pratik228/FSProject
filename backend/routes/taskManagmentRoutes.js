const express = require("express");
const router = express.Router();

router.get("/tasks", async (req, res) => {
  res.send("Tasks");
});

module.exports = router;
