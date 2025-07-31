import React from 'react';
import PatientDashboard from './PatientDashboard';
import ProviderDashboard from './ProviderDashboard';

const Dashboard = () => {
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = userData.role || localStorage.getItem('selectedRole') || 'patient';

  // Render the appropriate dashboard based on user role
  if (userRole === 'provider') {
    return <ProviderDashboard />;
  }

  // Default to patient dashboard
  return <PatientDashboard />;
};

export default Dashboard; 