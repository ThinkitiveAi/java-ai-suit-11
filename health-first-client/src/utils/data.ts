import type { MedicalSpecialization, PracticeType, StateOption } from '../types/auth';

export const medicalSpecializations: MedicalSpecialization[] = [
  // Primary Care
  { value: 'family-medicine', label: 'Family Medicine', category: 'Primary Care' },
  { value: 'internal-medicine', label: 'Internal Medicine', category: 'Primary Care' },
  { value: 'pediatrics', label: 'Pediatrics', category: 'Primary Care' },
  { value: 'geriatrics', label: 'Geriatrics', category: 'Primary Care' },
  
  // Surgical Specialties
  { value: 'cardiology', label: 'Cardiology', category: 'Surgical Specialties' },
  { value: 'cardiac-surgery', label: 'Cardiac Surgery', category: 'Surgical Specialties' },
  { value: 'orthopedics', label: 'Orthopedics', category: 'Surgical Specialties' },
  { value: 'neurosurgery', label: 'Neurosurgery', category: 'Surgical Specialties' },
  { value: 'general-surgery', label: 'General Surgery', category: 'Surgical Specialties' },
  { value: 'plastic-surgery', label: 'Plastic Surgery', category: 'Surgical Specialties' },
  
  // Medical Specialties
  { value: 'dermatology', label: 'Dermatology', category: 'Medical Specialties' },
  { value: 'neurology', label: 'Neurology', category: 'Medical Specialties' },
  { value: 'psychiatry', label: 'Psychiatry', category: 'Medical Specialties' },
  { value: 'oncology', label: 'Oncology', category: 'Medical Specialties' },
  { value: 'endocrinology', label: 'Endocrinology', category: 'Medical Specialties' },
  { value: 'gastroenterology', label: 'Gastroenterology', category: 'Medical Specialties' },
  { value: 'pulmonology', label: 'Pulmonology', category: 'Medical Specialties' },
  { value: 'nephrology', label: 'Nephrology', category: 'Medical Specialties' },
  { value: 'rheumatology', label: 'Rheumatology', category: 'Medical Specialties' },
  
  // Emergency & Critical Care
  { value: 'emergency-medicine', label: 'Emergency Medicine', category: 'Emergency & Critical Care' },
  { value: 'critical-care', label: 'Critical Care Medicine', category: 'Emergency & Critical Care' },
  { value: 'anesthesiology', label: 'Anesthesiology', category: 'Emergency & Critical Care' },
  
  // Diagnostic & Imaging
  { value: 'radiology', label: 'Radiology', category: 'Diagnostic & Imaging' },
  { value: 'pathology', label: 'Pathology', category: 'Diagnostic & Imaging' },
  { value: 'nuclear-medicine', label: 'Nuclear Medicine', category: 'Diagnostic & Imaging' },
  
  // Other Specialties
  { value: 'obstetrics-gynecology', label: 'Obstetrics & Gynecology', category: 'Other Specialties' },
  { value: 'ophthalmology', label: 'Ophthalmology', category: 'Other Specialties' },
  { value: 'otolaryngology', label: 'Otolaryngology (ENT)', category: 'Other Specialties' },
  { value: 'urology', label: 'Urology', category: 'Other Specialties' },
  { value: 'physical-medicine', label: 'Physical Medicine & Rehabilitation', category: 'Other Specialties' },
  { value: 'preventive-medicine', label: 'Preventive Medicine', category: 'Other Specialties' },
  { value: 'pain-management', label: 'Pain Management', category: 'Other Specialties' },
  { value: 'sleep-medicine', label: 'Sleep Medicine', category: 'Other Specialties' },
  { value: 'sports-medicine', label: 'Sports Medicine', category: 'Other Specialties' },
];

export const practiceTypes: PracticeType[] = [
  { value: 'private-practice', label: 'Private Practice' },
  { value: 'hospital', label: 'Hospital' },
  { value: 'clinic', label: 'Clinic' },
  { value: 'urgent-care', label: 'Urgent Care Center' },
  { value: 'specialty-center', label: 'Specialty Center' },
  { value: 'academic-medical-center', label: 'Academic Medical Center' },
  { value: 'research-institute', label: 'Research Institute' },
  { value: 'telemedicine', label: 'Telemedicine Practice' },
  { value: 'concierge-medicine', label: 'Concierge Medicine' },
  { value: 'group-practice', label: 'Group Practice' },
];

export const stateOptions: StateOption[] = [
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
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'District of Columbia' },
];

export const yearsOfExperienceOptions = Array.from({ length: 51 }, (_, i) => ({
  value: i,
  label: i === 0 ? 'Less than 1 year' : i === 1 ? '1 year' : `${i} years`
})); 