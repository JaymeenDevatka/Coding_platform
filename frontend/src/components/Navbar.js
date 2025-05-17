import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
        Coding Platform
      </Typography>
      <Button color="inherit" component={Link} to="/problems">
        Problems
      </Button>
      <Button color="inherit" component={Link} to="/problems/new">
        Create Problem
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;