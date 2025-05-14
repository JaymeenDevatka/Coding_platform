const { getTestcasesForProblem } = require("../models/submissions");
const axios = require("axios");

// Submit code and evaluate testcases
const submitCode = async (req, res) => {
  const { code, language, problemId } = req.body;

  try {
    const testcases = await getTestcasesForProblem(problemId);

    const results = [];
    const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions";
    const JUDGE0_HEADERS = {
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "x-rapidapi-key": process.env.JUDGE0_API_KEY,
    };

    for (const testcase of testcases) {
      const { input, output: expectedOutput } = testcase;

      const submissionResponse = await axios.post(
        JUDGE0_URL,
        { source_code: code, language_id: getLanguageId(language), stdin: input },
        { headers: JUDGE0_HEADERS }
      );

      const token = submissionResponse.data.token;

      let result;
      do {
        result = await axios.get(`${JUDGE0_URL}/${token}`, { headers: JUDGE0_HEADERS });
      } while (result.data.status.id <= 2);

      results.push({ passed: result.data.stdout.trim() === expectedOutput.trim() });
    }

    res.json({ testcases: results });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getLanguageId = (language) => {
  const languages = { javascript: 63, python: 71, java: 62, c: 50, cpp: 54 };
  return languages[language] || 63;
};

module.exports = { submitCode };