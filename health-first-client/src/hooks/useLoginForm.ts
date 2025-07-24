import { useState, useCallback } from 'react';
import type { LoginFormData, LoginFormErrors } from '../types/auth';
import { validateEmailOrPhone, validatePassword, detectInputType } from '../utils/validation';

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    emailOrPhone: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateField = useCallback((field: keyof LoginFormData, value: string | boolean) => {
    let isValid = true;
    let error = '';

    switch (field) {
      case 'emailOrPhone': {
        const emailOrPhoneValidation = validateEmailOrPhone(value as string);
        isValid = emailOrPhoneValidation.isValid;
        error = emailOrPhoneValidation.error || '';
        break;
      }
      case 'password': {
        const passwordValidation = validatePassword(value as string);
        isValid = passwordValidation.isValid;
        error = passwordValidation.error || '';
        break;
      }
      default:
        break;
    }

    return { isValid, error };
  }, []);

  const handleInputChange = useCallback((field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (field in errors && errors[field as keyof LoginFormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleBlur = useCallback((field: keyof LoginFormData) => {
    const value = formData[field];
    if (typeof value === 'string') {
      const validation = validateField(field, value);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, [field]: validation.error }));
      }
    }
  }, [formData, validateField]);

  const validateForm = useCallback((): boolean => {
    const newErrors: LoginFormErrors = {};

    // Validate email/phone
    const emailOrPhoneValidation = validateField('emailOrPhone', formData.emailOrPhone);
    if (!emailOrPhoneValidation.isValid) {
      newErrors.emailOrPhone = emailOrPhoneValidation.error;
    }

    // Validate password
    const passwordValidation = validateField('password', formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  const handleSubmit = useCallback(async (onSubmit: (data: LoginFormData) => Promise<void>) => {
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

  const getInputType = useCallback(() => {
    return detectInputType(formData.emailOrPhone);
  }, [formData.emailOrPhone]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return {
    formData,
    errors,
    isLoading,
    showPassword,
    handleInputChange,
    handleBlur,
    handleSubmit,
    getInputType,
    togglePasswordVisibility,
  };
}; 