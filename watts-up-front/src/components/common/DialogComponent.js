import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Backdrop, useTheme } from '@mui/material';

const DialogComponent = ({ open, onClose, onConfirm, title, message }) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.9)", backdropFilter: "blur(5px)" } }}
      PaperProps={{ sx: { padding: 3, borderRadius: 3, maxWidth: 600, backgroundColor: theme.palette.mode === "dark" ? "#333333" : theme.palette.background.paper, color: theme.palette.text.primary, boxShadow: theme.shadows[10] } }}
    >
      <DialogTitle sx={{ color: theme.palette.primary.main, fontSize: "1.4rem", textAlign: "center", fontWeight: "bold" }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: theme.palette.text.secondary, textAlign: "center", fontSize: "1.1rem" }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose} color="primary" variant="outlined">Cancel</Button>
        <Button onClick={onConfirm} color="primary" variant="contained" sx={{ ml: 2 }}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
