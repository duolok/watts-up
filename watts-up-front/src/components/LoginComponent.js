import React, { useContext } from 'react';
import { Box, Button, TextField, Typography, Grid, Link, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ColorModeContext } from '../theme';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import '../components/LoginComponent.css';

const LoginForm = ({ colorMode }) => {
  return (
    <>
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
      <Button fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </>
  );
};

const LoginHeader = () => {
  return (
    <>
      <Typography variant="h2" className="login-title">
        Sign In
      </Typography>
      <Typography variant="subtitle1" className="login-subtitle" gutterBottom>
        Enter your email and password to sign in!
      </Typography>
    </>
  );
};

const LoginLinks = () => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Link component={RouterLink} to="/forgot-password" className="forgot-password">
          Forgot password?
        </Link>
      </Grid>
      <Grid item>
        <Link component={RouterLink} to="/register" className="register-link">
          Create an account
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

const LoginComponent = () => {
  const colorMode = useContext(ColorModeContext);

  return (
    <Grid container className={`login-page ${colorMode.mode === 'dark' ? 'dark-mode' : ''}`}>
      <Grid item xs={12} md={8.5} className="login-image"> </Grid>
      <Grid item xs={12} md={3.5} className="login-form-container">
        <Box className="login-card">
          <LoginHeader />
          <LoginForm colorMode={colorMode.mode} />
          <LoginLinks />
        </Box>
      </Grid>
      <ThemeToggle colorMode={colorMode} />
    </Grid>
  );
};

export default LoginComponent;