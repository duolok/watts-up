import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';

const BasicInformationStep = ({ address, setAddress, city, setCity, floors, setFloors, cityList }) => (
  <Box>
    <TextField
      fullWidth label="Address" value={address}
      onChange={(e) => setAddress(e.target.value)}
      margin="normal"
    />
    <TextField
      select fullWidth label="City" value={city}
      onChange={(e) => setCity(e.target.value)} margin="normal"
    >
      {cityList.map((cityItem) => (
        <MenuItem key={cityItem} value={cityItem}>{cityItem}</MenuItem>
      ))}
    </TextField>
    <TextField
      fullWidth label="Number of Floors" value={floors}
      onChange={(e) => setFloors(e.target.value)} margin="normal" type="number"
    />
  </Box>
);

export default BasicInformationStep;
