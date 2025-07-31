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

// Registration Types
export interface RegistrationFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePhoto?: File;
  
  // Professional Information
  medicalLicenseNumber: string;
  specialization: string;
  yearsOfExperience: number;
  medicalDegree: string;
  
  // Practice Information
  clinicName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  practiceType: string;
  
  // Account Security
  password: string;
  confirmPassword: string;
  
  // Terms
  acceptTerms: boolean;
}

export interface RegistrationFormErrors {
  // Personal Information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profilePhoto?: string;
  
  // Professional Information
  medicalLicenseNumber?: string;
  specialization?: string;
  yearsOfExperience?: string;
  medicalDegree?: string;
  
  // Practice Information
  clinicName?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  practiceType?: string;
  
  // Account Security
  password?: string;
  confirmPassword?: string;
  
  // Terms
  acceptTerms?: string;
  
  // General
  general?: string;
}

export interface MedicalSpecialization {
  value: string;
  label: string;
  category?: string;
}

export interface PracticeType {
  value: string;
  label: string;
}

export interface StateOption {
  value: string;
  label: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  userId?: string;
  requiresEmailVerification?: boolean;
} 