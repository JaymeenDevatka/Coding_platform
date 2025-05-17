import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 2,
      px: 2,
      mt: 'auto',
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
      textAlign: 'center',
    }}
  >
    <Typography variant="body2" color="textSecondary">
      &copy; {new Date().getFullYear()} Coding Platform. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;