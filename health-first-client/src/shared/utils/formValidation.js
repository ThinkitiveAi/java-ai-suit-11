import * as yup from 'yup';

// Common validation schemas
export const validationSchemas = {
  // Login form validation
  login: yup.object({
    identifier: yup
      .string()
      .required('Email or phone is required')
      .test('email-or-phone', 'Please enter a valid email or phone number', function(value) {
        if (!value) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      }),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    rememberMe: yup.boolean()
  }),

  // Registration form validation
  registration: yup.object({
    firstName: yup
      .string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name cannot exceed 50 characters')
      .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
    
    lastName: yup
      .string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name cannot exceed 50 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
    
    email: yup
      .string()
      .required('Email is required')
      .email('Please enter a valid email address'),
    
    phone: yup
      .string()
      .required('Phone number is required')
      .matches(/^\+?[\d\s\-\(\)]{10,15}$/, 'Please enter a valid phone number'),
    
    dateOfBirth: yup
      .date()
      .required('Date of birth is required')
      .max(new Date(), 'Date of birth cannot be in the future')
      .test('age', 'You must be at least 13 years old', function(value) {
        if (!value) return false;
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        return age >= 13;
      }),
    
    gender: yup
      .string()
      .required('Please select your gender'),
    
    streetAddress: yup
      .string()
      .required('Street address is required')
      .min(5, 'Street address must be at least 5 characters')
      .max(200, 'Street address cannot exceed 200 characters'),
    
    city: yup
      .string()
      .required('City is required')
      .min(2, 'City must be at least 2 characters')
      .max(100, 'City cannot exceed 100 characters'),
    
    state: yup
      .string()
      .required('State is required')
      .min(2, 'State must be at least 2 characters')
      .max(50, 'State cannot exceed 50 characters'),
    
    zipCode: yup
      .string()
      .required('ZIP code is required')
      .matches(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
    
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    
    acceptTerms: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  }),

  // Provider registration validation
  providerRegistration: yup.object({
    firstName: yup
      .string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name cannot exceed 50 characters'),
    
    lastName: yup
      .string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name cannot exceed 50 characters'),
    
    email: yup
      .string()
      .required('Email is required')
      .email('Please enter a valid email address'),
    
    phone: yup
      .string()
      .required('Phone number is required')
      .matches(/^\+?[\d\s\-\(\)]{10,15}$/, 'Please enter a valid phone number'),
    
    licenseNumber: yup
      .string()
      .required('Medical license number is required')
      .matches(/^[a-zA-Z0-9]+$/, 'License number can only contain letters and numbers')
      .min(5, 'License number must be at least 5 characters')
      .max(20, 'License number cannot exceed 20 characters'),
    
    specialization: yup
      .string()
      .required('Specialization is required')
      .min(3, 'Specialization must be at least 3 characters')
      .max(100, 'Specialization cannot exceed 100 characters'),
    
    yearsExperience: yup
      .number()
      .required('Years of experience is required')
      .min(0, 'Years of experience must be at least 0')
      .max(50, 'Years of experience cannot exceed 50'),
    
    practiceName: yup
      .string()
      .required('Practice name is required')
      .min(2, 'Practice name must be at least 2 characters')
      .max(100, 'Practice name cannot exceed 100 characters'),
    
    streetAddress: yup
      .string()
      .required('Street address is required')
      .max(200, 'Street address cannot exceed 200 characters'),
    
    city: yup
      .string()
      .required('City is required')
      .max(100, 'City cannot exceed 100 characters'),
    
    state: yup
      .string()
      .required('State is required')
      .max(50, 'State cannot exceed 50 characters'),
    
    zipCode: yup
      .string()
      .required('ZIP code is required')
      .matches(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
    
    practiceType: yup
      .string()
      .required('Practice type is required'),
    
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    
    acceptTerms: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  }),

  // Availability form validation
  availability: yup.object({
    provider: yup
      .string()
      .required('Provider is required'),
    
    date: yup
      .date()
      .required('Date is required')
      .min(new Date(), 'Date cannot be in the past'),
    
    startTime: yup
      .string()
      .required('Start time is required'),
    
    endTime: yup
      .string()
      .required('End time is required')
      .test('end-after-start', 'End time must be after start time', function(value) {
        const { startTime } = this.parent;
        if (!startTime || !value) return true;
        return value > startTime;
      }),
    
    timezone: yup
      .string()
      .required('Timezone is required'),
    
    slotDuration: yup
      .number()
      .required('Slot duration is required')
      .min(15, 'Slot duration must be at least 15 minutes')
      .max(120, 'Slot duration cannot exceed 120 minutes'),
    
    appointmentType: yup
      .string()
      .required('Appointment type is required'),
    
    locationType: yup
      .string()
      .required('Location type is required'),
    
    address: yup
      .string()
      .when('locationType', {
        is: (locationType) => locationType !== 'telemedicine',
        then: yup.string().required('Address is required for physical locations'),
        otherwise: yup.string()
      }),
    
    baseFee: yup
      .number()
      .min(0, 'Base fee cannot be negative')
      .nullable(),
    
    currency: yup
      .string()
      .required('Currency is required')
  })
};

// Validation helper functions
export const validateField = async (schema, fieldName, value) => {
  try {
    await schema.validateAt(fieldName, { [fieldName]: value });
    return { isValid: true, error: '' };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};

export const validateForm = async (schema, data) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    const errors = {};
    error.inner.forEach((err) => {
      errors[err.path] = err.message;
    });
    return { isValid: false, errors };
  }
};

// Common validation patterns
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]{10,15}$/,
  zipCode: /^\d{5}(-\d{4})?$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  licenseNumber: /^[a-zA-Z0-9]+$/,
  name: /^[a-zA-Z\s]+$/
};

// Validation messages
export const validationMessages = {
  required: 'This field is required.',
  email: 'Please enter a valid email address.',
  phone: 'Please enter a valid phone number.',
  password: 'Password must meet all requirements.',
  confirmPassword: 'Passwords do not match.',
  zipCode: 'Please enter a valid ZIP code.',
  licenseNumber: 'Please enter a valid medical license number.',
  name: 'Name can only contain letters and spaces.',
  minLength: (min) => `Must be at least ${min} characters.`,
  maxLength: (max) => `Cannot exceed ${max} characters.`,
  minValue: (min) => `Must be at least ${min}.`,
  maxValue: (max) => `Cannot exceed ${max}.`,
  invalidFormat: 'Invalid format.',
  networkError: 'Network error. Please check your connection and try again.',
  serverError: 'Server error. Please try again later.',
  invalidCredentials: 'Invalid credentials. Please try again.',
  accountNotFound: 'No account found with this information.',
  duplicateEmail: 'This email is already registered.',
  duplicatePhone: 'This phone number is already registered.',
  duplicateLicense: 'This license number is already registered.'
}; 