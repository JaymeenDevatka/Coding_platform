import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTestcases, createTestcase, deleteTestcase } from '../api/testcases';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField,
} from '@mui/material';

const Testcases = () => {
  const { problemId } = useParams();
  const [testcases, setTestcases] = useState([]);
  const [newTestcase, setNewTestcase] = useState({
    input: '',
    output: '',
    difficulty: 'easy',
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
    setNewTestcase({ input: '', output: '', difficulty: 'easy', points: 0 });
  };

  const handleDeleteTestcase = async (id) => {
    await deleteTestcase(id);
    setTestcases(testcases.filter((testcase) => testcase.id !== id));
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Input</TableCell>
            <TableCell>Output</TableCell>
            <TableCell>Difficulty</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testcases.map((testcase) => (
            <TableRow key={testcase.id}>
              <TableCell>{testcase.input}</TableCell>
              <TableCell>{testcase.output}</TableCell>
              <TableCell>{testcase.difficulty}</TableCell>
              <TableCell>{testcase.points}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => handleDeleteTestcase(testcase.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ marginTop: 20 }}>
        <TextField
          label="Input"
          value={newTestcase.input}
          onChange={(e) => setNewTestcase({ ...newTestcase, input: e.target.value })}
          sx={{ marginRight: 1 }}
        />
        <TextField
          label="Output"
          value={newTestcase.output}
          onChange={(e) => setNewTestcase({ ...newTestcase, output: e.target.value })}
          sx={{ marginRight: 1 }}
        />
        <TextField
          label="Difficulty"
          value={newTestcase.difficulty}
          onChange={(e) => setNewTestcase({ ...newTestcase, difficulty: e.target.value })}
          sx={{ marginRight: 1 }}
        />
        <TextField
          label="Points"
          type="number"
          value={newTestcase.points}
          onChange={(e) => setNewTestcase({ ...newTestcase, points: e.target.value })}
          sx={{ marginRight: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddTestcase}>
          Add Testcase
        </Button>
      </div>
    </TableContainer>
  );
};

export default Testcases;