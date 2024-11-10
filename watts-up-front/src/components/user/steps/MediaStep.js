import React from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { PhotoCamera, PictureAsPdf } from '@mui/icons-material';
import Input from './Input'; 

const MediaStep = ({ formData, onChange }) => {
  const handleFileChange = (event, field) => {
    const selectedFiles = Array.from(event.target.files);
    onChange(field, selectedFiles);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Upload Property Images
      </Typography>
      <label htmlFor="image-upload">
        <Input
          accept="image/*"
          id="image-upload"
          multiple
          type="file"
          onChange={(e) => handleFileChange(e, "images")}
        />
        <Button
          variant="outlined"
          fullWidth
          startIcon={<PhotoCamera />}
          component="span"
        >
          Upload Images
        </Button>
      </label>
      <ListDisplay files={formData.images} title="Selected Images:" />

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Upload Documents (PDF)
      </Typography>
      <label htmlFor="pdf-upload">
        <Input
          accept="application/pdf"
          id="pdf-upload"
          multiple
          type="file"
          onChange={(e) => handleFileChange(e, "documents")}
        />
        <Button
          variant="outlined"
          fullWidth
          startIcon={<PictureAsPdf />}
          component="span"
        >
          Upload PDFs
        </Button>
      </label>
      <ListDisplay files={formData.documents} title="Selected Documents:" />
    </Box>
  );
};

const ListDisplay = ({ files, title }) => (
  files.length > 0 && (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1">{title}</Typography>
      <List>
        {files.map((file, index) => (
          <ListItem key={index}>
            <ListItemText primary={file.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
);

export default MediaStep;


