<img width="500" height="300" alt="screencapture-localhost-3001-profile-2025-07-23-21_51_39" src="https://github.com/user-attachments/assets/dafe2796-bdf7-4970-8e51-e9fced7f1e02" />

<img width="500" height="300" alt="Screenshot (375)" src="https://github.com/user-attachments/assets/2f97f745-af0e-41c4-8fca-ecf851490667" />

<img width="500" height="300" alt="Screenshot (376)" src="https://github.com/user-attachments/assets/100f7bdc-bc77-4016-82d5-2154216a654e" />


## 🌟 Features

- **Phone Number Authentication**: Secure OTP-based login system
- **Modern UI/UX**: Clean, responsive design with smooth transitions
- **Protected Routes**: Middleware-based route protection
- **Real-time Validation**: Form validation with instant feedback
- **Toast Notifications**: Success and error messages
- **Mobile-First**: Optimized for mobile devices
- **Accessibility**: Keyboard navigation and screen reader support

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **State Management**: React Context API
- **Cookie Management**: js-cookie


## Installation & Setup

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

## Demo Mode

### Without Backend
The application includes a **Mock API** that generates real OTP codes for testing:

- **Phone Number**: Must be exactly 12 digits (2-digit country code + 10-digit number)
  - Valid examples: `+91 9876543210`, `+1 2345678901`, `+44 7876543210`
  - Invalid examples: `+1 234567890` (too short), `+123 4567890` (3-digit country code)
- **OTP Generation**: Real 6-digit OTP codes are generated
- **Console Output**: OTP is displayed in browser console (Press F12)
- **Expiration**: OTP expires in 5 minutes
- **Attempts**: Maximum 3 verification attempts per OTP
- **Demo Banner**: Shows when using mock responses

### How to Test
1. Enter a valid phone number (2-digit country code + 10-digit number, e.g., +91 9876543210)
2. Click "Send OTP" button
3. Open browser console (F12 → Console tab)
4. Copy the generated OTP from console
5. Enter the OTP in the verification form
6. Access your profile page

### With Backend
To connect a real backend, see [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed instructions.

## API Integration

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

## Authentication Flow

1. **User enters phone number** on login page
2. **OTP is sent** to the provided phone number
3. **User enters OTP** on verification page
4. **Backend verifies OTP** and returns JWT token
5. **Token is stored** in secure HTTP-only cookies
6. **User is redirected** to profile page
7. **Middleware protects** all subsequent requests

## Security Features

- **JWT Token Storage**: Secure token storage in HTTP-only cookies
- **Route Protection**: Middleware-based route protection
- **Input Validation**: Client and server-side validation
- **Token Expiration**: Automatic token refresh handling
- **XSS Protection**: Secure coding practices
- **CSRF Protection**: Token-based request validation

## 🚀 Build & Deployment

### Build Production Version
```bash
npm run build
```

### Start Production Server
```bash
npm start
```
