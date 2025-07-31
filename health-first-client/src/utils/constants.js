// Medical Specializations
export const MEDICAL_SPECIALIZATIONS = [
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'endocrinology', label: 'Endocrinology' },
  { value: 'family-medicine', label: 'Family Medicine' },
  { value: 'gastroenterology', label: 'Gastroenterology' },
  { value: 'general-surgery', label: 'General Surgery' },
  { value: 'hematology', label: 'Hematology' },
  { value: 'internal-medicine', label: 'Internal Medicine' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'obstetrics-gynecology', label: 'Obstetrics & Gynecology' },
  { value: 'oncology', label: 'Oncology' },
  { value: 'ophthalmology', label: 'Ophthalmology' },
  { value: 'orthopedics', label: 'Orthopedics' },
  { value: 'otolaryngology', label: 'Otolaryngology (ENT)' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'psychiatry', label: 'Psychiatry' },
  { value: 'pulmonology', label: 'Pulmonology' },
  { value: 'radiology', label: 'Radiology' },
  { value: 'rheumatology', label: 'Rheumatology' },
  { value: 'urology', label: 'Urology' },
  { value: 'emergency-medicine', label: 'Emergency Medicine' },
  { value: 'anesthesiology', label: 'Anesthesiology' },
  { value: 'pathology', label: 'Pathology' },
  { value: 'other', label: 'Other' }
];

// Practice Types
export const PRACTICE_TYPES = [
  { value: 'private-practice', label: 'Private Practice' },
  { value: 'hospital', label: 'Hospital' },
  { value: 'clinic', label: 'Clinic' },
  { value: 'urgent-care', label: 'Urgent Care Center' },
  { value: 'specialty-center', label: 'Specialty Center' },
  { value: 'academic', label: 'Academic Medical Center' },
  { value: 'research', label: 'Research Institution' },
  { value: 'government', label: 'Government Facility' },
  { value: 'military', label: 'Military Medical Facility' },
  { value: 'other', label: 'Other' }
];

// Years of Experience
export const YEARS_OF_EXPERIENCE = Array.from({ length: 51 }, (_, i) => ({
  value: i.toString(),
  label: i === 0 ? 'New Graduate' : `${i} year${i === 1 ? '' : 's'}`
}));

// Medical Degrees
export const MEDICAL_DEGREES = [
  { value: 'md', label: 'MD (Doctor of Medicine)' },
  { value: 'do', label: 'DO (Doctor of Osteopathic Medicine)' },
  { value: 'mbbs', label: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)' },
  { value: 'phd', label: 'PhD (Doctor of Philosophy)' },
  { value: 'dds', label: 'DDS (Doctor of Dental Surgery)' },
  { value: 'dmd', label: 'DMD (Doctor of Medicine in Dentistry)' },
  { value: 'pharmd', label: 'PharmD (Doctor of Pharmacy)' },
  { value: 'dpt', label: 'DPT (Doctor of Physical Therapy)' },
  { value: 'dnp', label: 'DNP (Doctor of Nursing Practice)' },
  { value: 'other', label: 'Other' }
];

// Password Requirements
export const PASSWORD_REQUIREMENTS = [
  {
    label: 'At least 8 characters long',
    test: (password) => password && password.length >= 8
  },
  {
    label: 'Contains at least one uppercase letter',
    test: (password) => password && /[A-Z]/.test(password)
  },
  {
    label: 'Contains at least one lowercase letter',
    test: (password) => password && /[a-z]/.test(password)
  },
  {
    label: 'Contains at least one number',
    test: (password) => password && /[0-9]/.test(password)
  },
  {
    label: 'Contains at least one special character',
    test: (password) => password && /[^A-Za-z0-9]/.test(password)
  }
];

// US States
export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
];

// Form Validation Messages
export const VALIDATION_MESSAGES = {
  required: 'This field is required.',
  email: 'Please enter a valid email address.',
  phone: 'Please enter a valid phone number.',
  password: 'Password must meet all requirements.',
  confirmPassword: 'Passwords do not match.',
  licenseNumber: 'Please enter a valid medical license number.',
  zipCode: 'Please enter a valid ZIP code.',
  fileSize: 'File size must be less than 5MB.',
  fileType: 'Please select an image file (PNG, JPG, GIF).'
}; 