import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 5,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to the Coding Platform
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Solve problems, manage test cases, and submit your code.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/problems"
        sx={{ mt: 3 }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default HomePage;