import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); // Use login function from AuthContext
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Make API request to the backend for sign-in
      const response = await axios.post('http://localhost:5000/api/signin', {
        username,
        password,
      });

      // On successful login, store the token in AuthContext and navigate to the homepage
      const { token, user } = response.data;
      login(token, user); // Pass token and user to the AuthContext
      navigate('/'); // Redirect to homepage
    } catch (err) {
      // Handle sign-in failure by redirecting to the Sign Up page
      if (err.response && err.response.status === 401) {
        setError('User not registered. Redirecting to Sign Up...');
        setTimeout(() => navigate('/sign-up'), 2000); // Redirect to Sign Up after 2 seconds
      } else {
        setError('Invalid username or password.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSignIn}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;