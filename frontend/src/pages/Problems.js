import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProblems, deleteProblem } from "../api/problems";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Chip,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const getColor = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "success";
    case "medium":
      return "warning";
    case "hard":
      return "error";
    default:
      return "default";
  }
};

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      const data = await getProblems();
      setProblems(data);
      setFilteredProblems(data);
    };
    fetchProblems();
  }, []);

  useEffect(() => {
    const filtered = problems.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProblems(filtered);
  }, [searchTerm, problems]);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setConfirmDialogOpen(true);
  };

  const handleDelete = async () => {
    await deleteProblem(deleteId);
    const updated = problems.filter((problem) => problem.id !== deleteId);
    setProblems(updated);
    setOpenSnackbar(true);
    setConfirmDialogOpen(false);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Problems List
      </Typography>

      <Box
        sx={{ marginBottom: 2, display: "flex", alignItems: "center", gap: 2 }}
      >
        <SearchIcon />
        <TextField
          label="Search by Title"
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="problems table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Total Points</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem) => (
                <TableRow key={problem.id}>
                  <TableCell>{problem.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={problem.difficulty}
                      color={getColor(problem.difficulty)}
                    />
                  </TableCell>
                  <TableCell>{problem.total_points}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        component={Link}
                        to={`/problems/${problem.id}`}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => confirmDelete(problem.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No problems found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for deletion confirmation */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Problem deleted successfully!
        </Alert>
      </Snackbar>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Are you sure you want to delete this problem?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Problems;
