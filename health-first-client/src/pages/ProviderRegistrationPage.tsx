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
import { LocalHospital, PersonAdd } from '@mui/icons-material';
import { RegistrationForm } from '../components/auth/RegistrationForm';
import type { RegistrationFormData } from '../types/auth';

const ProviderRegistrationPage: React.FC = () => {
  const theme = useTheme();

  const handleRegistration = async (data: RegistrationFormData) => {
    // Simulate API call
    console.log('Registration attempt:', data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // For demo purposes, simulate success
    // In real app, this would be an API call
    if (data.email && data.password) {
      console.log('Registration successful');
      // Redirect to login or handle success
    } else {
      throw new Error('Registration failed');
    }
  };

  const handleLogin = () => {
    console.log('Navigate to login page');
    // Navigate to login page
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.secondary.light}15 100%)`,
        py: 4,
      }}
    >
      <Container maxWidth="md">
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
            Provider Registration
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join our network of healthcare professionals
          </Typography>
        </Box>

        {/* Registration Card */}
        <Card elevation={8}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PersonAdd sx={{ mr: 1, color: theme.palette.secondary.main }} />
              <Typography variant="h5" component="h3">
                Create Your Provider Account
              </Typography>
            </Box>
            
            <RegistrationForm
              onSubmit={handleRegistration}
              onLogin={handleLogin}
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
              Need help with registration? Contact our support team
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

export default ProviderRegistrationPage; 