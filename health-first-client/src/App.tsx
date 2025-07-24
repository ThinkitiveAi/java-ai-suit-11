import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import ProviderLoginPage from './pages/ProviderLoginPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProviderLoginPage />
    </ThemeProvider>
  );
}

export default App;
