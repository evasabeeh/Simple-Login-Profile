# AgriKhet - Phone Number Authentication System

A modern, responsive authentication system built with Next.js 15 that implements phone number-based OTP authentication.

## 🌟 Features

- **Phone Number Authentication**: Secure OTP-based login system
- **Modern UI/UX**: Clean, responsive design with smooth transitions
- **Protected Routes**: Middleware-based route protection
- **Real-time Validation**: Form validation with instant feedback
- **Toast Notifications**: Success and error messages
- **Mobile-First**: Optimized for mobile devices
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **State Management**: React Context API
- **Cookie Management**: js-cookie

## 📱 Pages

1. **Login Page** (`/auth/login`)
   - Phone number input with validation
   - Clean, modern interface
   - Automatic OTP sending

2. **OTP Verification** (`/auth/verify-otp`)
   - 6-digit OTP input
   - Auto-focus and paste support
   - Resend OTP functionality with countdown timer
   - Back navigation

3. **Profile Page** (`/profile`)
   - User information display
   - Authentication status
   - Logout functionality
   - Quick actions panel

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Environment Configuration
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3004
```

**Note**: If no backend is running, the app automatically uses mock API responses for demonstration.

### Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🧪 Demo Mode

### Without Backend
The application includes a **Mock API** that automatically activates when no backend is detected:

- **Phone Number**: Enter any valid phone number format
- **OTP**: Use any 6-digit number (e.g., `123456`)
- **Demo Banner**: Shows when using mock responses

### With Backend
To connect a real backend, see [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed instructions.

## 🔒 API Integration

The application supports both **real backend integration** and **mock API responses** for demonstration.

### Auto-Detection
- **Real Backend**: Connects when API is available at configured URL
- **Mock API**: Automatically activates when backend is unavailable
- **Fallback**: Falls back to mock API if real API fails

### Backend Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/send-otp` | Send OTP to mobile | No |
| POST | `/api/auth/verify-otp` | Verify OTP & login | No |
| GET | `/api/auth/profile` | Get user profile | Yes |
| POST | `/api/auth/logout` | Logout user | Yes |

### Setup Real Backend
For detailed backend setup instructions, see [BACKEND_SETUP.md](./BACKEND_SETUP.md).

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/send-otp` | Send OTP to mobile | No |
| POST | `/api/auth/verify-otp` | Verify OTP & login | No |
| GET | `/api/auth/profile` | Get user profile | Yes |
| POST | `/api/auth/logout` | Logout user | Yes |

### API Request/Response Examples

**Send OTP:**
```javascript
// Request
POST /api/auth/send-otp
{
  "phoneNumber": "+1234567890"
}

// Response
{
  "success": true,
  "message": "OTP sent successfully"
}
```

**Verify OTP:**
```javascript
// Request
POST /api/auth/verify-otp
{
  "phoneNumber": "+1234567890",
  "otp": "123456"
}

// Response
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "phoneNumber": "+1234567890"
  }
}
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/
│   │   ├── login/         # Login page
│   │   └── verify-otp/    # OTP verification page
│   ├── profile/           # Protected profile page
│   ├── layout.js          # Root layout with providers
│   ├── page.js            # Home page (redirects)
│   ├── error.js           # Error boundary
│   ├── not-found.js       # 404 page
│   ├── loading.js         # Loading page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── Button.js          # Button component
│   ├── Input.js           # Input component
│   └── Loading.js         # Loading components
├── contexts/              # React contexts
│   └── AuthContext.js     # Authentication context
├── utils/                 # Utility functions
│   ├── api.js             # API client configuration
│   └── helpers.js         # Helper functions
└── middleware.js          # Route protection middleware
```

## 🔐 Authentication Flow

1. **User enters phone number** on login page
2. **OTP is sent** to the provided phone number
3. **User enters OTP** on verification page
4. **Backend verifies OTP** and returns JWT token
5. **Token is stored** in secure HTTP-only cookies
6. **User is redirected** to profile page
7. **Middleware protects** all subsequent requests

## 🎨 UI/UX Features

### Design Elements
- **Modern Gradient Backgrounds**: Beautiful blue-to-indigo gradients
- **Card-based Layout**: Clean white cards with subtle shadows
- **Responsive Grid**: Mobile-first responsive design
- **Icon Integration**: SVG icons for better visual hierarchy
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages

### User Experience
- **Auto-focus**: Automatic focus on input fields
- **Keyboard Navigation**: Full keyboard accessibility
- **Paste Support**: OTP can be pasted as a complete string
- **Real-time Validation**: Instant feedback on form inputs
- **Toast Notifications**: Non-intrusive success/error messages
- **Smooth Transitions**: CSS transitions for better feel

## 🛡️ Security Features

- **JWT Token Storage**: Secure token storage in HTTP-only cookies
- **Route Protection**: Middleware-based route protection
- **Input Validation**: Client and server-side validation
- **Token Expiration**: Automatic token refresh handling
- **XSS Protection**: Secure coding practices
- **CSRF Protection**: Token-based request validation

## 📱 Mobile Optimization

- **Mobile-First Design**: Optimized for mobile devices
- **Touch-Friendly**: Large touch targets for better usability
- **Responsive Typography**: Scalable text for all screen sizes
- **Optimized Images**: Proper image optimization
- **Fast Loading**: Minimal bundle size for quick loading

## 🚀 Build & Deployment

### Build Production Version
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Lint Code
```bash
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

Built with ❤️ using Next.js and Tailwind CSS