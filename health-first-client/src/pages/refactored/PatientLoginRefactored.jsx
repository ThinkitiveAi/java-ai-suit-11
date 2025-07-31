import React from 'react';
import { useFormWithValidation } from '../../shared/hooks/useForm';
import { validationSchemas } from '../../shared/utils/formValidation';
import { Button, Input } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../shared/context/ToastContext';

export default function PatientLoginRefactored() {
  const { login } = useAuth();
  const { showError } = useToast();

  const form = useFormWithValidation(validationSchemas.login, {
    identifier: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = async (data) => {
    try {
      const result = await login(data);
      if (result.success) {
        return { success: true, message: 'Login successful!' };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred.' };
    }
  };

  const onSubmit = form.handleSubmit(handleSubmit);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Patient Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your patient account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={onSubmit} className="space-y-6">
            <Input
              label="Email or Phone"
              type="text"
              placeholder="Enter your email or phone number"
              required
              error={form.formState.errors.identifier?.message}
              {...form.register('identifier')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              required
              showPasswordToggle
              error={form.formState.errors.password?.message}
              {...form.register('password')}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  {...form.register('rememberMe')}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={form.isSubmitting}
                fullWidth
                disabled={form.isSubmitting}
              >
                {form.isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/patient-registration" className="font-medium text-blue-600 hover:text-blue-500">
                  Register here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 