import type { ValidationResult, InputType } from '../types/auth';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (supports various formats)
const PHONE_REGEX = /^[+]?[1-9][\d]{0,15}$/;

// Password validation regex (minimum 8 characters, at least one letter and one number)
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

// Medical license number validation (alphanumeric, 6-12 characters)
const LICENSE_REGEX = /^[A-Z0-9]{6,12}$/;

// ZIP code validation (5 digits or 5+4 format)
const ZIP_REGEX = /^\d{5}(-\d{4})?$/;

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

export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  
  return { isValid: true };
};

export const validateName = (name: string, fieldName: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters long` };
  }
  
  if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
    return { isValid: false, error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` };
  }
  
  return { isValid: true };
};

export const validateMedicalLicense = (license: string): ValidationResult => {
  if (!license.trim()) {
    return { isValid: false, error: 'Medical license number is required' };
  }
  
  if (!LICENSE_REGEX.test(license.trim().toUpperCase())) {
    return { isValid: false, error: 'Please enter a valid medical license number (6-12 alphanumeric characters)' };
  }
  
  return { isValid: true };
};

export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  return { isValid: true };
};

export const validateZipCode = (zipCode: string): ValidationResult => {
  if (!zipCode.trim()) {
    return { isValid: false, error: 'ZIP code is required' };
  }
  
  if (!ZIP_REGEX.test(zipCode.trim())) {
    return { isValid: false, error: 'Please enter a valid ZIP code' };
  }
  
  return { isValid: true };
};

export const validateYearsOfExperience = (years: number): ValidationResult => {
  if (years < 0) {
    return { isValid: false, error: 'Years of experience cannot be negative' };
  }
  
  if (years > 50) {
    return { isValid: false, error: 'Years of experience cannot exceed 50' };
  }
  
  return { isValid: true };
};

export const validateFileSize = (file: File, maxSizeMB: number = 5): ValidationResult => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  if (file.size > maxSizeBytes) {
    return { isValid: false, error: `File size must be less than ${maxSizeMB}MB` };
  }
  
  return { isValid: true };
};

export const validateFileType = (file: File, allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/jpg']): ValidationResult => {
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: `File type must be one of: ${allowedTypes.join(', ')}` };
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

export const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong'; score: number } => {
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[@$!%*?&]/.test(password)) score += 1;
  
  if (score <= 2) return { strength: 'weak', score };
  if (score <= 4) return { strength: 'medium', score };
  return { strength: 'strong', score };
}; 