# 🏗️ Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Header     │  │   Dashboard  │  │  Cart Page   │      │
│  │ (Cart Badge) │  │   (Protected)│  │  (Protected) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Login Page   │  │ Signup Page  │  │  Test Cart   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                      Context Providers                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  AuthContext                                          │   │
│  │  - User state management                             │   │
│  │  - Login/Signup/Logout                               │   │
│  │  - Auto-logout (30 min)                              │   │
│  │  - JWT token management                              │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  CartContext                                          │   │
│  │  - Cart state management                             │   │
│  │  - Add/Remove/Update items                           │   │
│  │  - Sync with MongoDB                                 │   │
│  │  - localStorage persistence                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  ToastContext                                         │   │
│  │  - Success/Error notifications                       │   │
│  │  - Auto-dismiss (3 sec)                              │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Routes (Next.js)                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /api/auth/signup                                     │   │
│  │  POST - Create new user                              │   │
│  │  - Validate input                                    │   │
│  │  - Hash password (bcrypt)                            │   │
│  │  - Save to MongoDB                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /api/auth/login                                      │   │
│  │  POST - Authenticate user                            │   │
│  │  - Verify credentials                                │   │
│  │  - Generate JWT (30 min)                             │   │
│  │  - Set HTTP-only cookie                              │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /api/cart                                            │   │
│  │  GET    - Fetch user cart                            │   │
│  │  POST   - Update cart items                          │   │
│  │  DELETE - Clear cart                                 │   │
│  │  - JWT authentication required                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Mongoose ODM
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      MongoDB Database                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  users Collection                                     │   │
│  │  {                                                    │   │
│  │    _id: ObjectId,                                    │   │
│  │    name: String,                                     │   │
│  │    email: String (unique, indexed),                  │   │
│  │    password: String (bcrypt hashed),                 │   │
│  │    role: String (user/admin),                        │   │
│  │    createdAt: Date,                                  │   │
│  │    updatedAt: Date                                   │   │
│  │  }                                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  carts Collection                                     │   │
│  │  {                                                    │   │
│  │    _id: ObjectId,                                    │   │
│  │    userId: String (unique, indexed),                 │   │
│  │    items: [                                          │   │
│  │      {                                               │   │
│  │        productId: String,                           │   │
│  │        name: String,                                │   │
│  │        price: Number,                               │   │
│  │        quantity: Number,                            │   │
│  │        image: String,                               │   │
│  │        vendorLocation: String,                      │   │
│  │        selectedDeliveryService: Object              │   │
│  │      }                                               │   │
│  │    ],                                                │   │
│  │    createdAt: Date,                                  │   │
│  │    updatedAt: Date                                   │   │
│  │  }                                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Registration Flow
```
User fills signup form
    ↓
POST /api/auth/signup
    ↓
Validate input
    ↓
Hash password (bcrypt)
    ↓
Save to MongoDB users collection
    ↓
Auto-login user
    ↓
Generate JWT token
    ↓
Store in localStorage + cookie
    ↓
Redirect to dashboard
```

### 2. User Login Flow
```
User enters credentials
    ↓
POST /api/auth/login
    ↓
Find user in MongoDB
    ↓
Verify password (bcrypt.compare)
    ↓
Generate JWT token (30 min expiry)
    ↓
Set HTTP-only cookie
    ↓
Store token + user in localStorage
    ↓
Track login time for auto-logout
    ↓
Redirect to dashboard
```

### 3. Add to Cart Flow
```
User clicks "Add to Cart"
    ↓
CartContext.addToCart()
    ↓
Update local state
    ↓
Show success toast notification
    ↓
Save to localStorage
    ↓
If user logged in:
    ↓
POST /api/cart (with JWT)
    ↓
Sync cart to MongoDB
    ↓
Update cart badge in header
```

### 4. Cart Sync Flow (Login)
```
User logs in
    ↓
AuthContext sets user state
    ↓
CartContext detects user change
    ↓
GET /api/cart (with JWT)
    ↓
Fetch cart from MongoDB
    ↓
Merge with localStorage cart
    ↓
Update local state
    ↓
Display in header preview
```

### 5. Auto Logout Flow
```
User logs in
    ↓
Store login timestamp
    ↓
Start interval check (every 1 min)
    ↓
Check if 30 minutes passed
    ↓
If expired:
    ↓
Clear localStorage
    ↓
Clear cookies
    ↓
Reset auth state
    ↓
Show "Session expired" alert
    ↓
Redirect to home page
```

## Security Layers

### 1. Password Security
- ✅ Bcrypt hashing (12 rounds)
- ✅ Never stored in plain text
- ✅ Salt automatically generated

### 2. Token Security
- ✅ JWT with 30-minute expiry
- ✅ HTTP-only cookies
- ✅ Secure flag in production
- ✅ SameSite: strict

### 3. API Security
- ✅ JWT verification on protected routes
- ✅ User ID extracted from token
- ✅ Authorization header support
- ✅ Cookie-based auth fallback

### 4. Session Security
- ✅ Auto-logout after 30 minutes
- ✅ Login time tracking
- ✅ Periodic expiry checks
- ✅ Clean logout on expiry

## State Management

### Client-Side State
```
localStorage:
  - shophub_auth_user (user object)
  - shophub_auth_token (JWT)
  - shophub_login_time (timestamp)
  - shophub_cart (cart items)

React Context:
  - AuthContext (user, token, auth methods)
  - CartContext (cart items, cart methods)
  - ToastContext (toast notifications)
```

### Server-Side State
```
MongoDB:
  - users collection (persistent user data)
  - carts collection (persistent cart data)

Cookies:
  - auth-token (HTTP-only, 30 min expiry)
```

## Component Hierarchy

```
App (layout.tsx)
├── AuthProvider
│   ├── ToastProvider
│   │   ├── CartProvider
│   │   │   ├── ConditionalHeader
│   │   │   │   └── Header (with cart preview)
│   │   │   └── Page Components
│   │   │       ├── Login (public)
│   │   │       ├── Signup (public)
│   │   │       ├── Dashboard (protected)
│   │   │       ├── Cart (protected)
│   │   │       └── TestCart (protected)
│   │   └── Toast (global notifications)
```

## API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/signup` | POST | No | Create new user account |
| `/api/auth/login` | POST | No | Authenticate user |
| `/api/cart` | GET | Yes | Fetch user's cart |
| `/api/cart` | POST | Yes | Update cart items |
| `/api/cart` | DELETE | Yes | Clear cart |

## Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/shophub
JWT_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

## Technology Stack

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT, bcrypt
- **State Management**: React Context API
- **API**: Next.js API Routes
- **Notifications**: Custom Toast System

---

This architecture provides a secure, scalable foundation for your e-commerce application with MongoDB integration! 🚀
