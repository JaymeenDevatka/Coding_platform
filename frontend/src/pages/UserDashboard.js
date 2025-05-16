import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const UserDashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Welcome to your dashboard! Here are your stats and ongoing activities.
        </Typography>

        <Box>
          <Typography variant="h6">Your Stats</Typography>
          <List>
            <ListItem>
              <ListItemText primary="Total Problems Solved" secondary="25" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Total Points Earned" secondary="350" />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Ongoing Challenges</Typography>
          <List>
            <ListItem>
              <ListItemText primary="Challenge: Weekly Coding Contest" secondary="Ends in 2 days" />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default UserDashboard;