import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        borderTop: '1px solid #ddd',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © 2025 Coding Platform. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;