<<<<<<< HEAD
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
=======
# HealthFirst Client

A modern React + Tailwind CSS healthcare platform with role-based authentication for patients and providers.

## 🚀 Features

### Role-Based Authentication
- **Role Selection**: Clean entry flow to choose between Patient or Provider
- **Hardcoded Credentials**: Demo login with predefined users
- **Protected Routes**: Role-aware route guards and authentication

### Responsive Dashboard
- **Shared Layout**: Dynamic drawer/sidebar that adapts to user role
- **Mobile-First**: Responsive design with hamburger menu on mobile
- **Role-Specific Navigation**: Different menu items for patients and providers

### User Experience
- **Pixel-Perfect Design**: Clean, modern UI with consistent visual hierarchy
- **Smooth Transitions**: Animated drawer and hover effects
- **Accessibility**: ARIA attributes and keyboard navigation support

## 🛠️ Tech Stack

- **React 19** with modern hooks
- **React Router DOM** for client-side routing
- **Tailwind CSS** for styling
- **Heroicons** for icons
- **Vite** for fast development

## 📁 Project Structure
>>>>>>> 4b26d4976f52d8919c761724da9f5ad381a8eb6c

```
src/
├── components/
<<<<<<< HEAD
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
=======
│   ├── LoginForm.jsx          # Shared login component
│   ├── ProtectedRoute.jsx     # Route protection
│   └── ui/                    # Reusable UI components
├── context/
│   └── AuthContext.jsx        # Authentication state management
├── layouts/
│   └── DashboardLayout.jsx    # Shared dashboard layout
├── pages/
│   ├── RoleSelection.jsx      # Entry point role selection
│   ├── dashboard/
│   │   ├── Dashboard.jsx      # Role-based dashboard router
│   │   ├── PatientDashboard.jsx
│   │   ├── ProviderDashboard.jsx
│   │   └── Profile.jsx
│   └── [legacy pages]         # Original pages (kept for reference)
└── shared/                    # Shared utilities and contexts
```

## 🔐 Authentication

### Demo Credentials

**Patient:**
- Email: `patient@example.com`
- Password: `patient123`

**Provider:**
- Email: `provider@example.com`
- Password: `provider123`

### Authentication Flow

1. **Entry**: User visits `/` and sees role selection
2. **Role Selection**: Choose Patient or Provider → redirects to `/login/:role`
3. **Login**: Enter credentials → validates against hardcoded users
4. **Dashboard**: Successful login → redirects to `/dashboard`
5. **Protected Routes**: All dashboard routes require authentication

## 🎨 UI/UX Features

### Responsive Design
- **Mobile**: Collapsible sidebar with overlay
- **Tablet**: Sidebar with reduced width
- **Desktop**: Full sidebar with main content area

### Visual Hierarchy
- **Color Coding**: Blue for patients, green for providers
- **Consistent Spacing**: Tailwind's spacing scale
- **Typography**: Clear hierarchy with proper font weights

### Interactive Elements
- **Hover States**: Smooth transitions on buttons and cards
- **Active States**: Highlighted navigation items
- **Loading States**: Spinners and disabled states

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## 📱 Usage

### For Patients
1. Select "I am a Patient" on the role selection screen
2. Login with patient credentials
3. Access dashboard with:
   - Upcoming appointments
   - Recent activity
   - Quick actions (book appointment, view records, etc.)

### For Providers
1. Select "I am a Provider" on the role selection screen
2. Login with provider credentials
3. Access dashboard with:
   - Today's appointments
   - Patient management
   - Schedule and analytics

## 🔧 Customization

### Adding New Routes
1. Add route to `App.jsx` under the dashboard layout
2. Update navigation items in `DashboardLayout.jsx`
3. Create corresponding page component

### Styling
- Uses Tailwind CSS utility classes
- Custom colors defined in `tailwind.config.js`
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`

### Authentication
- Currently uses localStorage for demo
- Can be extended to use real API endpoints
- AuthContext provides login/logout functions

## 🧹 Code Quality

- **ESLint**: Configured for React and accessibility
- **Modular Structure**: Clean separation of concerns
- **Reusable Components**: Shared UI components
- **Type Safety**: PropTypes for component validation

## 📝 Notes

- Legacy pages are kept for reference but not used in the new flow
- All authentication is client-side for demo purposes
- Real implementation would require backend API integration
- Profile page is a placeholder for future development

## 🤝 Contributing

1. Follow the existing code structure
2. Use Tailwind CSS for styling
3. Maintain responsive design principles
4. Add proper error handling
5. Test on multiple screen sizes
>>>>>>> 4b26d4976f52d8919c761724da9f5ad381a8eb6c
