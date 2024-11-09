import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const HouseholdsStep = ({ households, handleHouseholdChange, addHousehold, removeHousehold }) => (
  <Box>
    <Typography variant="h6">Add Households</Typography>
    {households.map((household, index) => (
      <Box key={index}>
        <TextField 
          fullWidth label="Floor" value={household.floor} 
          onChange={(e) => handleHouseholdChange(index, 'floor', e.target.value)} margin="normal"
        />
        <TextField 
          fullWidth label="Area (sqm)" value={household.area} 
          onChange={(e) => handleHouseholdChange(index, 'area', e.target.value)} margin="normal" type="number"
        />
        <TextField 
          fullWidth label="Identifier" value={household.identifier} 
          onChange={(e) => handleHouseholdChange(index, 'identifier', e.target.value)} margin="normal"
        />
      </Box>
    ))}
    <Button onClick={addHousehold}>Add Household</Button>
    <Button onClick={() => removeHousehold(households.length - 1)}>Remove Household</Button>
  </Box>
);

export default HouseholdsStep;
