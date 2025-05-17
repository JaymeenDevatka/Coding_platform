const {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
} = require('../models/problems');

const getProblems = async (req, res) => {
  try {
    const problems = await getAllProblems();
    res.json(problems);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getProblemByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await getProblemById(id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createProblemHandler = async (req, res) => {
  const { title, description, difficulty, total_points } = req.body;
  try {
    const problem = await createProblem(title, description, difficulty, total_points);
    res.status(201).json(problem);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

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

const deleteProblemHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProblem(id);
    res.json({ message: 'Problem deleted successfully!' });
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