import React, { useState } from 'react';
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
  PRACTICE_TYPES,
  YEARS_OF_EXPERIENCE,
  MEDICAL_DEGREES,
  US_STATES,
  PASSWORD_REQUIREMENTS,
  VALIDATION_MESSAGES
} from '../utils';

export default function ProviderRegistration() {
  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profilePhoto: null,
    
    // Professional Information
    licenseNumber: '',
    specialization: '',
    yearsExperience: '',
    medicalDegree: '',
    
    // Practice Information
    practiceName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    practiceType: '',
    
    // Account Security
    password: '',
    confirmPassword: '',
    
    // Terms
    acceptTerms: false,
    acceptMarketing: false
  });

  // Form errors
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Personal Information
    if (!formData.firstName.trim()) newErrors.firstName = VALIDATION_MESSAGES.required;
    if (!formData.lastName.trim()) newErrors.lastName = VALIDATION_MESSAGES.required;
    if (!formData.email.trim()) {
      newErrors.email = VALIDATION_MESSAGES.required;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = VALIDATION_MESSAGES.email;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = VALIDATION_MESSAGES.required;
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = VALIDATION_MESSAGES.phone;
    }

    // Professional Information
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = VALIDATION_MESSAGES.required;
    if (!formData.specialization) newErrors.specialization = VALIDATION_MESSAGES.required;
    if (!formData.yearsExperience) newErrors.yearsExperience = VALIDATION_MESSAGES.required;
    if (!formData.medicalDegree) newErrors.medicalDegree = VALIDATION_MESSAGES.required;

    // Practice Information
    if (!formData.practiceName.trim()) newErrors.practiceName = VALIDATION_MESSAGES.required;
    if (!formData.streetAddress.trim()) newErrors.streetAddress = VALIDATION_MESSAGES.required;
    if (!formData.city.trim()) newErrors.city = VALIDATION_MESSAGES.required;
    if (!formData.state) newErrors.state = VALIDATION_MESSAGES.required;
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = VALIDATION_MESSAGES.required;
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = VALIDATION_MESSAGES.zipCode;
    }
    if (!formData.practiceType) newErrors.practiceType = VALIDATION_MESSAGES.required;

    // Account Security
    if (!formData.password) {
      newErrors.password = VALIDATION_MESSAGES.required;
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = VALIDATION_MESSAGES.password;
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = VALIDATION_MESSAGES.required;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = VALIDATION_MESSAGES.confirmPassword;
    }

    // Terms
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions.';
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
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
          licenseNumber: '',
          specialization: '',
          yearsExperience: '',
          medicalDegree: '',
          practiceName: '',
          streetAddress: '',
          city: '',
          state: '',
          zipCode: '',
          practiceType: '',
          password: '',
          confirmPassword: '',
          acceptTerms: false,
          acceptMarketing: false
        });
        setSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
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
          <Button 
            variant="primary" 
            className="mt-6 w-full"
            onClick={() => window.location.href = '/provider-login'}
          >
            Go to Login
          </Button>
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
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{errors.submit}</p>
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
                  error={errors.firstName}
                  required
                />
                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  error={errors.lastName}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={errors.phone}
                  required
                />
              </div>
              
              <div className="mt-6">
                <FileUpload
                  label="Profile Photo"
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
                <Input
                  label="Medical License Number"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  error={errors.licenseNumber}
                  required
                />
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
                <Select
                  label="Years of Experience"
                  options={YEARS_OF_EXPERIENCE}
                  value={formData.yearsExperience}
                  onChange={(value) => handleInputChange('yearsExperience', value)}
                  error={errors.yearsExperience}
                  required
                  placeholder="Select years of experience"
                />
                <Select
                  label="Medical Degree"
                  options={MEDICAL_DEGREES}
                  value={formData.medicalDegree}
                  onChange={(value) => handleInputChange('medicalDegree', value)}
                  error={errors.medicalDegree}
                  required
                  placeholder="Select your degree"
                />
              </div>
            </div>

            {/* Practice Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Practice Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Practice/Hospital Name"
                  value={formData.practiceName}
                  onChange={(e) => handleInputChange('practiceName', e.target.value)}
                  error={errors.practiceName}
                  required
                />
                <Select
                  label="Practice Type"
                  options={PRACTICE_TYPES}
                  value={formData.practiceType}
                  onChange={(value) => handleInputChange('practiceType', value)}
                  error={errors.practiceType}
                  required
                  placeholder="Select practice type"
                />
                <div className="md:col-span-2">
                  <Input
                    label="Street Address"
                    value={formData.streetAddress}
                    onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                    error={errors.streetAddress}
                    required
                  />
                </div>
                <Input
                  label="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  error={errors.city}
                  required
                />
                <Select
                  label="State"
                  options={US_STATES}
                  value={formData.state}
                  onChange={(value) => handleInputChange('state', value)}
                  error={errors.state}
                  required
                  placeholder="Select state"
                />
                <Input
                  label="ZIP Code"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
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
                  error={errors.confirmPassword}
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-8 space-y-4">
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
              <Checkbox
                label="I would like to receive updates about new features and healthcare industry news"
                checked={formData.acceptMarketing}
                onChange={(e) => handleInputChange('acceptMarketing', e.target.checked)}
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