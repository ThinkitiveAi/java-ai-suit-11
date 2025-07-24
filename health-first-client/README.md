# HealthFirst Provider Login UI

A professional and modern Provider Login interface built with React, TypeScript, and Material-UI (MUI) for healthcare professionals to securely access their dashboard.

## Features

- **Professional Medical Theme**: Clean design with medical color scheme (primary blue #2563eb, secondary green #059669)
- **Flexible Input**: Accepts both email and phone number for login
- **Real-time Validation**: Smart validation for email, phone, and password fields
- **Password Toggle**: Show/hide password functionality with eye icon
- **Remember Me**: Session persistence checkbox
- **Loading States**: Animated loading button during authentication
- **Error Handling**: Clear error messages for failed login attempts
- **Responsive Design**: Mobile-optimized layout with touch-friendly elements
- **Accessibility**: Screen reader compatible with proper focus management
- **TypeScript**: Fully typed for better development experience

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx          # Main login form component
│   └── common/
│       ├── LoadingButton.tsx      # Reusable loading button
│       └── PasswordInput.tsx      # Password input with toggle
├── hooks/
│   └── useLoginForm.ts            # Custom hook for form management
├── pages/
│   └── ProviderLoginPage.tsx      # Main login page
├── theme/
│   └── index.ts                   # MUI theme configuration
├── types/
│   └── auth.ts                    # TypeScript type definitions
├── utils/
│   └── validation.ts              # Validation utility functions
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

### Email Validation
- Required field validation
- Email format validation
- Real-time feedback

### Phone Validation
- Required field validation
- International phone number support
- Format validation

### Password Validation
- Minimum 8 characters
- At least one letter and one number
- Real-time strength feedback

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
- `LoginForm.tsx`: Main form logic and layout
- `LoadingButton.tsx`: Button styling and behavior
- `PasswordInput.tsx`: Password field functionality

## API Integration

The login form is ready for API integration. Update the `handleLogin` function in `ProviderLoginPage.tsx`:

```typescript
const handleLogin = async (data: LoginFormData) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const result = await response.json();
    // Handle successful login
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
