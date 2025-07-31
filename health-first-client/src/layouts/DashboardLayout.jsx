import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = userData.role || localStorage.getItem('selectedRole') || 'patient';

  const navigationItems = {
    patient: [
      { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
      { name: 'Appointments', href: '/dashboard/appointments', icon: CalendarIcon },
      { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
    ],
    provider: [
      { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
      { name: 'Patients', href: '/dashboard/patients', icon: UserGroupIcon },
      { name: 'Schedule', href: '/dashboard/schedule', icon: CalendarIcon },
      { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
    ],
  };

  const currentItems = navigationItems[userRole] || navigationItems.patient;

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setSidebarCollapsed(JSON.parse(savedState));
    }
  }, []);

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('selectedRole');
    navigate('/');
  };

  const isActiveRoute = (href) => {
    return location.pathname === href;
  };

  return (
    <div className="w-full h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={handleMobileClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-white shadow-xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      } ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 lg:px-3 border-b border-gray-200 bg-white">
            <div className="flex items-center min-w-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">HF</span>
              </div>
              {!sidebarCollapsed && (
                <h1 className="ml-3 text-xl font-semibold text-gray-900 truncate">
                  HealthFirst
                </h1>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {/* Desktop toggle button */}
              <button
                onClick={handleSidebarToggle}
                className="hidden lg:flex p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <ChevronRightIcon className="h-4 w-4" />
                ) : (
                  <ChevronLeftIcon className="h-4 w-4" />
                )}
              </button>
              {/* Mobile close button */}
              <button
                onClick={handleMobileClose}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="px-4 lg:px-3 py-4 border-b border-gray-200 bg-white">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <UserIcon className="h-6 w-6 text-gray-600" />
              </div>
              {!sidebarCollapsed && (
                <div className="ml-3 min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {userData.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 capitalize truncate">
                    {userRole}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-6 space-y-1 overflow-y-auto">
            {currentItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.href);
                    handleMobileClose();
                  }}
                  className={`group relative flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors 
                    ${sidebarCollapsed ? 'justify-center' : ''}
                  
                    ${
                    isActiveRoute(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="ml-3 truncate">{item.name}</span>
                  )}
                  {/* Tooltip for collapsed state */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-2 py-4 border-t border-gray-200 bg-white">
            <button
              onClick={handleLogout}
              className="group relative flex items-center w-full px-2 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              title={sidebarCollapsed ? "Sign Out" : undefined}
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="ml-3 truncate">Sign Out</span>
              )}
              {/* Tooltip for collapsed state */}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Sign Out
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'
      }`}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              
              <h2 className="ml-2 lg:ml-0 text-lg font-medium text-gray-900">
                {currentItems.find(item => isActiveRoute(item.href))?.name || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Cog6ToothIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 