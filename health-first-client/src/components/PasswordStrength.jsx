import React from 'react';

const PasswordStrength = ({ password, requirements = [] }) => {
  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const getStrengthText = (strength) => {
    switch (strength) {
      case 'weak': return 'Weak';
      case 'medium': return 'Medium';
      case 'strong': return 'Strong';
      default: return '';
    }
  };

  const calculateStrength = (password) => {
    if (!password) return { strength: 'none', score: 0 };
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Determine strength level
    if (score <= 2) return { strength: 'weak', score };
    if (score <= 4) return { strength: 'medium', score };
    return { strength: 'strong', score };
  };

  const { strength, score } = calculateStrength(password);
  const maxScore = 6;

  return (
    <div className="space-y-2">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Password strength:</span>
          <span className={`font-medium ${
            strength === 'weak' ? 'text-red-600' :
            strength === 'medium' ? 'text-yellow-600' :
            strength === 'strong' ? 'text-green-600' : 'text-gray-500'
          }`}>
            {getStrengthText(strength)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(strength)}`}
            style={{ width: `${(score / maxScore) * 100}%` }}
          />
        </div>
      </div>

      {/* Requirements List */}
      {requirements.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs text-gray-600 font-medium">Requirements:</p>
          <ul className="space-y-1">
            {requirements.map((requirement, index) => {
              const isMet = requirement.test(password);
              return (
                <li key={index} className="flex items-center text-xs">
                  <span className={`mr-2 ${isMet ? 'text-green-500' : 'text-gray-400'}`}>
                    {isMet ? '✓' : '○'}
                  </span>
                  <span className={isMet ? 'text-gray-700' : 'text-gray-500'}>
                    {requirement.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrength; 