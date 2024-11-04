import React from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';

const AssetssPage = () => {
  return (
    <Box display="flex" height="100vh">
      <Sidebar userRole="User" />
      <Box flexGrow={1}>
        <Topbar />
      </Box>
    </Box>
  );
};

export default AssetssPage;

