# 🔐 Authentication System Guide

## Overview

This application uses a **simple, custom JWT-based authentication system** - no NextAuth, no complex OAuth, just straightforward email/password authentication with MongoDB.

## How It Works

### 1. User Registration (Signup)

```
User fills signup form
    ↓
POST /api/auth/signup
    ↓
Validate input (name, email, password)
    ↓
Hash password with bcrypt (12 rounds)
    ↓
Save user to MongoDB
    ↓
Auto-login: Generate JWT token
    ↓
Return user data + token
    ↓
Store in localStorage + HTTP-only cookie
    ↓
Redirect to dashboard
```

### 2. User Login

```
User enters email + password
    ↓
POST /api/auth/login
    ↓
Find user in MongoDB by email
    ↓
Verify password with bcrypt.compare()
    ↓
Generate JWT token (30-minute expiry)
    ↓
Return user data + token
    ↓
Store in localStorage + HTTP-only cookie
    ↓
Track login time for auto-logout
    ↓
Redirect to dashboard
```

### 3. Protected Routes

```
User visits protected page (e.g., /dashboard)
    ↓
AuthGuard component checks for user
    ↓
If no user: Redirect to /login
    ↓
If user exists: Show page content
```

### 4. API Authentication

```
Frontend makes API request
    ↓
Include JWT token in Authorization header
    ↓
API route verifies JWT token
    ↓
Extract userId from token
    ↓
Process request with authenticated user
    ↓
Return response
```

### 5. Auto Logout

```
User logs in
    ↓
Store login timestamp in localStorage
    ↓
Start interval check (every 1 minute)
    ↓
Check if 30 minutes have passed
    ↓
If expired:
    - Clear localStorage
    - Clear cookies
    - Show "Session expired" alert
    - Redirect to home page
```

## Security Features

### Password Security
- ✅ **bcrypt hashing** with 12 rounds (very secure)
- ✅ **Never stored in plain text**
- ✅ **Salt automatically generated** by bcrypt
- ✅ **One-way hashing** (cannot be reversed)

### Token Security
- ✅ **JWT tokens** with 30-minute expiry
- ✅ **HTTP-only cookies** (cannot be accessed by JavaScript)
- ✅ **Secure flag** in production (HTTPS only)
- ✅ **SameSite: strict** (CSRF protection)
- ✅ **Signed with secret key** (cannot be tampered with)

### Session Security
- ✅ **Auto-logout** after 30 minutes
- ✅ **Login time tracking**
- ✅ **Periodic expiry checks**
- ✅ **Clean session cleanup**

## Environment Variables

Only 3 variables needed:

```env
# MongoDB connection
MONGODB_URI=mongodb://localhost:27017/shophub

# JWT signing secret (auto-generated for you)
JWT_SECRET=8f3a9b2c7d1e6f4a5b8c9d0e1f2a3b4c...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## API Endpoints

### POST /api/auth/signup
**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response**:
```json
{
  "message": "User created successfully",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-01-15T10:30:00.000Z"
  }
}
```

### POST /api/auth/login
**Request**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response**:
```json
{
  "message": "Login successful",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Client-Side Storage

### localStorage
```javascript
{
  "shophub_auth_user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "shophub_auth_token": "eyJhbGciOiJIUzI1NiIs...",
  "shophub_login_time": "1705315800000"
}
```

### Cookies
```
auth-token=eyJhbGciOiJIUzI1NiIs...; 
HttpOnly; 
Secure; 
SameSite=Strict; 
Max-Age=1800
```

## Usage in Components

### Check if user is logged in
```typescript
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Please login</div>;
  }
  
  return <div>Welcome, {user.name}!</div>;
}
```

### Protect a page
```typescript
import AuthGuard from '@/components/AuthGuard';

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <div>This page requires authentication</div>
    </AuthGuard>
  );
}
```

### Login/Logout
```typescript
import { useAuth } from '@/context/AuthContext';

function LoginForm() {
  const { signIn, signOut, user } = useAuth();
  
  const handleLogin = async () => {
    try {
      await signIn('john@example.com', 'password123');
      // Redirected to dashboard automatically
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };
  
  const handleLogout = () => {
    signOut(); // Clears everything and redirects to home
  };
  
  return user ? (
    <button onClick={handleLogout}>Logout</button>
  ) : (
    <button onClick={handleLogin}>Login</button>
  );
}
```

## Making Authenticated API Requests

```typescript
const token = localStorage.getItem('shophub_auth_token');

const response = await fetch('/api/cart', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({ items: [...] }),
});
```

## What We're NOT Using

- ❌ **NextAuth** - Too complex for our needs
- ❌ **Refresh tokens** - 30-minute sessions are sufficient
- ❌ **OAuth providers** - Simple email/password only
- ❌ **Session database** - JWT tokens are stateless
- ❌ **Magic links** - Traditional password auth
- ❌ **2FA** - Can be added later if needed

## What We ARE Using

- ✅ **Custom JWT authentication**
- ✅ **MongoDB for user storage**
- ✅ **bcrypt for password hashing**
- ✅ **HTTP-only cookies**
- ✅ **localStorage for client state**
- ✅ **Auto-logout after 30 minutes**
- ✅ **React Context for state management**

## Security Best Practices

### ✅ Implemented
- Password hashing with bcrypt
- JWT token expiry (30 minutes)
- HTTP-only cookies
- Secure cookies in production
- SameSite cookie protection
- Auto-logout on token expiry
- Input validation
- Email uniqueness check

### 🔄 Can Be Added Later
- Rate limiting on login attempts
- Password strength requirements
- Email verification
- Password reset functionality
- Two-factor authentication (2FA)
- Account lockout after failed attempts
- IP-based access control

## Testing Authentication

### 1. Test Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Test Protected Route
```bash
curl http://localhost:3000/api/cart \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Troubleshooting

### "Invalid email or password"
- Check if user exists in MongoDB
- Verify password is correct
- Check if password was hashed properly

### "jwt malformed"
- Token is invalid or corrupted
- Clear localStorage and login again
- Check if JWT_SECRET matches

### "Unauthorized"
- Token is missing or expired
- Login again to get new token
- Check if token is being sent in headers

### Auto-logout not working
- Check if LOGIN_TIME_KEY is in localStorage
- Verify interval is running
- Check browser console for errors

---

**Simple, secure, and straightforward authentication! 🔐**

No complex OAuth flows, no external dependencies, just clean JWT authentication with MongoDB.
