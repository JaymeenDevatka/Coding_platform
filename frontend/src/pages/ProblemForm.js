import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProblemById, createProblem, updateProblem } from "../api/problems";

const ProblemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    total_points: 0,
  });

  useEffect(() => {
    if (id) {
      const fetchProblem = async () => {
        const data = await getProblemById(id);
        setProblem(data);
      };

      fetchProblem();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateProblem(id, problem);
    } else {
      await createProblem(problem);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? "Edit Problem" : "Add Problem"}</h1>
      <label>
        Title:
        <input
          type="text"
          value={problem.title}
          onChange={(e) => setProblem({ ...problem, title: e.target.value })}
        />
      </label>
      <label>
        Description:
        <textarea
          value={problem.description}
          onChange={(e) => setProblem({ ...problem, description: e.target.value })}
        />
      </label>
      <label>
        Difficulty:
        <select
          value={problem.difficulty}
          onChange={(e) => setProblem({ ...problem, difficulty: e.target.value })}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      <label>
        Total Points:
        <input
          type="number"
          value={problem.total_points}
          onChange={(e) => setProblem({ ...problem, total_points: e.target.value })}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ProblemForm;