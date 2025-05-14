import React, { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import axios from "axios";

const SubmitCode = ({ problemId }) => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [testcases, setTestcases] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCodeSubmission = async () => {
    // Ensure code and problemId are provided
    if (!code || !problemId) {
      alert("Please provide code and a valid problem.");
      return;
    }

    try {
      setLoading(true);

      // Make an API call to submit code via Judge0
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/submit`, {
        code,
        language,
        problemId,
      });

      // Extract output and test case results
      const { stdout, stderr, testcases: results } = response.data;

      setOutput(stdout || stderr);
      setTestcases(results);
    } catch (err) {
      console.error("Error during code submission:", err);
      setOutput("Error occurred while submitting the code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Submit Code</h1>
      <label>
        Select Language:
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
        </select>
      </label>
      <CodeEditor code={code} onCodeChange={setCode} language={language} />
      <button onClick={handleCodeSubmission} disabled={loading}>
        {loading ? "Submitting..." : "Submit Code"}
      </button>
      {output && (
        <div>
          <h2>Output:</h2>
          <pre>{output}</pre>
        </div>
      )}
      {testcases.length > 0 && (
        <div>
          <h2>Testcase Results:</h2>
          <ul>
            {testcases.map((testcase, idx) => (
              <li key={idx}>
                <strong>Testcase {idx + 1}:</strong> {testcase.passed ? "Passed" : "Failed"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubmitCode;