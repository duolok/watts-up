import React from 'react';
import { Snackbar, Alert, useTheme } from '@mui/material';

const SnackbarComponent = ({ open, onClose, message }) => {
  const theme = useTheme();
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity="success" variant="filled" sx={{ width: "100%", backgroundColor: theme.palette.mode === "dark" ? "#B0BEC5" : "#333333", color: theme.palette.mode === "dark" ? "#333333" : "#FFFFFF" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
