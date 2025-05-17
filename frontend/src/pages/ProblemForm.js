import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProblemById, createProblem, updateProblem } from '../api/problems';
import { TextField, Button, Container, Typography } from '@mui/material';

const ProblemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState({
    title: '',
    description: '',
    difficulty: 'easy',
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
    navigate('/problems');
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Problem' : 'Create Problem'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={problem.title}
          onChange={(e) => setProblem({ ...problem, title: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          value={problem.description}
          onChange={(e) => setProblem({ ...problem, description: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Difficulty"
          value={problem.difficulty}
          onChange={(e) => setProblem({ ...problem, difficulty: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Total Points"
          type="number"
          value={problem.total_points}
          onChange={(e) => setProblem({ ...problem, total_points: parseInt(e.target.value) || 0 })}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">
          {id ? 'Update' : 'Create'}
        </Button>
      </form>
    </Container>
  );
};

export default ProblemForm;