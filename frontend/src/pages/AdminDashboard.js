import React from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Welcome to the admin dashboard! Manage the platform here.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Admin Actions</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
            Create New Problem
          </Button>
          <Button variant="outlined" color="secondary" sx={{ mt: 2 }}>
            View Submissions
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Recent Activity</Typography>
          <List>
            <ListItem>
              <ListItemText primary="User JohnDoe submitted Problem 1" secondary="10 minutes ago" />
            </ListItem>
            <ListItem>
              <ListItemText primary="New user JaneDoe signed up" secondary="2 hours ago" />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminDashboard;