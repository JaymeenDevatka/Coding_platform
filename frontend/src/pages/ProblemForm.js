import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProblem } from "../api/problems";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const ProblemForm = () => {
  const navigate = useNavigate();
  const [problem, setProblem] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    total_points: 0,
  });
  const [testCases, setTestCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const addTestCase = () => {
    setTestCases([
      ...testCases,
      { input: "", output: "", difficulty: "easy", points: 0 },
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

  useEffect(() => {
    const total = testCases.reduce(
      (sum, tc) => sum + Number(tc.points || 0),
      0
    );
    setProblem((prev) => ({ ...prev, total_points: total }));
  }, [testCases]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...problem, test_cases: testCases };
    try {
      setLoading(true);
      await createProblem(data);
      setOpenSnackbar(true);
      setTimeout(() => navigate("/problems"), 2000);
    } catch (error) {
      console.error("Error creating problem:", error);
      alert("Failed to create problem. Check backend logs for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Problem
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={problem.title}
              onChange={(e) =>
                setProblem({ ...problem, title: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={problem.description}
              onChange={(e) =>
                setProblem({ ...problem, description: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={problem.difficulty}
                label="Difficulty"
                onChange={(e) =>
                  setProblem({ ...problem, difficulty: e.target.value })
                }
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Total Points"
              type="number"
              value={problem.total_points}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 4 }} />
        <Typography variant="h5" gutterBottom>
          Test Cases
        </Typography>

        {testCases.map((testCase, index) => (
          <Card key={index} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Tooltip title="Enter input for the test case">
                    <TextField
                      label="Input"
                      value={testCase.input}
                      onChange={(e) =>
                        updateTestCase(index, "input", e.target.value)
                      }
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Tooltip title="Expected output of the test case">
                    <TextField
                      label="Output"
                      value={testCase.output}
                      onChange={(e) =>
                        updateTestCase(index, "output", e.target.value)
                      }
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <FormControl fullWidth>
                    <InputLabel>Difficulty</InputLabel>
                    <Select
                      value={testCase.difficulty}
                      label="Difficulty"
                      onChange={(e) =>
                        updateTestCase(index, "difficulty", e.target.value)
                      }
                    >
                      <MenuItem value="easy">Easy</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="hard">Hard</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    label="Points"
                    type="number"
                    value={testCase.points}
                    onChange={(e) =>
                      updateTestCase(index, "points", e.target.value)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => removeTestCase(index)}
                  >
                    Remove Test Case
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={addTestCase}
          sx={{ marginBottom: 4 }}
        >
          Add Test Case
        </Button>

        <Button
          variant="contained"
          color="success"
          type="submit"
          fullWidth
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Problem"}
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Problem created successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProblemForm;
