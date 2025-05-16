import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProblem } from '../api/problems';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const ProblemForm = () => {
  const navigate = useNavigate();
  const [problem, setProblem] = useState({
    title: '',
    description: '',
    difficulty: 'easy',
    total_points: 0,
  });
  const [testCases, setTestCases] = useState([]);

  const addTestCase = () => {
    setTestCases([
      ...testCases,
      { input: '', output: '', difficulty: 'easy', points: 0 },
    ]);
  };

  const updateTestCase = (index, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const removeTestCase = (index) => {
    const updatedTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(updatedTestCases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...problem, test_cases: testCases };
    await createProblem(data);
    navigate('/problems');
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Problem
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Problem Details */}
        <Box sx={{ marginBottom: 3 }}>
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
            rows={4}
            value={problem.description}
            onChange={(e) =>
              setProblem({ ...problem, description: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Difficulty"
            value={problem.difficulty}
            onChange={(e) =>
              setProblem({ ...problem, difficulty: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Total Points"
            type="number"
            value={problem.total_points}
            onChange={(e) =>
              setProblem({ ...problem, total_points: e.target.value })
            }
            sx={{ marginBottom: 4 }}
          />
        </Box>

        {/* Test Cases */}
        <Typography variant="h5" gutterBottom>
          Test Cases
        </Typography>
        {testCases.map((testCase, index) => (
          <Card key={index} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <TextField
                    label="Input"
                    value={testCase.input}
                    onChange={(e) =>
                      updateTestCase(index, 'input', e.target.value)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    label="Output"
                    value={testCase.output}
                    onChange={(e) =>
                      updateTestCase(index, 'output', e.target.value)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    label="Difficulty"
                    value={testCase.difficulty}
                    onChange={(e) =>
                      updateTestCase(index, 'difficulty', e.target.value)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    label="Points"
                    type="number"
                    value={testCase.points}
                    onChange={(e) =>
                      updateTestCase(index, 'points', e.target.value)
                    }
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Tooltip title="Remove Test Case">
                <IconButton
                  color="error"
                  onClick={() => removeTestCase(index)}
                  size="large"
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={addTestCase}
            startIcon={<Add />}
          >
            Add Test Case
          </Button>
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="success"
          type="submit"
          fullWidth
          size="large"
        >
          Create Problem
        </Button>
      </form>
    </Container>
  );
};

export default ProblemForm;