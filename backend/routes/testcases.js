const express = require("express");
const router = express.Router();
const {
  getTestcases,
  createTestcase,
  deleteTestcase,
} = require("../controllers/testcases");

// Define routes for testcases
router.get("/:problemId", getTestcases);
router.post("/", createTestcase);
router.delete("/:id", deleteTestcase);

module.exports = router;