import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProblems, deleteProblem } from "../api/problems";

const Problems = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const data = await getProblems();
      setProblems(data);
    };

    fetchProblems();
  }, []);

  const handleDelete = async (id) => {
    await deleteProblem(id);
    setProblems(problems.filter((problem) => problem.id !== id));
  };

  return (
    <div>
      <h1>Problems</h1>
      <Link to="/problems/new">Add New Problem</Link>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>
            <h3>{problem.title}</h3>
            <p>{problem.description}</p>
            <p>Difficulty: {problem.difficulty}</p>
            <Link to={`/problems/${problem.id}`}>Edit</Link>
            <button onClick={() => handleDelete(problem.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Problems;