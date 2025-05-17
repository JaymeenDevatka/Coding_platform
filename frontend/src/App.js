import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Problems from './pages/Problems';
import ProblemForm from './pages/ProblemForm';
import Testcases from './pages/Testcases';
import SubmitCode from './pages/SubmitCode';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Container, CssBaseline, Box } from '@mui/material';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)', // Subtract Navbar height
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container sx={{ flexGrow: 1, py: 3 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/new" element={<ProblemForm />} />
            <Route path="/problems/:id" element={<ProblemForm />} />
            <Route path="/problems/:problemId/testcases" element={<Testcases />} />
            <Route path="/submit-code/:problemId" element={<SubmitCode />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;