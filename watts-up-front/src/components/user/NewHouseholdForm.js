// NewHouseholdForm.js
import React, { useState } from 'react';
import { Box, Paper, Stepper, Step, StepLabel, Button } from '@mui/material';
import BasicInformationStep from './BasicInformationStep';
import LocationStep from './LocationStep';
import MediaStep from './MediaStep';
import HouseholdsStep from './HouseholdsStep';
import ConfirmationDialog from '../common/ConfirmationDialog';

const NewHouseholdForm = ({ cityList }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Basic Information', 'Location', 'Media Upload', 'Households'];
  const [formData, setFormData] = useState({
    address: '', city: '', floors: '', location: null, images: [], documents: [], households: [{ floor: '', area: '', identifier: '' }]
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  // Functions to handle form data updates
  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleConfirmSubmit = () => {
    console.log("Form submitted:", formData);
    handleDialogClose();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <BasicInformationStep
            address={formData.address}
            setAddress={(value) => updateFormData('address', value)}
            city={formData.city}
            setCity={(value) => updateFormData('city', value)}
            floors={formData.floors}
            setFloors={(value) => updateFormData('floors', value)}
            cityList={cityList}
          />
        );
      case 1:
        return (
          <LocationStep
            location={formData.location}
            setLocation={(value) => updateFormData('location', value)}
          />
        );
      case 2:
        return (
          <MediaStep
            images={formData.images}
            setImages={(value) => updateFormData('images', value)}
            documents={formData.documents}
            setDocuments={(value) => updateFormData('documents', value)}
          />
        );
      case 3:
        return (
          <HouseholdsStep
            households={formData.households}
            handleHouseholdChange={(index, field, value) => {
              const updatedHouseholds = [...formData.households];
              updatedHouseholds[index][field] = value;
              updateFormData('households', updatedHouseholds);
            }}
            addHousehold={() => updateFormData('households', [...formData.households, { floor: '', area: '', identifier: '' }])}
            removeHousehold={(index) => {
              const updatedHouseholds = formData.households.filter((_, i) => i !== index);
              updateFormData('households', updatedHouseholds);
            }}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, m: 'auto', borderRadius: 2 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ mt: 4 }}>
        {getStepContent(activeStep)}
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleDialogOpen}
          >
            Submit
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>Next</Button>
        )}
      </Box>
      
      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirmSubmit}
      />
    </Paper>
  );
};

export default NewHouseholdForm;

