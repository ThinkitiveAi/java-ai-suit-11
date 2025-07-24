import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordInputProps extends Omit<TextFieldProps, 'type'> {
  showToggle?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  showToggle = true,
  ...textFieldProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      {...textFieldProps}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        ...textFieldProps.InputProps,
        endAdornment: showToggle ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleTogglePasswordVisibility}
              edge="end"
              size="small"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : textFieldProps.InputProps?.endAdornment,
      }}
    />
  );
}; 