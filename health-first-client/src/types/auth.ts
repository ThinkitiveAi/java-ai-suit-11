export interface LoginCredentials {
  emailOrPhone: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormData {
  emailOrPhone: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormErrors {
  emailOrPhone?: string;
  password?: string;
  general?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export type InputType = 'email' | 'phone' | 'unknown'; 