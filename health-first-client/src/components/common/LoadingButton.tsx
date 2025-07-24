import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import type { ButtonProps } from '@mui/material';

interface LoadingButtonProps extends Omit<ButtonProps, 'disabled'> {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText = 'Loading...',
  children,
  ...buttonProps
}) => {
  return (
    <Button
      {...buttonProps}
      disabled={loading}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : buttonProps.startIcon}
    >
      {loading ? loadingText : children}
    </Button>
  );
}; 