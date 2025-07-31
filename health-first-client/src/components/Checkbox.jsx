import React from 'react';

const Checkbox = ({ 
  label,
  checked = false,
  onChange,
  disabled = false,
  required = false,
  error,
  className = '',
  ...props 
}) => {
  const baseClasses = `
    h-5 w-5 
    text-primary-600 
    focus:ring-primary-500 
    border-gray-300 
    rounded-md
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200
  `;
  const classes = `${baseClasses} ${className}`;
  
  return (
    <div className="w-full">
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={classes}
          {...props}
        />
        {label && (
          <label className="ml-3 block text-sm text-gray-700 leading-relaxed">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Checkbox; 