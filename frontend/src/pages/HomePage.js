import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <Container maxWidth="md" sx={{ mt: 4 }}>
    <Typography variant="h3" gutterBottom>
      Welcome to the Coding Platform!
    </Typography>
    <Typography variant="h6" color="textSecondary" paragraph>
      Practice coding problems, create your own, and improve your skills.
    </Typography>
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to="/problems"
      size="large"
    >
      View Problems
    </Button>
  </Container>
);

export default HomePage;