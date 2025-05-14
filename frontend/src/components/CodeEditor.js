import React from "react";
import { ControlledEditor } from "@monaco-editor/react";

const CodeEditor = ({ code, onCodeChange, language = "javascript" }) => {
  const handleEditorChange = (ev, value) => {
    onCodeChange(value);
  };

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "4px", overflow: "hidden" }}>
      <ControlledEditor
        height="400px"
        language={language}
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
      />
    </div>
  );
};

export default CodeEditor;