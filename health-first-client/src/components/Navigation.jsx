import React from 'react';
import { Button } from './index';

const Navigation = () => {
  const navItems = [
    { path: '/provider-login', label: 'Provider Login' },
    { path: '/provider-registration', label: 'Provider Registration' },
    { path: '/provider-registration-new', label: 'Provider Registration (New)' },
    { path: '/provider-availability', label: 'Provider Availability' },
    { path: '/patient-login', label: 'Patient Login' },
    { path: '/patient-registration-new', label: 'Patient Registration (New)' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/patients', label: 'Patients' },
    { path: '/appointments', label: 'Appointments' },
    { path: '/patients-login', label: 'Patient Login (Old)' },
    { path: '/patients-registration', label: 'Patient Registration (Old)' }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="fixed top-4 left-4 z-50 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Navigation</h3>
      <div className="space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation(item.path)}
            className="w-full justify-start text-xs"
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Navigation; 