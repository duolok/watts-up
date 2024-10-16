import React, { useContext, useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Link, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ColorModeContext } from '../theme';
import { PhotoCamera } from '@mui/icons-material';

import { Brightness4, Brightness7 } from '@mui/icons-material';
import '../components/RegisterComponent.css';

const RegisterForm = ({ colorMode }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); 
    }
  };

  return (
    <>
      <TextField
        fullWidth
        label="Name"
        name="name"
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        name="password"
        margin="normal"
        variant="outlined"
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '24px' }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="icon-button-file"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="icon-button-file">
          <Box
            sx={{
              border: `2px dashed ${colorMode === 'dark' ? 'var(--primary-light)' : 'var(--primary-dark)'}`,
              padding: '24px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <PhotoCamera sx={{ fontSize: '32px' }} />
          </Box>
        </label>
        {selectedImage && (
          <Box
            sx={{
              marginTop: '16px',
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <img
              src={selectedImage}
              alt="Selected profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}
      </Box>



      <Button fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </>
  );
};

const RegisterHeader = () => {
  return (
    <>
      <Typography variant="h2" className="register-title">
        Sign Up
      </Typography>
      <Typography variant="subtitle1" className="register-subtitle" gutterBottom>
        Enter your details to create a new account!
      </Typography>
    </>
  );
};

const RegisterLinks = () => {
  return (
    <Grid container justifyContent="flex-end">
      <Grid item>
        <Link component={RouterLink} to="/" className="login-link">
          Already have an account? Sign in
        </Link>
      </Grid>
    </Grid>
  );
};

const ThemeToggle = ({ colorMode }) => {
  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}
    >
      {colorMode.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

const RegisterComponent = () => {
  const colorMode = useContext(ColorModeContext);

  return (
    <Grid container className={`register-page ${colorMode.mode === 'dark' ? 'dark-mode' : ''}`}>
      <Grid item xs={12} md={8.5} className="register-image"> </Grid>
      <Grid item xs={12} md={3.5} className="register-form-container">
        <Box className="register-card">
          <RegisterHeader />
          <RegisterForm colorMode={colorMode.mode} />
          <RegisterLinks />
        </Box>
      </Grid>
      <ThemeToggle colorMode={colorMode} />
    </Grid>
  );
};

export default RegisterComponent;
