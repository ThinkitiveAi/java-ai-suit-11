import React, { useEffect } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Toast = ({ id, type = 'info', title, message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircleIcon className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <ExclamationCircleIcon className="w-5 h-5 text-yellow-400" />;
      default:
        return <InformationCircleIcon className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStyles = () => {
    const baseStyles = 'flex w-full max-w-sm bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden';
    
    switch (type) {
      case 'success':
        return `${baseStyles} border-l-4 border-green-400`;
      case 'error':
        return `${baseStyles} border-l-4 border-red-400`;
      case 'warning':
        return `${baseStyles} border-l-4 border-yellow-400`;
      default:
        return `${baseStyles} border-l-4 border-blue-400`;
    }
  };

  return (
    <div
      className={getStyles()}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="flex-1 flex items-center p-4">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <p className="text-sm font-medium text-gray-900">
              {title}
            </p>
          )}
          {message && (
            <p className="mt-1 text-sm text-gray-500">
              {message}
            </p>
          )}
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => onClose(id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close notification"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast; 