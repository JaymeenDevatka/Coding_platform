const {
  getTestcasesByProblemId,
  createTestcase,
  deleteTestcase,
} = require("../models/testcases");

// Get all testcases for a problem
const getTestcases = async (req, res) => {
  const { problemId } = req.params;
  try {
    const testcases = await getTestcasesByProblemId(problemId);
    res.json(testcases);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create a testcase
const createTestcaseHandler = async (req, res) => {
  const { problem_id, input, output, difficulty, points } = req.body;
  try {
    const newTestcase = await createTestcase(problem_id, input, output, difficulty, points);
    res.json(newTestcase);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete a testcase
const deleteTestcaseHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTestcase(id);
    res.json({ message: "Testcase deleted successfully!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getTestcases,
  createTestcaseHandler,
  deleteTestcaseHandler,
};