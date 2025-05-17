import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProblemById } from '../api/problems';
import { Container, Typography, Button } from '@mui/material';

const ProblemView = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      const data = await getProblemById(id);
      setProblem(data);
    };
    fetchProblem();
  }, [id]);

  if (!problem) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4">{problem.title}</Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Difficulty: {problem.difficulty} | Points: {problem.total_points}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {problem.description}
      </Typography>
      <Button component={Link} to={`/problems/${problem.id}/edit`} sx={{ mt: 2 }} variant="contained">
        Edit
      </Button>
      <Button component={Link} to="/problems" sx={{ mt: 2, ml: 2 }} variant="outlined">
        Back to List
      </Button>
    </Container>
  );
};

export default ProblemView;