import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    // Store role in localStorage for persistence
    localStorage.setItem('selectedRole', role);
    navigate(`/login/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to HealthFirst
            </h1>
            <p className="text-gray-600">
              Choose your role to continue
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="space-y-4">
            {/* Patient Card */}
            <button
              onClick={() => handleRoleSelect('patient')}
              className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <UserIcon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-900">
                    I am a Patient
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-blue-700">
                    Access your health records and appointments
                  </p>
                </div>
              </div>
            </button>

            {/* Provider Card */}
            <button
              onClick={() => handleRoleSelect('provider')}
              className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <UserGroupIcon className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-900">
                    I am a Provider
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-green-700">
                    Manage patients and schedule appointments
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Secure healthcare platform for patients and providers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection; 