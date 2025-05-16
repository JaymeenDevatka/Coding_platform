import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Problems from './pages/Problems';
import ProblemForm from './pages/ProblemForm';
import Testcases from './pages/Testcases';
import SubmitCode from './pages/SubmitCode';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn'; // Import SignIn page
import SignUp from './pages/SignUp'; // Import SignUp page
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Container, CssBaseline, Box } from '@mui/material';
import { AuthContext } from './context/AuthContext'; // Import AuthContext to check authentication status

const App = () => {
  const { auth } = useContext(AuthContext); // Use the authentication context to check if the user is signed in

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
            {/* Public Routes */}
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />

            {/* Protected Routes */}
            {auth.isAuthenticated ? (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/problems/new" element={<ProblemForm />} />
                <Route path="/problems/:id" element={<ProblemForm />} />
                <Route path="/problems/:problemId/testcases" element={<Testcases />} />
                <Route path="/submit-code/:problemId" element={<SubmitCode />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/sign-in" />} />
            )}
          </Routes>
        </Container>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;