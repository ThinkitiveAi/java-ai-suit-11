import React, { forwardRef } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

const FormField = forwardRef(({ 
  label,
  error,
  required = false,
  helpText,
  id,
  className = '',
  children,
  ...props 
}, ref) => {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${fieldId}-error` : undefined;
  const helpId = helpText ? `${fieldId}-help` : undefined;
  const describedBy = [errorId, helpId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={fieldId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && (
            <span 
              className="text-red-500 ml-1" 
              aria-label="required"
            >
              *
            </span>
          )}
        </label>
      )}
      
      <div className="relative">
        {React.cloneElement(children, {
          id: fieldId,
          ref,
          'aria-describedby': describedBy,
          'aria-invalid': error ? 'true' : 'false',
          ...props
        })}
        
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon 
              className="h-5 w-5 text-red-500" 
              aria-hidden="true" 
            />
          </div>
        )}
      </div>
      
      {error && (
        <p 
          id={errorId} 
          className="mt-1 text-sm text-red-600" 
          role="alert"
        >
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p 
          id={helpId} 
          className="mt-1 text-sm text-gray-500"
        >
          {helpText}
        </p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField; 