import React from 'react';
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Link,
  Alert,
  InputAdornment,
} from '@mui/material';
import { Email, Phone, Lock } from '@mui/icons-material';
import { LoadingButton } from '../common/LoadingButton';
import { PasswordInput } from '../common/PasswordInput';
import { useLoginForm } from '../../hooks/useLoginForm';
import type { LoginFormData } from '../../types/auth';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onRegister,
}) => {
  const {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleBlur,
    handleSubmit,
    getInputType,
  } = useLoginForm();

  const inputType = getInputType();
  const isEmail = inputType === 'email';
  const isPhone = inputType === 'phone';

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(onSubmit);
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit} sx={{ width: '100%' }}>
      {/* Error Alert */}
      {errors.general && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.general}
        </Alert>
      )}

      {/* Email/Phone Input */}
      <TextField
        fullWidth
        label="Email or Phone Number"
        value={formData.emailOrPhone}
        onChange={(e) => handleInputChange('emailOrPhone', e.target.value)}
        onBlur={() => handleBlur('emailOrPhone')}
        error={!!errors.emailOrPhone}
        helperText={errors.emailOrPhone}
        placeholder={isEmail ? "Enter your email" : isPhone ? "Enter your phone number" : "Enter email or phone number"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {isEmail ? <Email color="action" /> : <Phone color="action" />}
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
        autoComplete="email"
      />

      {/* Password Input */}
      <PasswordInput
        fullWidth
        label="Password"
        value={formData.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
        onBlur={() => handleBlur('password')}
        error={!!errors.password}
        helperText={errors.password}
        placeholder="Enter your password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock color="action" />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
        autoComplete="current-password"
      />

      {/* Remember Me & Forgot Password Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              color="primary"
            />
          }
          label="Remember me"
        />
        {onForgotPassword && (
          <Link
            component="button"
            variant="body2"
            onClick={onForgotPassword}
            sx={{ textDecoration: 'none' }}
          >
            Forgot password?
          </Link>
        )}
      </Box>

      {/* Login Button */}
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        loading={isLoading}
        loadingText="Signing in..."
        sx={{ mb: 3 }}
      >
        Sign In
      </LoadingButton>

      {/* Registration Link */}
      {onRegister && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={onRegister}
              sx={{ textDecoration: 'none' }}
            >
              Register here
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
}; 