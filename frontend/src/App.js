import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Problems from './pages/Problems';
import ProblemForm from './pages/ProblemForm';
import ProblemView from './pages/ProblemView';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Box, CssBaseline, Container } from '@mui/material';

const App = () => (
  <Router>
    <CssBaseline />
    <Navbar />
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', // Adjust for header/footer
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container sx={{ flexGrow: 1, py: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/new" element={<ProblemForm />} />
          <Route path="/problems/:id/view" element={<ProblemView />} />
          <Route path="/problems/:id/edit" element={<ProblemForm />} />
          <Route path="*" element={<Navigate to="/problems" />} />
        </Routes>
      </Container>
      <Footer />
    </Box>
  </Router>
);

export default App;