import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const HouseholdsStep = ({ households, onChange }) => {
  const addHousehold = () => {
    onChange("households", [...households, { floor: "", area: "", identifier: "" }]);
  };

  const removeHousehold = (index) => {
    onChange("households", households.filter((_, i) => i !== index));
  };

  const handleHouseholdChange = (index, field, value) => {
    const updatedHouseholds = [...households];
    updatedHouseholds[index][field] = value;
    onChange("households", updatedHouseholds);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add Households
      </Typography>
      {households.map((household, index) => (
        <HouseholdDetail
          key={index}
          household={household}
          index={index}
          onHouseholdChange={handleHouseholdChange}
          onDelete={() => removeHousehold(index)}
        />
      ))}
      <HouseholdActions onAdd={addHousehold} onRemove={() => removeHousehold(households.length - 1)} />
    </Box>
  );
};

const HouseholdDetail = ({ household, index, onHouseholdChange, onDelete }) => (
  <Box sx={{ mt: 2, pt: 2, borderTop: index !== 0 ? 1 : 0, borderRadius: 1 }}>
    <TextField
      fullWidth
      label="Floor"
      value={household.floor}
      onChange={(e) => onHouseholdChange(index, "floor", e.target.value)}
      margin="normal"
    />
    <TextField
      fullWidth
      label="Area (sqm)"
      value={household.area}
      onChange={(e) => onHouseholdChange(index, "area", e.target.value)}
      margin="normal"
      type="number"
    />
    <TextField
      fullWidth
      label="Identifier"
      value={household.identifier}
      onChange={(e) => onHouseholdChange(index, "identifier", e.target.value)}
      margin="normal"
    />
    {index > 0 && (
      <Button variant="outlined" color="error" onClick={onDelete} fullWidth>
        Remove Household
      </Button>
    )}
  </Box>
);

const HouseholdActions = ({ onAdd, onRemove }) => (
  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
    <Button variant="outlined" color="error" onClick={onRemove} fullWidth>
      Remove Last Household
    </Button>
    <Button variant="contained" onClick={onAdd} fullWidth>
      Add Household
    </Button>
  </Box>
);

export default HouseholdsStep;
