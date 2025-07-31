import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Checkbox } from '../components';
import { isValidEmail, isValidPhone } from '../utils/validation';

export default function ProviderLogin() {
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  // Auth context
  const { login } = useAuth();

  // Validation messages
  const VALIDATION_MESSAGES = {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    phone: 'Please enter a valid phone number.',
    password: 'Password must be at least 6 characters long.',
    invalidCredentials: 'Invalid email or password. Please try again.',
    accountLocked: 'Account is temporarily locked. Please contact support.',
    networkError: 'Network error. Please check your connection and try again.',
    serverError: 'Server error. Please try again later.'
  };

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

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = VALIDATION_MESSAGES.required;
    } else {
      // Check if input is email or phone
      const isEmail = isValidEmail(formData.email);
      const isPhone = isValidPhone(formData.email);
      
      if (!isEmail && !isPhone) {
        newErrors.email = 'Please enter a valid email address or phone number.';
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
          // if (random < 0.3) reject(new Error('account_locked'));
          // if (random < 0.4) reject(new Error('network_error'));
          // if (random < 0.5) reject(new Error('server_error'));
          
          // For now, always succeed
          resolve();
        }, 2000);
      });

      // Attempt login
      const result = await login({
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        // Show success briefly then redirect
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        setSubmitError(result.error || VALIDATION_MESSAGES.invalidCredentials);
      }

    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different error types
      switch (error.message) {
        case 'invalid_credentials':
          setSubmitError(VALIDATION_MESSAGES.invalidCredentials);
          break;
        case 'account_locked':
          setSubmitError(VALIDATION_MESSAGES.accountLocked);
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
    window.location.href = '/provider-registration';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center select-none">
        <svg width="200" height="200" fill="none" viewBox="0 0 200 200">
          <rect x="90" y="40" width="20" height="120" rx="10" fill="#2563eb" />
          <rect x="40" y="90" width="120" height="20" rx="10" fill="#059669" />
        </svg>
      </div>

      {/* Login Form */}
      <div className="z-10 w-full max-w-md mx-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 border border-blue-100"
          aria-label="Provider Login Form"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Provider Login</h1>
            </div>
            <p className="text-gray-600 text-sm">
              Sign in to access your healthcare provider dashboard
            </p>
          </div>

          {/* Error Message */}
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

          {/* Email/Phone Input */}
          <div className="mb-6">
            <Input
              label="Email or Phone Number"
              type="text"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              placeholder="Enter your email or phone number"
              required
              autoComplete="username"
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={errors.password}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-blue-600 focus:outline-none focus:text-blue-600"
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
              className="text-sm text-blue-600 hover:text-blue-500 focus:outline-none focus:text-blue-500 disabled:opacity-50"
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
            className="w-full mb-6"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          {/* Registration Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">
              New healthcare provider?
            </p>
            <button
              type="button"
              onClick={handleRegister}
              className="text-blue-600 hover:text-blue-500 font-medium text-sm focus:outline-none focus:text-blue-500 disabled:opacity-50"
              disabled={loading}
            >
              Register here
            </button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="text-center mt-6">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-700 focus:outline-none focus:text-gray-700">
              Support
            </a>
            <span>|</span>
            <a href="#" className="hover:text-gray-700 focus:outline-none focus:text-gray-700">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-gray-700 focus:outline-none focus:text-gray-700">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 