import React, { useState } from 'react';
import {
  Box, Button, Grid, Stepper, Step, StepLabel, Snackbar, Alert, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Backdrop
} from '@mui/material';
import BasicInformationStep from './steps/BasicInformationStep';
import LocationStep from './steps/LocationStep';
import MediaStep from './steps/MediaStep';
import HouseholdsStep from './steps/HouseholdsStep';
import StyledPaper from './steps/StyledPaper';
import { useTheme } from '@mui/material/styles';

const steps = ["Basic Information", "Location", "Media Upload", "Households"];

const NewPropertyComponent = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    address: "", city: "", floors: "", location: null, images: [], documents: [], households: [{ floor: "", area: "", identifier: "" }],
    cityList: ["Paris", "Belgrade", "Novi Sad"]
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);
  const handleSubmit = () => setOpenDialog(true);
  const handleConfirmSubmit = () => {
    setOpenDialog(false);
    setOpenSnackbar(true);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0: return <BasicInformationStep formData={formData} onChange={handleFormChange} />;
      case 1: return <LocationStep location={formData.location} setLocation={(loc) => handleFormChange('location', loc)} />;
      case 2: return <MediaStep formData={formData} onChange={handleFormChange} />;
      case 3: return <HouseholdsStep households={formData.households} onChange={handleFormChange} />;
      default: return "Unknown step";
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ p: 3, minHeight: "100vh" }}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <StyledPaper>
          <Box sx={{ mb: 4 }}>
            <Stepper activeStep={activeStep} sx={{ width: "100%" }}>
              {steps.map(label => (<Step key={label}><StepLabel>{label}</StepLabel></Step>))}
            </Stepper>
          </Box>
          {getStepContent(activeStep)}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack}>Back</Button>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>Next</Button>
            )}
          </Box>
        </StyledPaper>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          BackdropComponent={Backdrop}
          BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.9)", backdropFilter: "blur(5px)" } }}
          PaperProps={{ sx: { padding: 3, borderRadius: 3, maxWidth: 600, backgroundColor: theme.palette.mode === "dark" ? "#333333" : theme.palette.background.paper, color: theme.palette.text.primary, boxShadow: theme.shadows[10] } }} >

          <DialogTitle sx={{ color: theme.palette.primary.main, fontSize: "1.4rem", textAlign: "center", fontWeight: "bold" }}>Confirm Submission</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: theme.palette.text.secondary, textAlign: "center", fontSize: "1.1rem" }}>
              Are you sure you want to submit this property information?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={() => setOpenDialog(false)} color="primary" variant="outlined">Cancel</Button>
            <Button onClick={handleConfirmSubmit} color="primary" variant="contained" sx={{ ml: 2 }}>Confirm</Button>
          </DialogActions>

        </Dialog>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }} >

          <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled" sx={{ width: "100%", backgroundColor: theme.palette.mode === "dark" ? "#B0BEC5" : "#333333", color: theme.palette.mode === "dark" ? "#333333" : "#FFFFFF" }}>
            Property information successfully submitted!
          </Alert>
        </Snackbar>

      </Grid>
    </Grid>
  );
};

export default NewPropertyComponent;

