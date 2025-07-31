# HealthFirst Provider Registration UI

A comprehensive and professional Provider Registration interface built with React, TypeScript, and Material-UI (MUI) for healthcare professionals to register and create their profiles.

## Features

- **Professional Medical Theme**: Clean design with medical color scheme (primary blue #2563eb, secondary green #059669)
- **Comprehensive Form**: All required fields for healthcare provider registration
- **Photo Upload**: Drag-and-drop profile photo upload with preview
- **Smart Validation**: Real-time validation for all form fields
- **Password Strength**: Visual password strength indicator
- **Medical Specializations**: Comprehensive dropdown with medical specialties
- **Practice Information**: Complete practice details collection
- **Responsive Design**: Mobile-optimized layout with touch-friendly elements
- **Accessibility**: Screen reader compatible with proper focus management
- **TypeScript**: Fully typed for better development experience

## Form Sections

### Personal Information
- First Name & Last Name
- Email Address
- Phone Number
- Profile Photo Upload (drag-and-drop)

### Professional Information
- Medical License Number
- Specialization (dropdown with categories)
- Years of Experience
- Medical Degree/Qualifications

### Practice Information
- Clinic/Hospital Name
- Street Address
- City, State, ZIP Code
- Practice Type

### Account Security
- Password with strength indicator
- Confirm Password
- Terms & Conditions acceptance

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx          # Login form component
│   │   └── RegistrationForm.tsx   # Registration form component
│   └── common/
│       ├── LoadingButton.tsx      # Reusable loading button
│       ├── PasswordInput.tsx      # Password input with toggle
│       ├── PhotoUpload.tsx        # Photo upload component
│       └── PasswordStrengthIndicator.tsx # Password strength indicator
├── hooks/
│   ├── useLoginForm.ts            # Login form management hook
│   └── useRegistrationForm.ts     # Registration form management hook
├── pages/
│   ├── ProviderLoginPage.tsx      # Login page
│   └── ProviderRegistrationPage.tsx # Registration page
├── theme/
│   └── index.ts                   # MUI theme configuration
├── types/
│   └── auth.ts                    # TypeScript type definitions
├── utils/
│   ├── validation.ts              # Validation utility functions
│   └── data.ts                    # Dropdown data (specializations, states, etc.)
└── App.tsx                        # Main app component
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

Start the development server:
```bash
 pnpm dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Design Features

### Color Scheme
- **Primary Blue**: #2563eb (Professional medical blue)
- **Secondary Green**: #059669 (Healthcare green)
- **Background**: Subtle gradient with medical theme colors
- **Text**: High contrast for accessibility

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately for different screen sizes

### Interactive Elements
- **Buttons**: Elevated design with hover effects
- **Input Fields**: Rounded corners with focus states
- **Cards**: Subtle shadows for depth
- **Icons**: Medical-themed icons (stethoscope, security, etc.)

## Form Validation

### Personal Information Validation
- Name validation (letters, spaces, hyphens, apostrophes)
- Email format validation
- Phone number format validation
- Photo upload validation (file type, size)

### Professional Information Validation
- Medical license number format validation
- Required field validation
- Years of experience range validation

### Practice Information Validation
- Required field validation
- ZIP code format validation
- Address validation

### Password Validation
- Minimum 8 characters
- At least one letter and one number
- Password strength indicator
- Confirm password matching

## Medical Specializations

The registration form includes a comprehensive list of medical specializations organized by categories:

- **Primary Care**: Family Medicine, Internal Medicine, Pediatrics, Geriatrics
- **Surgical Specialties**: Cardiology, Cardiac Surgery, Orthopedics, Neurosurgery, etc.
- **Medical Specialties**: Dermatology, Neurology, Psychiatry, Oncology, etc.
- **Emergency & Critical Care**: Emergency Medicine, Critical Care, Anesthesiology
- **Diagnostic & Imaging**: Radiology, Pathology, Nuclear Medicine
- **Other Specialties**: OB/GYN, Ophthalmology, ENT, Urology, etc.

## Practice Types

- Private Practice
- Hospital
- Clinic
- Urgent Care Center
- Specialty Center
- Academic Medical Center
- Research Institute
- Telemedicine Practice
- Concierge Medicine
- Group Practice

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators
- **High Contrast**: Meets WCAG guidelines
- **Semantic HTML**: Proper heading structure

## Security Features

- **Password Masking**: Hidden by default
- **Secure Toggle**: Eye icon for password visibility
- **Form Protection**: Auto-complete attributes
- **Validation**: Client-side validation with server-side support
- **File Upload Security**: File type and size validation

## Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Touch Friendly**: Appropriate button and input sizes
- **Flexible Layout**: Adapts to different screen sizes
- **Orientation Support**: Works in portrait and landscape

## Customization

### Theme Customization
Edit `src/theme/index.ts` to modify:
- Color palette
- Typography
- Component styles
- Spacing and layout

### Component Customization
Each component is modular and can be customized:
- `RegistrationForm.tsx`: Main form logic and layout
- `PhotoUpload.tsx`: Photo upload functionality
- `PasswordStrengthIndicator.tsx`: Password strength display
- `LoadingButton.tsx`: Button styling and behavior

## API Integration

The registration form is ready for API integration. Update the `handleRegistration` function in `ProviderRegistrationPage.tsx`:

```typescript
const handleRegistration = async (data: RegistrationFormData) => {
  try {
    const formData = new FormData();
    
    // Append form fields
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'profilePhoto' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });
    
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    const result = await response.json();
    // Handle successful registration
  } catch (error) {
    // Handle error
  }
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.
