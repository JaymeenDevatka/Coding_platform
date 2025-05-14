const express = require("express");
const router = express.Router();
const {
  getProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
} = require("../controllers/problems");

// Define routes for problems
router.get("/", getProblems);
router.get("/:id", getProblemById);
router.post("/", createProblem);
router.put("/:id", updateProblem);
router.delete("/:id", deleteProblem);

module.exports = router;
