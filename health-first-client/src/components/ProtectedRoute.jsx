import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  
  // Check if user is authenticated
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const isAuthenticated = !!userData.id;
  
  // Check if user has the required role
  const userRole = userData.role || localStorage.getItem('selectedRole');
  const hasRequiredRole = allowedRoles.length === 0 || allowedRoles.includes(userRole);

  if (!isAuthenticated) {
    // Redirect to role selection if not authenticated
    return <Navigate to="/" replace />;
  }

  if (!hasRequiredRole) {
    // Redirect to dashboard if user doesn't have required role
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute; 