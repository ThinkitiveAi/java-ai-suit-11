import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
  Link,
  Alert,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Badge,
  School,
  Business,
  LocationOn,
  Security,
} from '@mui/icons-material';
import { LoadingButton } from '../common/LoadingButton';
import { PasswordInput } from '../common/PasswordInput';
import { PhotoUpload } from '../common/PhotoUpload';
import { PasswordStrengthIndicator } from '../common/PasswordStrengthIndicator';
import { useRegistrationForm } from '../../hooks/useRegistrationForm';
import {
  medicalSpecializations,
  practiceTypes,
  stateOptions,
  yearsOfExperienceOptions,
} from '../../utils/data';
import type { RegistrationFormData } from '../../types/auth';

interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormData) => Promise<void>;
  onLogin?: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  onLogin,
}) => {
  const {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleBlur,
    handleSubmit,
    handleFileUpload,
    getPasswordStrengthInfo,
  } = useRegistrationForm();

  const passwordStrength = getPasswordStrengthInfo();

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

      {/* Personal Information Section */}
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Person sx={{ mr: 1 }} />
        Personal Information
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <TextField
            fullWidth
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            onBlur={() => handleBlur('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName}
            placeholder="Enter your first name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <TextField
            fullWidth
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            onBlur={() => handleBlur('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName}
            placeholder="Enter your last name"
          />
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            error={!!errors.email}
            helperText={errors.email}
            placeholder="Enter your email address"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <TextField
            fullWidth
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            error={!!errors.phone}
            helperText={errors.phone}
            placeholder="Enter your phone number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mr: 2 }}>
              Profile Photo
            </Typography>
          </Box>
          <PhotoUpload
            onFileSelect={handleFileUpload}
            currentFile={formData.profilePhoto}
            error={errors.profilePhoto}
            disabled={isLoading}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Professional Information Section */}
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Badge sx={{ mr: 1 }} />
        Professional Information
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <TextField
            fullWidth
            label="Medical License Number"
            value={formData.medicalLicenseNumber}
            onChange={(e) => handleInputChange('medicalLicenseNumber', e.target.value.toUpperCase())}
            onBlur={() => handleBlur('medicalLicenseNumber')}
            error={!!errors.medicalLicenseNumber}
            helperText={errors.medicalLicenseNumber}
            placeholder="Enter your license number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <FormControl fullWidth error={!!errors.specialization}>
            <InputLabel>Specialization</InputLabel>
            <Select
              value={formData.specialization}
              label="Specialization"
              onChange={(e) => handleInputChange('specialization', e.target.value)}
              onBlur={() => handleBlur('specialization')}
            >
              {medicalSpecializations.map((spec) => (
                <MenuItem key={spec.value} value={spec.value}>
                  {spec.label}
                </MenuItem>
              ))}
            </Select>
            {errors.specialization && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                {errors.specialization}
              </Typography>
            )}
          </FormControl>
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <FormControl fullWidth error={!!errors.yearsOfExperience}>
            <InputLabel>Years of Experience</InputLabel>
            <Select
              value={formData.yearsOfExperience}
              label="Years of Experience"
              onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
              onBlur={() => handleBlur('yearsOfExperience')}
            >
              {yearsOfExperienceOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {errors.yearsOfExperience && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                {errors.yearsOfExperience}
              </Typography>
            )}
          </FormControl>
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <TextField
            fullWidth
            label="Medical Degree/Qualifications"
            value={formData.medicalDegree}
            onChange={(e) => handleInputChange('medicalDegree', e.target.value)}
            onBlur={() => handleBlur('medicalDegree')}
            error={!!errors.medicalDegree}
            helperText={errors.medicalDegree}
            placeholder="e.g., MD, DO, MBBS"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <School color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Practice Information Section */}
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Business sx={{ mr: 1 }} />
        Practice Information
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Clinic/Hospital Name"
          value={formData.clinicName}
          onChange={(e) => handleInputChange('clinicName', e.target.value)}
          onBlur={() => handleBlur('clinicName')}
          error={!!errors.clinicName}
          helperText={errors.clinicName}
          placeholder="Enter clinic or hospital name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Business color="action" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Street Address"
          value={formData.streetAddress}
          onChange={(e) => handleInputChange('streetAddress', e.target.value)}
          onBlur={() => handleBlur('streetAddress')}
          error={!!errors.streetAddress}
          helperText={errors.streetAddress}
          placeholder="Enter street address"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="City"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              onBlur={() => handleBlur('city')}
              error={!!errors.city}
              helperText={errors.city}
              placeholder="Enter city"
            />
          </Box>
          <Box sx={{ flex: '1 1 150px', minWidth: 0 }}>
            <FormControl fullWidth error={!!errors.state}>
              <InputLabel>State</InputLabel>
              <Select
                value={formData.state}
                label="State"
                onChange={(e) => handleInputChange('state', e.target.value)}
                onBlur={() => handleBlur('state')}
              >
                {stateOptions.map((state) => (
                  <MenuItem key={state.value} value={state.value}>
                    {state.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.state && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                  {errors.state}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box sx={{ flex: '1 1 150px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="ZIP Code"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              onBlur={() => handleBlur('zipCode')}
              error={!!errors.zipCode}
              helperText={errors.zipCode}
              placeholder="Enter ZIP code"
            />
          </Box>
        </Box>
        <FormControl fullWidth error={!!errors.practiceType}>
          <InputLabel>Practice Type</InputLabel>
          <Select
            value={formData.practiceType}
            label="Practice Type"
            onChange={(e) => handleInputChange('practiceType', e.target.value)}
            onBlur={() => handleBlur('practiceType')}
          >
            {practiceTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
          {errors.practiceType && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
              {errors.practiceType}
            </Typography>
          )}
        </FormControl>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Account Security Section */}
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Security sx={{ mr: 1 }} />
        Account Security
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <PasswordInput
            fullWidth
            label="Password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            error={!!errors.password}
            helperText={errors.password}
            placeholder="Create a strong password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Security color="action" />
                </InputAdornment>
              ),
            }}
          />
          {formData.password && (
            <PasswordStrengthIndicator
              strength={passwordStrength.strength}
              score={passwordStrength.score}
            />
          )}
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <PasswordInput
            fullWidth
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            onBlur={() => handleBlur('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            placeholder="Confirm your password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Security color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Terms and Conditions */}
      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.acceptTerms}
              onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              I agree to the{' '}
              <Link href="#terms" sx={{ textDecoration: 'none' }}>
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link href="#privacy" sx={{ textDecoration: 'none' }}>
                Privacy Policy
              </Link>
            </Typography>
          }
        />
        {errors.acceptTerms && (
          <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
            {errors.acceptTerms}
          </Typography>
        )}
      </Box>

      {/* Submit Button */}
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        loading={isLoading}
        loadingText="Creating Account..."
        sx={{ mb: 3 }}
      >
        Create Account
      </LoadingButton>

      {/* Login Link */}
      {onLogin && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={onLogin}
              sx={{ textDecoration: 'none' }}
            >
              Sign in here
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
}; 