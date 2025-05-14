import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const CodeEditor = ({ problemId }) => {
  const [code, setCode] = useState("");
  const [languageId, setLanguageId] = useState(71); // Python 3 by default
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");

  const handleRunCode = async () => {
    try {
      const response = await axios.post("/api/judge0/submit", {
        source_code: code,
        language_id: languageId,
        stdin,
      });
      setOutput(response.data.stdout || response.data.stderr || "No output");
    } catch (error) {
      console.error("Error running code:", error);
      setOutput("Error running code.");
    }
  };

  return (
    <div>
      <select value={languageId} onChange={(e) => setLanguageId(Number(e.target.value))}>
        <option value={71}>Python 3</option>
        <option value={62}>Java</option>
        <option value={50}>C</option>
        <option value={54}>C++</option>
        <option value={63}>JavaScript</option>
      </select>
      <Editor
        height="400px"
        defaultLanguage="python"
        defaultValue="// Write your code here"
        onChange={(value) => setCode(value)}
      />
      <textarea
        placeholder="Input (stdin)"
        value={stdin}
        onChange={(e) => setStdin(e.target.value)}
      />
      <button onClick={handleRunCode}>Run Code</button>
      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;