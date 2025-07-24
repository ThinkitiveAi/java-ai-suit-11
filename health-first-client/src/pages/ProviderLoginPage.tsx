import React from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Link,
  Paper,
  useTheme,
} from '@mui/material';
import { LocalHospital, Security } from '@mui/icons-material';
import { LoginForm } from '../components/auth/LoginForm';
import type { LoginFormData } from '../types/auth';

const ProviderLoginPage: React.FC = () => {
  const theme = useTheme();

  const handleLogin = async (data: LoginFormData) => {
    // Simulate API call
    console.log('Login attempt:', data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, simulate success
    // In real app, this would be an API call
    if (data.emailOrPhone && data.password) {
      console.log('Login successful');
      // Redirect to dashboard or handle success
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const handleForgotPassword = () => {
    console.log('Navigate to forgot password page');
    // Navigate to forgot password page
  };

  const handleRegister = () => {
    console.log('Navigate to registration page');
    // Navigate to registration page
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.secondary.light}15 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <LocalHospital 
              sx={{ 
                fontSize: 48, 
                color: theme.palette.primary.main,
                mr: 1 
              }} 
            />
            <Typography variant="h3" component="h1" color="primary">
              HealthFirst
            </Typography>
          </Box>
          <Typography variant="h4" component="h2" gutterBottom>
            Provider Login
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Access your healthcare dashboard securely
          </Typography>
        </Box>

        {/* Login Card */}
        <Card elevation={8}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Security sx={{ mr: 1, color: theme.palette.secondary.main }} />
              <Typography variant="h5" component="h3">
                Sign In to Your Account
              </Typography>
            </Box>
            
            <LoginForm
              onSubmit={handleLogin}
              onForgotPassword={handleForgotPassword}
              onRegister={handleRegister}
            />
          </CardContent>
        </Card>

        {/* Footer Section */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              backgroundColor: 'transparent',
              border: `1px solid ${theme.palette.divider}` 
            }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Need help? Contact our support team
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Link
                href="#support"
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                Support
              </Link>
              <Link
                href="#privacy"
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#terms"
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                Terms of Service
              </Link>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ProviderLoginPage; 