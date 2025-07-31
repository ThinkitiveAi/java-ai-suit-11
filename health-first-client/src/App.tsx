import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import ProviderRegistrationPage from './pages/ProviderRegistrationPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProviderRegistrationPage />
    </ThemeProvider>
  );
}

export default App;
