# 🛒 ShopHub - E-Commerce Platform with MongoDB

A modern, full-stack e-commerce application built with Next.js 16, MongoDB, and TypeScript.

## ✨ Features

### 🔐 Authentication
- User registration and login with MongoDB
- Secure password hashing with bcrypt
- JWT token authentication (30-minute sessions)
- Auto-logout after 30 minutes of inactivity
- HTTP-only cookies for enhanced security

### 🛍️ Shopping Cart
- Add/remove items with success notifications
- Real-time cart preview in header navbar
- Cart persistence in MongoDB and localStorage
- Automatic sync between client and database
- Delivery service selection per item

### 🎨 User Interface
- Beautiful toast notifications for user actions
- Responsive design for all devices
- Scrollable dashboard with sidebar navigation
- Protected routes with authentication guards
- Dynamic header showing user info when logged in

### 💾 Database
- MongoDB integration with Mongoose ODM
- User collection with email uniqueness
- Cart collection with user relationships
- Automatic schema validation
- Connection pooling for performance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB (local or Atlas account)

### Installation

1. **Clone and Install**
```bash
git clone <your-repo>
cd leaders-ecommerce
npm install
```

2. **Setup MongoDB**

Choose one option:

**Option A: MongoDB Atlas (Cloud - Recommended)**
- Create account at https://mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Update `.env.local`

**Option B: Local MongoDB**
- Install MongoDB Community Server
- Start MongoDB service
- Use default connection string

3. **Configure Environment**

Create/update `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/shophub
# or for Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/shophub

JWT_SECRET=your-secret-key-here
```

4. **Start Development Server**
```bash
npm run dev
```

Visit http://localhost:3000

## 📖 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[MONGODB_SETUP.md](MONGODB_SETUP.md)** - Detailed MongoDB setup
- **[SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)** - Complete setup guide
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture
- **[MONGODB_IMPLEMENTATION_SUMMARY.md](MONGODB_IMPLEMENTATION_SUMMARY.md)** - Implementation details

## 🧪 Testing

### Test Pages
- `/signup` - Create new account
- `/login` - Login to existing account
- `/test-cart` - Test cart functionality
- `/dashboard` - User dashboard (protected)
- `/cart` - Shopping cart (protected)

### Test Credentials
Create your own account at `/signup` or use the test page at `/test-cart`

## 📁 Project Structure

```
leaders-ecommerce/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── signup/route.ts
│   │   │   │   └── login/route.ts
│   │   │   └── cart/route.ts
│   │   ├── dashboard/
│   │   ├── cart/
│   │   ├── login/
│   │   ├── signup/
│   │   └── test-cart/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Toast.tsx
│   │   └── AuthGuard.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   └── ToastContext.tsx
│   ├── lib/
│   │   └── mongodb.ts
│   └── models/
│       ├── User.ts
│       └── Cart.ts
├── .env.local
└── package.json
```

## 🔧 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT, bcrypt
- **State Management**: React Context API
- **Notifications**: Custom Toast System

## 🔐 Security

- ✅ Password hashing with bcrypt (12 rounds)
- ✅ JWT tokens with 30-minute expiry
- ✅ HTTP-only cookies
- ✅ Secure session management
- ✅ Auto-logout on token expiry
- ✅ MongoDB authentication
- ✅ Input validation with Mongoose schemas

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

### Carts Collection
```javascript
{
  userId: String (required, unique),
  items: [{
    productId: String,
    name: String,
    price: Number,
    image: String,
    quantity: Number,
    vendorLocation: String,
    selectedDeliveryService: Object
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Features Checklist

- [x] MongoDB user authentication
- [x] MongoDB cart persistence
- [x] Success toast notifications
- [x] Auto-logout after 30 minutes
- [x] Cart preview in header
- [x] Protected routes
- [x] Password hashing
- [x] JWT authentication
- [x] Session management
- [x] Responsive design
- [x] Real-time cart updates
- [x] Database synchronization

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: Ensure MongoDB is running or check connection string in `.env.local`

### JWT Token Error
```
Error: jwt malformed
```
**Solution**: Clear localStorage and login again

### Cart Not Syncing
**Solution**: Verify you're logged in and have a valid JWT token

See [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for more troubleshooting tips.

## 📝 API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/signup` | POST | No | Create new user |
| `/api/auth/login` | POST | No | Authenticate user |
| `/api/cart` | GET | Yes | Get user cart |
| `/api/cart` | POST | Yes | Update cart |
| `/api/cart` | DELETE | Yes | Clear cart |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB team for the database
- Vercel for hosting platform

---

**Built with ❤️ using Next.js and MongoDB**

For detailed setup instructions, see [QUICKSTART.md](QUICKSTART.md)
