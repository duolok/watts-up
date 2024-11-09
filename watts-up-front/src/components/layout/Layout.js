import React from 'react';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import { Box } from '@mui/material';

const Layout = ({ userRole, children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar userRole={userRole} />
      <Box 
        component="main" 
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Topbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
