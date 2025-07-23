# Backend Setup Guide

## 🚀 Quick Start with Mock API

The frontend application automatically detects if a backend is available and falls back to mock API responses for demonstration purposes. This allows you to test the complete authentication flow without setting up a backend.

### Demo Credentials
- **Phone Number**: Any valid phone number format (e.g., +1234567890)
- **OTP**: Generated real 6-digit codes (check browser console - Press F12)

### Mock API Features
- ✅ **Real OTP Generation**: 6-digit random codes
- ✅ **Console Logging**: OTP displayed in browser console
- ✅ **Expiration**: 5-minute validity period
- ✅ **Attempt Limiting**: Maximum 3 attempts per OTP
- ✅ **Realistic Delays**: Network simulation with delays

## 🔧 Backend API Requirements

To connect a real backend, you'll need to implement the following endpoints:

### Base URL
```
http://localhost:3004
```

### Endpoints

#### 1. Send OTP
```http
POST /api/auth/send-otp
Content-Type: application/json

{
  "phoneNumber": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

#### 2. Verify OTP
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "phoneNumber": "+1234567890",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "phoneNumber": "+1234567890",
    "name": "User Name"
  }
}
```

#### 3. Get Profile
```http
GET /api/auth/profile
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "phoneNumber": "+1234567890",
    "name": "User Name",
    "createdAt": "2025-01-01T00:00:00Z"
  }
}
```

#### 4. Logout
```http
POST /api/auth/logout
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## 🛠️ Sample Backend Implementation

### Node.js + Express Example

```javascript
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'your-secret-key';
const users = new Map(); // In production, use a proper database

// Send OTP endpoint
app.post('/api/auth/send-otp', (req, res) => {
  const { phoneNumber } = req.body;
  
  // In production, integrate with SMS service like Twilio
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store OTP temporarily (use Redis in production)
  users.set(phoneNumber, { otp, timestamp: Date.now() });
  
  console.log(`OTP for ${phoneNumber}: ${otp}`);
  
  res.json({
    success: true,
    message: 'OTP sent successfully'
  });
});

// Verify OTP endpoint
app.post('/api/auth/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body;
  
  const userData = users.get(phoneNumber);
  if (!userData || userData.otp !== otp) {
    return res.status(400).json({
      success: false,
      message: 'Invalid OTP'
    });
  }
  
  // Check OTP expiry (5 minutes)
  if (Date.now() - userData.timestamp > 5 * 60 * 1000) {
    return res.status(400).json({
      success: false,
      message: 'OTP expired'
    });
  }
  
  // Generate JWT token
  const token = jwt.sign({ phoneNumber }, JWT_SECRET, { expiresIn: '7d' });
  
  // Store user
  users.set(phoneNumber, { 
    id: `user_${Date.now()}`,
    phoneNumber,
    createdAt: new Date().toISOString()
  });
  
  res.json({
    success: true,
    token,
    user: {
      id: users.get(phoneNumber).id,
      phoneNumber
    }
  });
});

// Profile endpoint
app.get('/api/auth/profile', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.get(decoded.phoneNumber);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  // In production, blacklist the token
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

app.listen(3004, () => {
  console.log('Backend API running on http://localhost:3004');
});
```

### Package.json for Backend
```json
{
  "name": "agrikhet-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

## 📱 SMS Integration

For production, integrate with SMS services:

### Twilio Example
```javascript
const twilio = require('twilio');
const client = twilio(accountSid, authToken);

const sendOTP = async (phoneNumber, otp) => {
  await client.messages.create({
    body: `Your AgriKhet verification code is: ${otp}`,
    from: '+1234567890', // Your Twilio number
    to: phoneNumber
  });
};
```

### AWS SNS Example
```javascript
const AWS = require('aws-sdk');
const sns = new AWS.SNS();

const sendOTP = async (phoneNumber, otp) => {
  await sns.publish({
    PhoneNumber: phoneNumber,
    Message: `Your AgriKhet verification code is: ${otp}`
  }).promise();
};
```

## 🔒 Security Considerations

1. **OTP Expiry**: Implement OTP expiration (5-10 minutes)
2. **Rate Limiting**: Limit OTP requests per phone number
3. **JWT Security**: Use strong secrets and proper expiration
4. **HTTPS**: Always use HTTPS in production
5. **Input Validation**: Validate phone numbers and OTP format
6. **Logging**: Log authentication attempts for security monitoring

## 🚀 Deployment

1. **Frontend**: Deploy to Vercel, Netlify, or any static hosting
2. **Backend**: Deploy to AWS, Google Cloud, or any cloud provider
3. **Database**: Use PostgreSQL, MongoDB, or any preferred database
4. **SMS Service**: Configure Twilio, AWS SNS, or similar service

## 📝 Environment Variables

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

### Backend (.env)
```bash
JWT_SECRET=your-super-secret-jwt-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-number
DATABASE_URL=your-database-connection-string
```

---

**Ready to connect your backend! 🚀**
