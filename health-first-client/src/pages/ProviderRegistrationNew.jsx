import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Input, 
  Checkbox, 
  FileUpload, 
  Select, 
  PasswordStrength 
} from '../components';
import { 
  isValidEmail, 
  isValidPhone, 
  isValidPassword,
  formatPhoneNumber,
  MEDICAL_SPECIALIZATIONS,
  US_STATES,
  PASSWORD_REQUIREMENTS,
  VALIDATION_MESSAGES
} from '../utils';

export default function ProviderRegistrationNew() {
  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profilePhoto: null,
    
    // Professional Information
    specialization: '',
    licenseNumber: '',
    yearsExperience: '',
    
    // Clinic Address
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Account Security
    password: '',
    confirmPassword: '',
    
    // Terms
    acceptTerms: false
  });

  // Form state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [touched, setTouched] = useState({});

  // Validation rules
  const validationRules = {
    firstName: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s]+$/
    },
    lastName: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s]+$/
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
      required: true,
      pattern: /^\+?[\d\s\-\(\)]{10,15}$/
    },
    specialization: {
      required: true,
      minLength: 3,
      maxLength: 100
    },
    licenseNumber: {
      required: true,
      pattern: /^[a-zA-Z0-9]+$/,
      minLength: 5,
      maxLength: 20
    },
    yearsExperience: {
      required: true,
      min: 0,
      max: 50
    },
    streetAddress: {
      required: true,
      maxLength: 200
    },
    city: {
      required: true,
      maxLength: 100,
      pattern: /^[a-zA-Z\s]+$/
    },
    state: {
      required: true,
      maxLength: 50
    },
    zipCode: {
      required: true,
      pattern: /^\d{5}(-\d{4})?$/
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    },
    confirmPassword: {
      required: true,
      match: 'password'
    },
    acceptTerms: {
      required: true
    }
  };

  // Custom validation messages
  const customMessages = {
    firstName: {
      required: 'First name is required.',
      minLength: 'First name must be at least 2 characters.',
      maxLength: 'First name cannot exceed 50 characters.',
      pattern: 'First name can only contain letters and spaces.'
    },
    lastName: {
      required: 'Last name is required.',
      minLength: 'Last name must be at least 2 characters.',
      maxLength: 'Last name cannot exceed 50 characters.',
      pattern: 'Last name can only contain letters and spaces.'
    },
    email: {
      required: 'Email address is required.',
      pattern: 'Please enter a valid email address.',
      duplicate: 'This email address is already registered.'
    },
    phone: {
      required: 'Phone number is required.',
      pattern: 'Please enter a valid phone number.',
      duplicate: 'This phone number is already registered.'
    },
    specialization: {
      required: 'Specialization is required.',
      minLength: 'Specialization must be at least 3 characters.',
      maxLength: 'Specialization cannot exceed 100 characters.'
    },
    licenseNumber: {
      required: 'Medical license number is required.',
      pattern: 'License number can only contain letters and numbers.',
      minLength: 'License number must be at least 5 characters.',
      maxLength: 'License number cannot exceed 20 characters.',
      duplicate: 'This license number is already registered.'
    },
    yearsExperience: {
      required: 'Years of experience is required.',
      min: 'Years of experience must be at least 0.',
      max: 'Years of experience cannot exceed 50.'
    },
    streetAddress: {
      required: 'Street address is required.',
      maxLength: 'Street address cannot exceed 200 characters.'
    },
    city: {
      required: 'City is required.',
      maxLength: 'City name cannot exceed 100 characters.',
      pattern: 'City name can only contain letters and spaces.'
    },
    state: {
      required: 'State/Province is required.',
      maxLength: 'State/Province cannot exceed 50 characters.'
    },
    zipCode: {
      required: 'ZIP/Postal code is required.',
      pattern: 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789).'
    },
    password: {
      required: 'Password is required.',
      minLength: 'Password must be at least 8 characters.',
      pattern: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    },
    confirmPassword: {
      required: 'Please confirm your password.',
      match: 'Passwords do not match.'
    },
    acceptTerms: {
      required: 'You must accept the terms and conditions.'
    }
  };

  // Validate a single field
  const validateField = (fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return '';

    // Required validation
    if (rules.required && (!value || value.toString().trim() === '')) {
      return customMessages[fieldName]?.required || VALIDATION_MESSAGES.required;
    }

    // Skip other validations if field is empty and not required
    if (!value || value.toString().trim() === '') {
      return '';
    }

    // Min length validation
    if (rules.minLength && value.toString().length < rules.minLength) {
      return customMessages[fieldName]?.minLength || `Minimum length is ${rules.minLength} characters.`;
    }

    // Max length validation
    if (rules.maxLength && value.toString().length > rules.maxLength) {
      return customMessages[fieldName]?.maxLength || `Maximum length is ${rules.maxLength} characters.`;
    }

    // Min value validation (for numbers)
    if (rules.min !== undefined && parseInt(value) < rules.min) {
      return customMessages[fieldName]?.min || `Minimum value is ${rules.min}.`;
    }

    // Max value validation (for numbers)
    if (rules.max !== undefined && parseInt(value) > rules.max) {
      return customMessages[fieldName]?.max || `Maximum value is ${rules.max}.`;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      return customMessages[fieldName]?.pattern || 'Invalid format.';
    }

    // Match validation (for confirm password)
    if (rules.match && value !== formData[rules.match]) {
      return customMessages[fieldName]?.match || 'Values do not match.';
    }

    return '';
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError('');
    }

    // Validate field if it has been touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  // Handle field blur (mark as touched and validate)
  const handleFieldBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Handle file upload
  const handleFileSelect = (file, error) => {
    if (error) {
      setErrors(prev => ({ ...prev, profilePhoto: error }));
      return;
    }
    setFormData(prev => ({ ...prev, profilePhoto: file }));
    setErrors(prev => ({ ...prev, profilePhoto: '' }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitError('Please correct the errors below before submitting.');
      return;
    }

    setLoading(true);
    setSubmitError('');

    try {
      // Simulate API call with different scenarios
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate different error scenarios (uncomment to test)
          // const random = Math.random();
          // if (random < 0.1) reject(new Error('duplicate_email'));
          // if (random < 0.2) reject(new Error('duplicate_license'));
          // if (random < 0.3) reject(new Error('network_error'));
          // if (random < 0.4) reject(new Error('server_error'));
          
          // For now, always succeed
          resolve();
        }, 2000);
      });

      // Format phone number before submission
      const submissionData = {
        ...formData,
        phone: formatPhoneNumber(formData.phone)
      };
      
      console.log('Provider registration data:', submissionData);
      setSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          profilePhoto: null,
          specialization: '',
          licenseNumber: '',
          yearsExperience: '',
          streetAddress: '',
          city: '',
          state: '',
          zipCode: '',
          password: '',
          confirmPassword: '',
          acceptTerms: false
        });
        setErrors({});
        setTouched({});
        setSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle different error types
      switch (error.message) {
        case 'duplicate_email':
          setErrors(prev => ({ ...prev, email: customMessages.email.duplicate }));
          setSubmitError('This email address is already registered.');
          break;
        case 'duplicate_license':
          setErrors(prev => ({ ...prev, licenseNumber: customMessages.licenseNumber.duplicate }));
          setSubmitError('This license number is already registered.');
          break;
        case 'network_error':
          setSubmitError('Network error. Please check your connection and try again.');
          break;
        case 'server_error':
          setSubmitError('Server error. Please try again later.');
          break;
        default:
          setSubmitError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for registering with Health First. We've sent a verification email to your address.
          </p>
          <div className="space-y-3 text-sm text-gray-500">
            <p>✓ Account verification email sent</p>
            <p>✓ Application under review</p>
            <p>✓ You'll receive approval within 24-48 hours</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button 
              variant="primary" 
              className="flex-1"
              onClick={() => window.location.href = '/provider-login'}
            >
              Go to Login
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.location.href = '/dashboard'}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Provider Registration</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join Health First to provide exceptional healthcare services. Complete your registration to access our comprehensive medical platform.
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-600 text-sm">{submitError}</p>
                </div>
              </div>
            )}

            {/* Personal Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  onBlur={() => handleFieldBlur('firstName')}
                  error={errors.firstName}
                  required
                  maxLength={50}
                />
                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  onBlur={() => handleFieldBlur('lastName')}
                  error={errors.lastName}
                  required
                  maxLength={50}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleFieldBlur('email')}
                  error={errors.email}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  onBlur={() => handleFieldBlur('phone')}
                  error={errors.phone}
                  required
                />
              </div>
              
              <div className="mt-6">
                <FileUpload
                  label="Profile Photo (Optional)"
                  onFileSelect={handleFileSelect}
                  error={errors.profilePhoto}
                />
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Professional Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Specialization"
                  options={MEDICAL_SPECIALIZATIONS}
                  value={formData.specialization}
                  onChange={(value) => handleInputChange('specialization', value)}
                  error={errors.specialization}
                  required
                  searchable
                  placeholder="Select your specialization"
                />
                <Input
                  label="Medical License Number"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  onBlur={() => handleFieldBlur('licenseNumber')}
                  error={errors.licenseNumber}
                  required
                  maxLength={20}
                />
                <Input
                  label="Years of Experience"
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                  onBlur={() => handleFieldBlur('yearsExperience')}
                  error={errors.yearsExperience}
                  required
                  min={0}
                  max={50}
                />
              </div>
            </div>

            {/* Clinic Address Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Clinic Address
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input
                    label="Street Address"
                    value={formData.streetAddress}
                    onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                    onBlur={() => handleFieldBlur('streetAddress')}
                    error={errors.streetAddress}
                    required
                    maxLength={200}
                  />
                </div>
                <Input
                  label="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  onBlur={() => handleFieldBlur('city')}
                  error={errors.city}
                  required
                  maxLength={100}
                />
                <Select
                  label="State/Province"
                  options={US_STATES}
                  value={formData.state}
                  onChange={(value) => handleInputChange('state', value)}
                  error={errors.state}
                  required
                  placeholder="Select state"
                />
                <Input
                  label="ZIP/Postal Code"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  onBlur={() => handleFieldBlur('zipCode')}
                  error={errors.zipCode}
                  required
                />
              </div>
            </div>

            {/* Account Security Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Account Security
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onBlur={() => handleFieldBlur('password')}
                    error={errors.password}
                    required
                  />
                  <div className="mt-3">
                    <PasswordStrength 
                      password={formData.password} 
                      requirements={PASSWORD_REQUIREMENTS}
                    />
                  </div>
                </div>
                <Input
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  onBlur={() => handleFieldBlur('confirmPassword')}
                  error={errors.confirmPassword}
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-8">
              <Checkbox
                label={
                  <span>
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500 underline">
                      Terms and Conditions
                    </a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500 underline">
                      Privacy Policy
                    </a>
                  </span>
                }
                checked={formData.acceptTerms}
                onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                error={errors.acceptTerms}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/provider-login'}
                className="flex-1"
              >
                Back to Login
              </Button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Need help? Contact our support team at support@healthfirst.com</p>
          <p className="mt-1">© 2024 Health First. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
} 