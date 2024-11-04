import React from 'react';
import { ColorModeContext, useMode } from './theme.js';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AssetsPage from './pages/AssetsPage.js'

const App = () => {
  const [theme, colorMode]  = useMode();

  return (<ColorModeContext.Provider value ={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/assets" element={<AssetsPage />} />
        </Routes>
      </Router>

    </ThemeProvider>
  </ColorModeContext.Provider>
  );
};

export default App;
