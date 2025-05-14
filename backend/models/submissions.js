const pool = require("../config/db");

// Fetch testcases for a problem
const getTestcasesForProblem = async (problemId) => {
  const result = await pool.query("SELECT input, output FROM testcases WHERE problem_id = $1", [
    problemId,
  ]);
  return result.rows;
};

module.exports = {
  getTestcasesForProblem,
};