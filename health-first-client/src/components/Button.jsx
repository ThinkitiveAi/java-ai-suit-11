import React from 'react';
import { HEALTHCARE } from '../shared/constants/design-tokens';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  onClick, 
  className = '',
  icon,
  iconPosition = 'left',
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center 
    font-medium rounded-lg 
    transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed
    font-sans
  `;
  
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white shadow-sm hover:shadow-md',
    secondary: 'bg-gray-100 hover:bg-gray-200 focus:ring-gray-500 text-gray-900 border border-gray-300',
    success: 'bg-health-600 hover:bg-health-700 focus:ring-health-500 text-white shadow-sm hover:shadow-md',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 bg-transparent',
    ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500 bg-transparent',
    subtle: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 bg-transparent'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  const renderIcon = () => {
    if (!icon) return null;
    
    const iconClasses = size === 'sm' ? 'w-4 h-4' : size === 'lg' || size === 'xl' ? 'w-5 h-5' : 'w-4 h-4';
    const iconSpacing = size === 'sm' ? 'mr-1.5' : size === 'lg' || size === 'xl' ? 'mr-2' : 'mr-1.5';
    
    return (
      <svg 
        className={`${iconClasses} ${iconPosition === 'left' ? iconSpacing : 'ml-2'}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
    );
  };
  
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!loading && icon && iconPosition === 'left' && renderIcon()}
      {children}
      {!loading && icon && iconPosition === 'right' && renderIcon()}
    </button>
  );
};

export default Button; 