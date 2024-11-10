import { useState } from 'react';

export const usePropertyForm = (initialFormData) => {
  const [formData, setFormData] = useState(initialFormData);
  const [activeStep, setActiveStep] = useState(0);
  const [openDialog, setOpenDialog] = useState(false); 
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    setOpenDialog(true); 
  };

  const handleConfirmSubmit = () => {
    console.log("Form submitted:", formData);
    setOpenDialog(false); 
    setOpenSnackbar(true); 
    // TODO: Add form submission logic here
  };

  return {
    formData,
    activeStep,
    openDialog,
    setOpenDialog, 
    openSnackbar,
    setOpenSnackbar,
    handleFormChange,
    handleNext,
    handleBack,
    handleSubmit,
    handleConfirmSubmit,
  };
};

