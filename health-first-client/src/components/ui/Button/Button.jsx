import React, { forwardRef } from 'react';
import { SpinnerIcon } from '@heroicons/react/24/outline';

const Button = forwardRef(({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick, 
  className = '',
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white',
    success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
    warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 text-white',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    link: 'text-blue-600 hover:text-blue-700 underline focus:ring-blue-500'
  };
  
  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;
  
  const isDisabled = disabled || loading;
  
  const renderIcon = () => {
    if (loading) {
      return <SpinnerIcon className="animate-spin h-4 w-4" />;
    }
    return icon;
  };

  const renderContent = () => {
    const iconElement = renderIcon();
    
    if (!iconElement) {
      return children;
    }

    const iconClasses = size === 'sm' || size === 'xs' ? 'h-4 w-4' : 'h-5 w-5';
    const iconWithClasses = React.cloneElement(iconElement, {
      className: `${iconElement.props.className || ''} ${iconClasses}`
    });

    if (iconPosition === 'right') {
      return (
        <>
          {children}
          {iconWithClasses}
        </>
      );
    }

    return (
      <>
        {iconWithClasses}
        {children}
      </>
    );
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={classes}
      aria-disabled={isDisabled}
      {...props}
    >
      {renderContent()}
    </button>
  );
});

Button.displayName = 'Button';

export default Button; 