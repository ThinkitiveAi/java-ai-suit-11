import React from 'react';
import { Box, Typography, LinearProgress, useTheme } from '@mui/material';

interface PasswordStrengthIndicatorProps {
  strength: 'weak' | 'medium' | 'strong';
  score: number;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  strength,
  score,
}) => {
  const theme = useTheme();

  const getStrengthColor = () => {
    switch (strength) {
      case 'weak':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'strong':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[300];
    }
  };

  const getStrengthText = () => {
    switch (strength) {
      case 'weak':
        return 'Weak';
      case 'medium':
        return 'Medium';
      case 'strong':
        return 'Strong';
      default:
        return '';
    }
  };

  const getProgressValue = () => {
    return (score / 6) * 100; // 6 is the maximum possible score
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Password Strength
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: getStrengthColor(),
            fontWeight: 600,
          }}
        >
          {getStrengthText()}
        </Typography>
      </Box>
      
      <LinearProgress
        variant="determinate"
        value={getProgressValue()}
        sx={{
          height: 4,
          borderRadius: 2,
          backgroundColor: theme.palette.grey[200],
          '& .MuiLinearProgress-bar': {
            backgroundColor: getStrengthColor(),
            borderRadius: 2,
          },
        }}
      />
      
      <Box sx={{ mt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Requirements:
        </Typography>
        <Box component="ul" sx={{ mt: 0.5, pl: 2, mb: 0 }}>
          <Typography component="li" variant="caption" color="text.secondary">
            At least 8 characters long
          </Typography>
          <Typography component="li" variant="caption" color="text.secondary">
            Contains at least one letter and one number
          </Typography>
          <Typography component="li" variant="caption" color="text.secondary">
            Special characters recommended (@$!%*?&)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}; 