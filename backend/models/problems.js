const pool = require("../config/db");

// Get all problems
const getAllProblems = async () => {
  const result = await pool.query("SELECT * FROM problems");
  return result.rows;
};

// Get problem by ID
const getProblemById = async (id) => {
  const result = await pool.query("SELECT * FROM problems WHERE id = $1", [id]);
  return result.rows[0];
};

// Create a new problem
const createProblem = async (title, description, difficulty, total_points) => {
  const result = await pool.query(
    "INSERT INTO problems (title, description, difficulty, total_points) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, description, difficulty, total_points]
  );
  return result.rows[0];
};

// Update an existing problem
const updateProblem = async (id, title, description, difficulty, total_points) => {
  const result = await pool.query(
    "UPDATE problems SET title = $1, description = $2, difficulty = $3, total_points = $4 WHERE id = $5 RETURNING *",
    [title, description, difficulty, total_points, id]
  );
  return result.rows[0];
};

// Delete a problem
const deleteProblem = async (id) => {
  await pool.query("DELETE FROM problems WHERE id = $1", [id]);
};

module.exports = {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
};