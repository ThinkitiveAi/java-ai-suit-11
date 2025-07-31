import React, { useState, useEffect } from 'react';
import { Button, Input, Checkbox, Select } from '../components';
import { isValidEmail, isValidPhone, isValidPassword } from '../utils/validation';
import { formatDate, formatPhoneNumber } from '../utils/helpers';
import { HEALTHCARE } from '../shared/constants/design-tokens';

export default function PatientRegistrationNew() {
  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    
    // Address
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Emergency Contact
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    
    // Account Security
    password: '',
    confirmPassword: '',
    
    // Terms
    acceptTerms: false,
    acceptMarketing: false
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState({});

  // Validation messages
  const VALIDATION_MESSAGES = {
    required: 'This field is required.',
    firstName: 'First name must be between 2 and 50 characters.',
    lastName: 'Last name must be between 2 and 50 characters.',
    email: 'Please enter a valid email address (e.g., john@example.com).',
    phone: 'Please enter a valid phone number (e.g., (555) 123-4567).',
    dateOfBirth: 'Please enter a valid date of birth. You must be at least 13 years old.',
    gender: 'Please select your gender.',
    streetAddress: 'Street address must be between 5 and 200 characters.',
    city: 'City must be between 2 and 100 characters.',
    state: 'State must be between 2 and 50 characters.',
    zipCode: 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789).',
    emergencyName: 'Emergency contact name must be between 2 and 100 characters.',
    emergencyRelationship: 'Relationship must be between 2 and 50 characters.',
    emergencyPhone: 'Please enter a valid phone number for emergency contact.',
    password: 'Password must be at least 8 characters with at least one special character.',
    confirmPassword: 'Passwords must match.',
    acceptTerms: 'You must accept the terms and conditions to continue.',
    duplicatePhone: 'Emergency contact phone cannot be the same as your phone number.',
    futureDate: 'Date of birth cannot be in the future.',
    tooYoung: 'You must be at least 13 years old to register.',
    networkError: 'Connection error. Please check your internet and try again.',
    serverError: 'We\'re experiencing technical difficulties. Please try again in a few minutes.'
  };

  // Gender options
  const GENDER_OPTIONS = [
    { value: '', label: 'Select gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  // Relationship options
  const RELATIONSHIP_OPTIONS = [
    { value: '', label: 'Select relationship' },
    { value: 'spouse', label: 'Spouse' },
    { value: 'parent', label: 'Parent' },
    { value: 'child', label: 'Child' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'friend', label: 'Friend' },
    { value: 'other', label: 'Other' }
  ];

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Validate date of birth
  const validateDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth) return VALIDATION_MESSAGES.required;
    
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    
    if (birthDate > today) {
      return VALIDATION_MESSAGES.futureDate;
    }
    
    const age = calculateAge(dateOfBirth);
    if (age < 13) {
      return VALIDATION_MESSAGES.tooYoung;
    }
    
    return '';
  };

  // Validate ZIP code
  const validateZipCode = (zipCode) => {
    if (!zipCode) return VALIDATION_MESSAGES.required;
    
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(zipCode)) {
      return VALIDATION_MESSAGES.zipCode;
    }
    
    return '';
  };

  // Validate emergency contact
  const validateEmergencyContact = () => {
    const errors = {};
    
    // If any emergency field is filled, validate all
    const hasEmergencyInfo = formData.emergencyName || formData.emergencyRelationship || formData.emergencyPhone;
    
    if (hasEmergencyInfo) {
      if (!formData.emergencyName.trim()) {
        errors.emergencyName = 'Emergency contact name is required if providing emergency contact information.';
      } else if (formData.emergencyName.length < 2 || formData.emergencyName.length > 100) {
        errors.emergencyName = VALIDATION_MESSAGES.emergencyName;
      }
      
      if (!formData.emergencyRelationship.trim()) {
        errors.emergencyRelationship = 'Relationship is required if providing emergency contact information.';
      } else if (formData.emergencyRelationship.length < 2 || formData.emergencyRelationship.length > 50) {
        errors.emergencyRelationship = VALIDATION_MESSAGES.emergencyRelationship;
      }
      
      if (!formData.emergencyPhone.trim()) {
        errors.emergencyPhone = 'Emergency contact phone is required if providing emergency contact information.';
      } else if (!isValidPhone(formData.emergencyPhone)) {
        errors.emergencyPhone = VALIDATION_MESSAGES.emergencyPhone;
      } else if (formData.emergencyPhone === formData.phone) {
        errors.emergencyPhone = VALIDATION_MESSAGES.duplicatePhone;
      }
    }
    
    return errors;
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

  // Handle field blur
  const handleFieldBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate specific fields on blur
    let error = '';
    
    switch (field) {
      case 'firstName':
        if (!formData.firstName.trim()) {
          error = VALIDATION_MESSAGES.required;
        } else if (formData.firstName.length < 2 || formData.firstName.length > 50) {
          error = VALIDATION_MESSAGES.firstName;
        }
        break;
        
      case 'lastName':
        if (!formData.lastName.trim()) {
          error = VALIDATION_MESSAGES.required;
        } else if (formData.lastName.length < 2 || formData.lastName.length > 50) {
          error = VALIDATION_MESSAGES.lastName;
        }
        break;
        
      case 'email':
        if (!formData.email.trim()) {
          error = VALIDATION_MESSAGES.required;
        } else if (!isValidEmail(formData.email)) {
          error = VALIDATION_MESSAGES.email;
        }
        break;
        
      case 'phone':
        if (!formData.phone.trim()) {
          error = VALIDATION_MESSAGES.required;
        } else if (!isValidPhone(formData.phone)) {
          error = VALIDATION_MESSAGES.phone;
        }
        break;
        
      case 'dateOfBirth':
        error = validateDateOfBirth(formData.dateOfBirth);
        break;
        
      case 'gender':
        if (!formData.gender) {
          error = VALIDATION_MESSAGES.gender;
        }
        break;
        
      case 'streetAddress':
        if (!formData.streetAddress.trim()) {
          error = VALIDATION_MESSAGES.required;
        } else if (formData.streetAddress.length < 5 || formData.streetAddress.length > 200) {
          error = VALIDATION_MESSAGES.streetAddress;
        }
        break;
        
      case 'city':
        if (!formData.city.trim()) {
          error = VALIDATION_MESSAGES.required;
        } else if (formData.city.length < 2 || formData.city.length > 100) {
          error = VALIDATION_MESSAGES.city;
        }
        break;
        
      case 'state':
        if (!formData.state.trim()) {
          error = VALIDATION_MESSAGES.required;
        } else if (formData.state.length < 2 || formData.state.length > 50) {
          error = VALIDATION_MESSAGES.state;
        }
        break;
        
      case 'zipCode':
        error = validateZipCode(formData.zipCode);
        break;
        
      case 'password':
        if (!formData.password) {
          error = VALIDATION_MESSAGES.required;
        } else if (!isValidPassword(formData.password)) {
          error = VALIDATION_MESSAGES.password;
        }
        break;
        
      case 'confirmPassword':
        if (!formData.confirmPassword) {
          error = VALIDATION_MESSAGES.required;
        } else if (formData.confirmPassword !== formData.password) {
          error = VALIDATION_MESSAGES.confirmPassword;
        }
        break;
    }
    
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    
    // Personal Information
    if (!formData.firstName.trim()) {
      newErrors.firstName = VALIDATION_MESSAGES.required;
    } else if (formData.firstName.length < 2 || formData.firstName.length > 50) {
      newErrors.firstName = VALIDATION_MESSAGES.firstName;
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = VALIDATION_MESSAGES.required;
    } else if (formData.lastName.length < 2 || formData.lastName.length > 50) {
      newErrors.lastName = VALIDATION_MESSAGES.lastName;
    }
    
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
    
    const dateOfBirthError = validateDateOfBirth(formData.dateOfBirth);
    if (dateOfBirthError) {
      newErrors.dateOfBirth = dateOfBirthError;
    }
    
    if (!formData.gender) {
      newErrors.gender = VALIDATION_MESSAGES.gender;
    }
    
    // Address
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = VALIDATION_MESSAGES.required;
    } else if (formData.streetAddress.length < 5 || formData.streetAddress.length > 200) {
      newErrors.streetAddress = VALIDATION_MESSAGES.streetAddress;
    }
    
    if (!formData.city.trim()) {
      newErrors.city = VALIDATION_MESSAGES.required;
    } else if (formData.city.length < 2 || formData.city.length > 100) {
      newErrors.city = VALIDATION_MESSAGES.city;
    }
    
    if (!formData.state.trim()) {
      newErrors.state = VALIDATION_MESSAGES.required;
    } else if (formData.state.length < 2 || formData.state.length > 50) {
      newErrors.state = VALIDATION_MESSAGES.state;
    }
    
    const zipCodeError = validateZipCode(formData.zipCode);
    if (zipCodeError) {
      newErrors.zipCode = zipCodeError;
    }
    
    // Emergency Contact
    const emergencyErrors = validateEmergencyContact();
    Object.assign(newErrors, emergencyErrors);
    
    // Account Security
    if (!formData.password) {
      newErrors.password = VALIDATION_MESSAGES.required;
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = VALIDATION_MESSAGES.password;
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = VALIDATION_MESSAGES.required;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = VALIDATION_MESSAGES.confirmPassword;
    }
    
    // Terms
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = VALIDATION_MESSAGES.acceptTerms;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate different error scenarios (uncomment to test)
          // const random = Math.random();
          // if (random < 0.1) reject(new Error('network_error'));
          // if (random < 0.2) reject(new Error('server_error'));
          
          // For now, always succeed
          resolve();
        }, 3000);
      });

      // Show success message
      setSuccess(true);
      
    } catch (error) {
      console.error('Registration error:', error);
      
      switch (error.message) {
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

  // Handle resend verification email
  const handleResendVerification = () => {
    // TODO: Implement resend verification email
    alert('Verification email resent!');
  };

  // Handle go to login
  const handleGoToLogin = () => {
    window.location.href = '/patient-login';
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-health-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-health-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-health-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={HEALTHCARE.icons.check} />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Health First!</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your account has been created successfully. We're excited to have you on board!
            </p>
          </div>

          {/* Welcome Message */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">What's Next?</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-primary-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Verify Your Email</h3>
                    <p className="text-gray-600">
                      Check your email at <span className="font-medium text-primary-600">{formData.email}</span> and click the verification link to activate your account.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-primary-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Complete Your Profile</h3>
                    <p className="text-gray-600">
                      Add your medical history, insurance information, and preferences to get the most out of your experience.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-primary-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Book Your First Appointment</h3>
                    <p className="text-gray-600">
                      Browse available providers and schedule your first appointment with ease.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 mb-4">Dashboard Preview</h3>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Upcoming Appointments</span>
                    <span className="text-sm font-medium text-gray-900">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Medical Records</span>
                    <span className="text-sm font-medium text-gray-900">Ready to upload</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Messages</span>
                    <span className="text-sm font-medium text-gray-900">0 unread</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Insurance</span>
                    <span className="text-sm font-medium text-gray-900">Add info</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleResendVerification}
                icon={HEALTHCARE.icons.shield}
                className="flex-1"
              >
                Resend Verification Email
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleGoToLogin}
                className="flex-1"
              >
                Go to Login
              </Button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or contact support.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-health-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center mr-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={HEALTHCARE.icons.user} />
              </svg>
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900">Join Health First</h1>
              <p className="text-xl text-gray-600">Create your account to access personalized healthcare services</p>
            </div>
          </div>
        </div>

        {/* Error Summary */}
        {submitError && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={HEALTHCARE.icons.warning} />
              </svg>
              <div>
                <p className="text-red-600 font-medium">{submitError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {/* Personal Information Section */}
            <div className="mb-10">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={HEALTHCARE.icons.user} />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  onBlur={() => handleFieldBlur('firstName')}
                  error={touched.firstName ? errors.firstName : ''}
                  placeholder="Enter your first name"
                  required
                  disabled={loading}
                  icon={HEALTHCARE.icons.user}
                />
                
                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  onBlur={() => handleFieldBlur('lastName')}
                  error={touched.lastName ? errors.lastName : ''}
                  placeholder="Enter your last name"
                  required
                  disabled={loading}
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleFieldBlur('email')}
                  error={touched.email ? errors.email : ''}
                  placeholder="john@example.com"
                  required
                  disabled={loading}
                  helperText="We'll use this to send you important updates"
                />
                
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  onBlur={() => handleFieldBlur('phone')}
                  error={touched.phone ? errors.phone : ''}
                  placeholder="(555) 123-4567"
                  required
                  disabled={loading}
                  icon={HEALTHCARE.icons.phone}
                />
                
                <Input
                  label="Date of Birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  onBlur={() => handleFieldBlur('dateOfBirth')}
                  error={touched.dateOfBirth ? errors.dateOfBirth : ''}
                  required
                  disabled={loading}
                  icon={HEALTHCARE.icons.calendar}
                />
                
                <Select
                  label="Gender"
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  onBlur={() => handleFieldBlur('gender')}
                  error={touched.gender ? errors.gender : ''}
                  required
                  disabled={loading}
                  options={GENDER_OPTIONS}
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="mb-10">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-health-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-health-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={HEALTHCARE.icons.location} />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Address</h2>
              </div>
              
              <div className="space-y-6">
                <Input
                  label="Street Address"
                  value={formData.streetAddress}
                  onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                  onBlur={() => handleFieldBlur('streetAddress')}
                  error={touched.streetAddress ? errors.streetAddress : ''}
                  placeholder="123 Main Street"
                  required
                  disabled={loading}
                  icon={HEALTHCARE.icons.location}
                />
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Input
                    label="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    onBlur={() => handleFieldBlur('city')}
                    error={touched.city ? errors.city : ''}
                    placeholder="Enter city"
                    required
                    disabled={loading}
                  />
                  
                  <Input
                    label="State"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    onBlur={() => handleFieldBlur('state')}
                    error={touched.state ? errors.state : ''}
                    placeholder="Enter state"
                    required
                    disabled={loading}
                  />
                  
                  <Input
                    label="ZIP Code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    onBlur={() => handleFieldBlur('zipCode')}
                    error={touched.zipCode ? errors.zipCode : ''}
                    placeholder="12345"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="mb-10">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={HEALTHCARE.icons.warning} />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Emergency Contact (Optional)</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Input
                  label="Emergency Contact Name"
                  value={formData.emergencyName}
                  onChange={(e) => handleInputChange('emergencyName', e.target.value)}
                  onBlur={() => handleFieldBlur('emergencyName')}
                  error={touched.emergencyName ? errors.emergencyName : ''}
                  placeholder="Enter contact name"
                  disabled={loading}
                  icon={HEALTHCARE.icons.user}
                />
                
                <Select
                  label="Relationship"
                  value={formData.emergencyRelationship}
                  onChange={(e) => handleInputChange('emergencyRelationship', e.target.value)}
                  onBlur={() => handleFieldBlur('emergencyRelationship')}
                  error={touched.emergencyRelationship ? errors.emergencyRelationship : ''}
                  disabled={loading}
                  options={RELATIONSHIP_OPTIONS}
                />
                
                <Input
                  label="Emergency Contact Phone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  onBlur={() => handleFieldBlur('emergencyPhone')}
                  error={touched.emergencyPhone ? errors.emergencyPhone : ''}
                  placeholder="(555) 123-4567"
                  disabled={loading}
                  icon={HEALTHCARE.icons.phone}
                />
              </div>
            </div>

            {/* Account Security Section */}
            <div className="mb-10">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={HEALTHCARE.icons.lock} />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Account Security</h2>
              </div>
              
              <div className="space-y-6">
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onBlur={() => handleFieldBlur('password')}
                    error={touched.password ? errors.password : ''}
                    placeholder="Create a strong password"
                    required
                    disabled={loading}
                    icon={HEALTHCARE.icons.lock}
                    helperText="Must be at least 8 characters with one special character"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-10 text-gray-400 hover:text-primary-600 focus:outline-none focus:text-primary-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    disabled={loading}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? HEALTHCARE.icons.eyeOff : HEALTHCARE.icons.eye} />
                    </svg>
                  </button>
                </div>
                
                <div className="relative">
                  <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    onBlur={() => handleFieldBlur('confirmPassword')}
                    error={touched.confirmPassword ? errors.confirmPassword : ''}
                    placeholder="Confirm your password"
                    required
                    disabled={loading}
                    icon={HEALTHCARE.icons.lock}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-10 text-gray-400 hover:text-primary-600 focus:outline-none focus:text-primary-600 transition-colors"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    disabled={loading}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showConfirmPassword ? HEALTHCARE.icons.eyeOff : HEALTHCARE.icons.eye} />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-8">
              <Checkbox
                label={
                  <span>
                    I agree to the{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500 underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500 underline">
                      Privacy Policy
                    </a>
                  </span>
                }
                checked={formData.acceptTerms}
                onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                error={touched.acceptTerms ? errors.acceptTerms : ''}
                required
                disabled={loading}
              />
              
              <div className="mt-4">
                <Checkbox
                  label="I would like to receive updates about new features and health tips (optional)"
                  checked={formData.acceptMarketing}
                  onChange={(e) => handleInputChange('acceptMarketing', e.target.checked)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                disabled={loading}
                icon={HEALTHCARE.icons.shield}
                className="flex-1"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleGoToLogin}
                disabled={loading}
                className="flex-1"
              >
                Already have an account?
              </Button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500 underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 