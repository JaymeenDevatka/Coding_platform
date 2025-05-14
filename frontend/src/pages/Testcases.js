import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTestcases, createTestcase, deleteTestcase } from "../api/testcases";

const Testcases = () => {
  const { problemId } = useParams();
  const [testcases, setTestcases] = useState([]);
  const [newTestcase, setNewTestcase] = useState({
    input: "",
    output: "",
    difficulty: "easy",
    points: 0,
  });

  useEffect(() => {
    const fetchTestcases = async () => {
      const data = await getTestcases(problemId);
      setTestcases(data);
    };

    fetchTestcases();
  }, [problemId]);

  const handleAddTestcase = async () => {
    const testcase = await createTestcase({ ...newTestcase, problem_id: problemId });
    setTestcases([...testcases, testcase]);
    setNewTestcase({ input: "", output: "", difficulty: "easy", points: 0 });
  };

  const handleDeleteTestcase = async (id) => {
    await deleteTestcase(id);
    setTestcases(testcases.filter((testcase) => testcase.id !== id));
  };

  return (
    <div>
      <h1>Testcases</h1>
      <ul>
        {testcases.map((testcase) => (
          <li key={testcase.id}>
            <p>Input: {testcase.input}</p>
            <p>Output: {testcase.output}</p>
            <p>Difficulty: {testcase.difficulty}</p>
            <button onClick={() => handleDeleteTestcase(testcase.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add Testcase</h2>
      <input
        type="text"
        placeholder="Input"
        value={newTestcase.input}
        onChange={(e) => setNewTestcase({ ...newTestcase, input: e.target.value })}
      />
      <input
        type="text"
        placeholder="Output"
        value={newTestcase.output}
        onChange={(e) => setNewTestcase({ ...newTestcase, output: e.target.value })}
      />
      <select
        value={newTestcase.difficulty}
        onChange={(e) => setNewTestcase({ ...newTestcase, difficulty: e.target.value })}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <input
        type="number"
        placeholder="Points"
        value={newTestcase.points}
        onChange={(e) => setNewTestcase({ ...newTestcase, points: e.target.value })}
      />
      <button onClick={handleAddTestcase}>Add</button>
    </div>
  );
};

export default Testcases;