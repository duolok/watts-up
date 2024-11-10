import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          backdropFilter: 'blur(5px)', 
          backgroundColor: 'rgba(255, 255, 255, 0.85)', 
        }
      }}
    >
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Do you really want to submit this form? Please confirm your action.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={onConfirm} color="primary" variant="contained">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
