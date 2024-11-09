import React from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { PhotoCamera, PictureAsPdf } from '@mui/icons-material';

const MediaStep = ({ images, setImages, documents, setDocuments }) => {
  const handleFileChange = (event, setFiles) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  return (
    <Box>
      <Typography variant="h6">Upload Property Images</Typography>
      <input 
        accept="image/*" multiple type="file" 
        onChange={(e) => handleFileChange(e, setImages)} 
        style={{ display: 'none' }} 
        id="image-upload" 
      />
      <label htmlFor="image-upload">
        <Button startIcon={<PhotoCamera />} component="span">
          Upload Images
        </Button>
      </label>

      {images.length > 0 && (
        <List>
          {images.map((file, index) => <ListItem key={index}><ListItemText primary={file.name} /></ListItem>)}
        </List>
      )}

      <Typography variant="h6" sx={{ mt: 2 }}>Upload Documents (PDF)</Typography>
      <input 
        accept="application/pdf" multiple type="file" 
        onChange={(e) => handleFileChange(e, setDocuments)} 
        style={{ display: 'none' }} 
        id="pdf-upload" 
      />
      <label htmlFor="pdf-upload">
        <Button startIcon={<PictureAsPdf />} component="span">
          Upload PDFs
        </Button>
      </label>

      {documents.length > 0 && (
        <List>
          {documents.map((file, index) => <ListItem key={index}><ListItemText primary={file.name} /></ListItem>)}
        </List>
      )}
    </Box>
  );
};

export default MediaStep;
