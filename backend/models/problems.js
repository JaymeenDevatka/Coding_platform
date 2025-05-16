const pool = require('../config/db');

// Get all problems
const getAllProblems = async () => {
  const [rows] = await pool.query('SELECT * FROM problems');
  return rows;
};

// Get a problem by ID
const getProblemById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM problems WHERE id = ?', [id]);
  return rows[0];
};

// Create a problem
const createProblem = async (title, description, difficulty, total_points) => {
  const [result] = await pool.query(
    'INSERT INTO problems (title, description, difficulty, total_points) VALUES (?, ?, ?, ?)',
    [title, description, difficulty, total_points]
  );
  return { id: result.insertId, title, description, difficulty, total_points };
};

// Update a problem
const updateProblem = async (id, title, description, difficulty, total_points) => {
  await pool.query(
    'UPDATE problems SET title = ?, description = ?, difficulty = ?, total_points = ? WHERE id = ?',
    [title, description, difficulty, total_points, id]
  );
  return { id, title, description, difficulty, total_points };
};

// Delete a problem
const deleteProblem = async (id) => {
  await pool.query('DELETE FROM problems WHERE id = ?', [id]);
};

module.exports = {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
};