import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { useToast } from '../context/ToastContext';

export const useFormWithValidation = (schema, defaultValues = {}, options = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useToast();

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: options.mode || 'onChange',
    ...options
  });

  const handleSubmit = useCallback(async (onSuccess, onError) => {
    setIsSubmitting(true);
    
    try {
      const isValid = await form.trigger();
      if (!isValid) {
        showError('Please correct the errors below before submitting.');
        return;
      }

      const data = form.getValues();
      const result = await onSuccess(data);
      
      if (result?.success) {
        showSuccess(result.message || 'Form submitted successfully!');
        form.reset();
      } else {
        showError(result?.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showError(error.message || 'An unexpected error occurred.');
      onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, showSuccess, showError]);

  const resetForm = useCallback(() => {
    form.reset();
  }, [form]);

  const setFieldError = useCallback((field, message) => {
    form.setError(field, { type: 'manual', message });
  }, [form]);

  const clearFieldError = useCallback((field) => {
    form.clearErrors(field);
  }, [form]);

  return {
    ...form,
    isSubmitting,
    handleSubmit,
    resetForm,
    setFieldError,
    clearFieldError
  };
};

export const useFormField = (form, fieldName) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    clearErrors
  } = form;

  const value = watch(fieldName);
  const error = errors[fieldName]?.message;
  const isTouched = errors[fieldName]?.type === 'manual' || value !== undefined;

  const handleChange = useCallback((newValue) => {
    setValue(fieldName, newValue, { shouldValidate: true });
    if (error) {
      clearErrors(fieldName);
    }
  }, [setValue, fieldName, error, clearErrors]);

  const handleBlur = useCallback(() => {
    form.trigger(fieldName);
  }, [form, fieldName]);

  return {
    value,
    error,
    isTouched,
    register: register(fieldName),
    handleChange,
    handleBlur,
    setValue: (value) => setValue(fieldName, value),
    clearError: () => clearErrors(fieldName)
  };
}; 