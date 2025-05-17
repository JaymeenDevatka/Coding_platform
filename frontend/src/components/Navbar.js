import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Coding Platform
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/problems">
          Problems
        </Button>
        <Button color="inherit" component={Link} to="/problems/new">
          Create Problem
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;