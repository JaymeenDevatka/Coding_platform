import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Problems from "./pages/Problems";
import ProblemForm from "./pages/ProblemForm";
import Testcases from "./pages/Testcases";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Problems />} />
        <Route path="/problems/new" element={<ProblemForm />} />
        <Route path="/problems/:id" element={<ProblemForm />} />
        <Route path="/problems/:problemId/testcases" element={<Testcases />} />
      </Routes>
    </Router>
  );
};

export default App;