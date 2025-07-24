import type { ValidationResult, InputType } from '../types/auth';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (supports various formats)
const PHONE_REGEX = /^[+]?[1-9][\d]{0,15}$/;

// Password validation regex (minimum 8 characters, at least one letter and one number)
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  if (!phone.trim()) {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  // Remove all non-digit characters except + for validation
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  if (!PHONE_REGEX.test(cleanPhone)) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }
  
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }
  
  if (!PASSWORD_REGEX.test(password)) {
    return { isValid: false, error: 'Password must contain at least one letter and one number' };
  }
  
  return { isValid: true };
};

export const detectInputType = (value: string): InputType => {
  const cleanValue = value.trim();
  
  if (EMAIL_REGEX.test(cleanValue)) {
    return 'email';
  }
  
  if (PHONE_REGEX.test(cleanValue.replace(/[^\d+]/g, ''))) {
    return 'phone';
  }
  
  return 'unknown';
};

export const validateEmailOrPhone = (value: string): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, error: 'Email or phone number is required' };
  }
  
  const inputType = detectInputType(value);
  
  switch (inputType) {
    case 'email':
      return validateEmail(value);
    case 'phone':
      return validatePhone(value);
    default:
      return { isValid: false, error: 'Please enter a valid email address or phone number' };
  }
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Format based on length
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  
  return phone;
}; 