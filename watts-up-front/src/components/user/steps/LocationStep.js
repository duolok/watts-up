import React from 'react';
import { Box, Typography } from '@mui/material';
import PropertyMap from './PropertyMap'; // Assume this is also externalized

const LocationStep = ({ location, setLocation }) => (
  <Box>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Select Property Location
    </Typography>
    <PropertyMap
      location={location}
      setLocation={setLocation}
    />
  </Box>
);

export default LocationStep;
