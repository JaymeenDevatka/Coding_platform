const {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
} = require("../models/problems");

// Get all problems
const getProblems = async (req, res) => {
  try {
    const problems = await getAllProblems();
    res.json(problems);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get problem by ID
const getProblemByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await getProblemById(id);
    res.json(problem);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create a new problem
const createProblemHandler = async (req, res) => {
  const { title, description, difficulty, total_points } = req.body;
  try {
    const problem = await createProblem(title, description, difficulty, total_points);
    res.json(problem);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update an existing problem
const updateProblemHandler = async (req, res) => {
  const { id } = req.params;
  const { title, description, difficulty, total_points } = req.body;
  try {
    const updatedProblem = await updateProblem(id, title, description, difficulty, total_points);
    res.json(updatedProblem);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete a problem
const deleteProblemHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProblem(id);
    res.json({ message: "Problem deleted successfully!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getProblems,
  getProblemByIdHandler,
  createProblemHandler,
  updateProblemHandler,
  deleteProblemHandler,
};