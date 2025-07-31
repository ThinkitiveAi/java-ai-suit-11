import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './components/App.css';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './shared/context/ToastContext';
import ToastContainer from './components/ui/Toast/ToastContainer';

// Pages
import RoleSelection from './pages/RoleSelection';
import LoginForm from './components/LoginForm';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';
import ProtectedRoute from './components/ProtectedRoute';

// Legacy pages (keeping for reference, can be removed later)
import ProviderLogin from './pages/ProviderLogin';
import ProviderRegistration from './pages/ProviderRegistration';
import ProviderRegistrationNew from './pages/ProviderRegistrationNew';
import ProviderAvailability from './pages/ProviderAvailability';
import PatientLogin from './pages/PatientLogin';
import PatientRegistrationNew from './pages/PatientRegistrationNew';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import PatientsLogin from './pages/PatientsLogin';
import PatientsRegistration from './pages/PatientsRegistration';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<RoleSelection />} />
            <Route path="/login/:role" element={<LoginForm />} />
            
            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="patients" element={<Patients />} />
              <Route path="schedule" element={<ProviderAvailability />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Legacy Routes - Keeping for backward compatibility */}
            <Route path="/provider-login" element={<ProviderLogin />} />
            <Route path="/provider-registration" element={<ProviderRegistration />} />
            <Route path="/provider-registration-new" element={<ProviderRegistrationNew />} />
            <Route path="/provider-availability" element={<ProviderAvailability />} />
            <Route path="/patient-login" element={<PatientLogin />} />
            <Route path="/patient-registration-new" element={<PatientRegistrationNew />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/patients-login" element={<PatientsLogin />} />
            <Route path="/patients-registration" element={<PatientsRegistration />} />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <ToastContainer />
      </ToastProvider>
    </AuthProvider>
  );
}
