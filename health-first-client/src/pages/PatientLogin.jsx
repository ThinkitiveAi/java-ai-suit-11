import React, { useState, useEffect } from 'react';
import { Button, Input, Checkbox } from '../components';
import { isValidEmail, isValidPhone } from '../utils/validation';

export default function PatientLogin() {
  // Form state
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);
  const [identifierType, setIdentifierType] = useState(''); // 'email' or 'phone'

  // Validation messages
  const VALIDATION_MESSAGES = {
    required: 'This field is required.',
    email: 'Please enter a valid email address (e.g., john@example.com).',
    phone: 'Please enter a valid phone number (e.g., (555) 123-4567).',
    password: 'Password must be at least 6 characters long.',
    invalidCredentials: 'The email/phone or password you entered is incorrect.',
    accountNotFound: 'No account found with this email/phone. Please check your information or register for a new account.',
    networkError: 'Connection error. Please check your internet and try again.',
    serverError: 'We\'re experiencing technical difficulties. Please try again in a few minutes.'
  };

  // Detect input type (email or phone)
  useEffect(() => {
    const value = formData.identifier.trim();
    if (!value) {
      setIdentifierType('');
      return;
    }

    if (isValidEmail(value)) {
      setIdentifierType('email');
    } else if (isValidPhone(value)) {
      setIdentifierType('phone');
    } else {
      setIdentifierType('');
    }
  }, [formData.identifier]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError('');
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Identifier validation
    if (!formData.identifier.trim()) {
      newErrors.identifier = VALIDATION_MESSAGES.required;
    } else {
      const isEmail = isValidEmail(formData.identifier);
      const isPhone = isValidPhone(formData.identifier);
      
      if (!isEmail && !isPhone) {
        newErrors.identifier = 'Please enter a valid email address or phone number.';
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = VALIDATION_MESSAGES.required;
    } else if (formData.password.length < 6) {
      newErrors.password = VALIDATION_MESSAGES.password;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
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
          // if (random < 0.2) reject(new Error('invalid_credentials'));
          // if (random < 0.3) reject(new Error('account_not_found'));
          // if (random < 0.4) reject(new Error('network_error'));
          // if (random < 0.5) reject(new Error('server_error'));
          
          // For now, always succeed
          resolve();
        }, 2000);
      });

      // Show success message
      setSuccess(true);
      
      // Redirect to dashboard after brief delay
      setTimeout(() => {
        window.location.href = '/patient-dashboard';
      }, 2000);
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different error types
      switch (error.message) {
        case 'invalid_credentials':
          setSubmitError(VALIDATION_MESSAGES.invalidCredentials);
          break;
        case 'account_not_found':
          setSubmitError(VALIDATION_MESSAGES.accountNotFound);
          break;
        case 'network_error':
          setSubmitError(VALIDATION_MESSAGES.networkError);
          break;
        case 'server_error':
          setSubmitError(VALIDATION_MESSAGES.serverError);
          break;
        default:
          setSubmitError(VALIDATION_MESSAGES.serverError);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = (e) => {
    e.preventDefault();
    // TODO: Implement forgot password functionality
    alert('Forgot password functionality will be implemented here.');
  };

  // Handle registration link
  const handleRegister = (e) => {
    e.preventDefault();
    window.location.href = '/patient-registration';
  };

  // Get input placeholder based on detected type
  const getIdentifierPlaceholder = () => {
    if (identifierType === 'email') {
      return 'john@example.com';
    } else if (identifierType === 'phone') {
      return '(555) 123-4567';
    }
    return 'Email or phone number';
  };

  // Get input type based on detected type
  const getIdentifierInputType = () => {
    if (identifierType === 'email') {
      return 'email';
    } else if (identifierType === 'phone') {
      return 'tel';
    }
    return 'text';
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center select-none">
          <svg width="200" height="200" fill="none" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="#10b981" />
            <path d="M70 100l20 20 40-40" stroke="white" strokeWidth="4" />
          </svg>
        </div>

        {/* Success Message */}
        <div className="z-10 w-full max-w-md mx-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600 mb-4">
              You're now logged in. Redirecting to your dashboard...
            </p>
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
              <span className="ml-2 text-sm text-gray-500">Loading dashboard...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center select-none">
        <svg width="200" height="200" fill="none" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="#10b981" />
          <path d="M70 100l20 20 40-40" stroke="white" strokeWidth="4" />
        </svg>
      </div>

      {/* Login Form */}
      <div className="z-10 w-full max-w-md mx-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 border border-green-100"
          aria-label="Patient Login Form"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            </div>
            <p className="text-gray-600 text-sm">
              Sign in to access your health records and appointments
            </p>
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-red-600 text-sm font-medium">{submitError}</p>
                  {submitError.includes('account not found') && (
                    <button
                      type="button"
                      onClick={handleRegister}
                      className="text-red-600 text-sm underline mt-1 hover:text-red-700"
                    >
                      Create a new account
                    </button>
                  )}
                  {submitError.includes('password you entered is incorrect') && (
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-red-600 text-sm underline mt-1 hover:text-red-700"
                    >
                      Reset your password
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Login Identifier Input */}
          <div className="mb-6">
            <Input
              label="Email or Phone Number"
              type={getIdentifierInputType()}
              value={formData.identifier}
              onChange={(e) => handleInputChange('identifier', e.target.value)}
              onBlur={() => {
                if (errors.identifier) {
                  setErrors(prev => ({ ...prev, identifier: '' }));
                }
              }}
              error={errors.identifier}
              placeholder={getIdentifierPlaceholder()}
              required
              autoComplete="username"
              disabled={loading}
              aria-describedby="identifier-help"
            />
            <div id="identifier-help" className="mt-1 text-xs text-gray-500">
              {identifierType === 'email' && '✓ Valid email format'}
              {identifierType === 'phone' && '✓ Valid phone format'}
              {!identifierType && formData.identifier && 'Enter a valid email or phone number'}
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onBlur={() => {
                  if (errors.password) {
                    setErrors(prev => ({ ...prev, password: '' }));
                  }
                }}
                error={errors.password}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                disabled={loading}
                aria-describedby="password-help"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-green-600 focus:outline-none focus:text-green-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={loading}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <div id="password-help" className="mt-1 text-xs text-gray-500">
              Password must be at least 6 characters long
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <Checkbox
              label="Remember me"
              checked={formData.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              disabled={loading}
            />
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-green-600 hover:text-green-500 focus:outline-none focus:text-green-500 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            disabled={loading}
            className="w-full mb-6 bg-green-600 hover:bg-green-700 focus:ring-green-500"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          {/* Registration Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">
              New to Health First?
            </p>
            <button
              type="button"
              onClick={handleRegister}
              className="text-green-600 hover:text-green-500 font-medium text-sm focus:outline-none focus:text-green-500 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Create an account
            </button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="text-center mt-6">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors">
              Help & Support
            </a>
            <span>|</span>
            <a href="#" className="hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 