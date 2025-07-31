import React, { useState } from 'react';

export default function PatientsLogin() {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Email/phone validation
  const isEmail = (val) => /\S+@\S+\.\S+/.test(val);
  const isPhone = (val) => /^\+?\d{10,15}$/.test(val.replace(/\D/g, ''));

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!credential) {
      setError('Email or phone is required.');
      return;
    }
    if (!isEmail(credential) && !isPhone(credential)) {
      setError('Enter a valid email or phone number.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate login error
      setError('Invalid credentials.');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 relative">
      {/* Subtle medical icon background */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center select-none">
        {/* Example: medical cross SVG */}
        <svg width="200" height="200" fill="none" viewBox="0 0 200 200">
          <rect x="90" y="40" width="20" height="120" rx="10" fill="#2563eb" />
          <rect x="40" y="90" width="120" height="20" rx="10" fill="#059669" />
        </svg>
      </div>
      <form
        className="z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6 border border-blue-100"
        onSubmit={handleLogin}
        aria-label="Patients Login Form"
      >
        <div className="flex flex-col items-center gap-2">
          {/* Logo or icon */}
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-2">
            {/* User icon */}
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
              <circle cx="16" cy="12" r="6" fill="#2563eb" />
              <rect x="6" y="22" width="20" height="8" rx="4" fill="#059669" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-blue-700">Patients Login</h1>
          <p className="text-gray-500 text-sm">Sign in to access your healthcare dashboard</p>
        </div>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1" htmlFor="credential">
            <span className="font-medium text-gray-700">Email or Phone</span>
            <input
              id="credential"
              name="credential"
              type="text"
              autoComplete="username"
              className="input input-bordered border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email or phone"
              value={credential}
              onChange={e => setCredential(e.target.value)}
              aria-invalid={!!error && !credential}
              aria-describedby="credential-error"
              required
            />
          </label>
          <label className="flex flex-col gap-1 relative" htmlFor="password">
            <span className="font-medium text-gray-700">Password</span>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              className="input input-bordered border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              minLength={6}
              aria-invalid={!!error && (!password || password.length < 6)}
              aria-describedby="password-error"
              required
            />
            <button
              type="button"
              tabIndex={0}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-8 text-gray-400 hover:text-blue-600 focus:outline-none"
              onClick={() => setShowPassword(v => !v)}
            >
              {/* Eye icon */}
              {showPassword ? (
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M2 10c2.5-4 7.5-4 10 0s7.5 4 10 0" stroke="#2563eb" strokeWidth="2" /><circle cx="10" cy="10" r="2" fill="#059669" /></svg>
              ) : (
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M2 10c2.5-4 7.5-4 10 0s7.5 4 10 0" stroke="#2563eb" strokeWidth="2" /><circle cx="10" cy="10" r="2" fill="#2563eb" /></svg>
              )}
            </button>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="accent-blue-600"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
            <span className="text-gray-700 text-sm">Remember me</span>
          </label>
          <a href="#" className="text-blue-600 text-sm hover:underline focus:underline focus:outline-none">Forgot password?</a>
        </div>
        {error && (
          <div className="text-red-600 text-sm" id="credential-error" role="alert">{error}</div>
        )}
        <button
          type="submit"
          className={`w-full py-2 rounded-md text-white font-semibold transition-colors flex items-center justify-center gap-2 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
          ) : null}
          {loading ? 'Signing in...' : 'Login'}
        </button>
        <div className="flex flex-col items-center gap-1 mt-2">
          <span className="text-gray-500 text-sm">New patient?</span>
          <a href="#" className="text-green-600 text-sm font-medium hover:underline focus:underline focus:outline-none">Register here</a>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs text-gray-400">
          <a href="#" className="hover:underline">Support</a>
          <span>|</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </form>
    </div>
  );
} 