import { useState, useCallback } from 'react';
import type { RegistrationFormData, RegistrationFormErrors } from '../types/auth';
import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateMedicalLicense,
  validateRequired,
  validateZipCode,
  validateYearsOfExperience,
  validateFileSize,
  validateFileType,
  getPasswordStrength,
} from '../utils/validation';

export const useRegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Professional Information
    medicalLicenseNumber: '',
    specialization: '',
    yearsOfExperience: 0,
    medicalDegree: '',
    
    // Practice Information
    clinicName: '',
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
  });

  const [errors, setErrors] = useState<RegistrationFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateField = useCallback((field: keyof RegistrationFormData, value: string | number | boolean | File | undefined) => {
    let isValid = true;
    let error = '';

    switch (field) {
      case 'firstName': {
        const validation = validateName(value as string, 'First name');
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'lastName': {
        const validation = validateName(value as string, 'Last name');
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'email': {
        const validation = validateEmail(value as string);
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'phone': {
        const validation = validatePhone(value as string);
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'medicalLicenseNumber': {
        const validation = validateMedicalLicense(value as string);
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'specialization': {
        const validation = validateRequired(value as string, 'Specialization');
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'yearsOfExperience': {
        const validation = validateYearsOfExperience(value as number);
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'medicalDegree': {
        const validation = validateRequired(value as string, 'Medical degree');
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'clinicName': {
        const validation = validateRequired(value as string, 'Clinic name');
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'streetAddress': {
        const validation = validateRequired(value as string, 'Street address');
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'city': {
        const validation = validateRequired(value as string, 'City');
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'state': {
        const validation = validateRequired(value as string, 'State');
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'zipCode': {
        const validation = validateZipCode(value as string);
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'practiceType': {
        const validation = validateRequired(value as string, 'Practice type');
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'password': {
        const validation = validatePassword(value as string);
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'confirmPassword': {
        const validation = validateConfirmPassword(formData.password, value as string);
        isValid = validation.isValid;
        error = validation.error || '';
        break;
      }
      case 'acceptTerms': {
        isValid = value as boolean;
        error = isValid ? '' : 'You must accept the terms and conditions';
        break;
      }
      default:
        break;
    }

    return { isValid, error };
  }, [formData.password]);

  const handleInputChange = useCallback((field: keyof RegistrationFormData, value: string | number | boolean | File) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (field in errors && errors[field as keyof RegistrationFormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleBlur = useCallback((field: keyof RegistrationFormData) => {
    const value = formData[field];
    if (value !== undefined) {
      const validation = validateField(field, value);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, [field]: validation.error }));
      }
    }
  }, [formData, validateField]);

  const validateForm = useCallback((): boolean => {
    const newErrors: RegistrationFormErrors = {};

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      const field = key as keyof RegistrationFormData;
      const value = formData[field];
      const validation = validateField(field, value);
      
      if (!validation.isValid) {
        newErrors[field as keyof RegistrationFormErrors] = validation.error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  const handleSubmit = useCallback(async (onSubmit: (data: RegistrationFormData) => Promise<void>) => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: error instanceof Error ? error.message : 'An unexpected error occurred',
      }));
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm]);

  const handleFileUpload = useCallback((file: File) => {
    // Validate file type
    const typeValidation = validateFileType(file);
    if (!typeValidation.isValid) {
      setErrors(prev => ({ ...prev, profilePhoto: typeValidation.error }));
      return false;
    }

    // Validate file size
    const sizeValidation = validateFileSize(file, 5);
    if (!sizeValidation.isValid) {
      setErrors(prev => ({ ...prev, profilePhoto: sizeValidation.error }));
      return false;
    }

    // Clear any existing file errors
    setErrors(prev => ({ ...prev, profilePhoto: undefined }));
    setFormData(prev => ({ ...prev, profilePhoto: file }));
    return true;
  }, []);

  const getPasswordStrengthInfo = useCallback(() => {
    return getPasswordStrength(formData.password);
  }, [formData.password]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  return {
    formData,
    errors,
    isLoading,
    showPassword,
    showConfirmPassword,
    handleInputChange,
    handleBlur,
    handleSubmit,
    handleFileUpload,
    getPasswordStrengthInfo,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
}; 