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

```
src/
├── components/
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
