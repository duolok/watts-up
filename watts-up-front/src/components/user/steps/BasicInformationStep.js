import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';

const BasicInformationStep = ({ formData, onChange }) => (
  <Box>
    <TextField
      fullWidth
      label="Address"
      value={formData.address}
      onChange={(e) => onChange("address", e.target.value)}
      margin="normal"
    />
    <TextField
      select
      fullWidth
      label="City"
      value={formData.city}
      onChange={(e) => onChange("city", e.target.value)}
      margin="normal"
    >
      {formData.cityList.map((cityItem) => (
        <MenuItem key={cityItem} value={cityItem}>
          {cityItem}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      fullWidth
      label="Number of Floors"
      value={formData.floors}
      onChange={(e) => onChange("floors", e.target.value)}
      margin="normal"
      type="number"
    />
  </Box>
);

export default BasicInformationStep;
