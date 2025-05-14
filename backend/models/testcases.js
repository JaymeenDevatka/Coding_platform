const pool = require("../config/db");

// Get all testcases for a problem
const getTestcasesByProblemId = async (problemId) => {
  const result = await pool.query("SELECT * FROM testcases WHERE problem_id = $1", [problemId]);
  return result.rows;
};

// Create a new testcase
const createTestcase = async (problem_id, input, output, difficulty, points) => {
  const result = await pool.query(
    "INSERT INTO testcases (problem_id, input, output, difficulty, points) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [problem_id, input, output, difficulty, points]
  );
  return result.rows[0];
};

// Delete a testcase
const deleteTestcase = async (id) => {
  await pool.query("DELETE FROM testcases WHERE id = $1", [id]);
};

module.exports = {
  getTestcasesByProblemId,
  createTestcase,
  deleteTestcase,
};