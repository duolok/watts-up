import React from 'react';
import { Box } from '@mui/material';

const MainContent = ({ children }) => {
  return (
    <Box sx={{ m: 2.5, flexGrow: 1 }}>
      {children}
    </Box>
  );
};

export default MainContent;
