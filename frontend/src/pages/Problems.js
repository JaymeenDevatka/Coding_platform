import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProblems, deleteProblem } from '../api/problems';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
} from '@mui/material';

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
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Difficulty</TableCell>
            <TableCell>Total Points</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {problems.map((problem) => (
            <TableRow key={problem.id}>
              <TableCell>{problem.title}</TableCell>
              <TableCell>{problem.difficulty}</TableCell>
              <TableCell>{problem.total_points}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/problems/${problem.id}`}
                  sx={{ marginRight: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(problem.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Problems;