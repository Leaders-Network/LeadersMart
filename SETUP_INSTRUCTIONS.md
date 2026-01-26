# 🚀 Complete Setup Instructions

## ✅ **What's Been Implemented**

### 1. **MongoDB Integration**
- ✅ User authentication with MongoDB
- ✅ Cart persistence in MongoDB
- ✅ Automatic sync between localStorage and database
- ✅ Secure password hashing with bcrypt
- ✅ JWT token authentication (30-minute expiry)

### 2. **Success Notifications**
- ✅ Toast notifications when items added to cart
- ✅ Success, error, and info message types
- ✅ Auto-dismiss after 3 seconds
- ✅ Smooth slide-in animations

### 3. **Auto Logout**
- ✅ Automatic logout after 30 minutes of inactivity
- ✅ Session tracking with timestamps
- ✅ JWT token expiry on server-side
- ✅ Alert notification before logout

### 4. **Cart in Header/Navbar**
- ✅ Cart preview dropdown on hover
- ✅ Shows first 3 items with images
- ✅ Real-time cart count badge
- ✅ Total price display
- ✅ Quick "View Cart" button

## 📋 **Setup Steps**

### Step 1: Install Dependencies (Already Done)
```bash
npm install mongodb mongoose bcryptjs jsonwebtoken @types/bcryptjs @types/jsonwebtoken
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
1. Install MongoDB Community Server
2. Start MongoDB service
3. Connection string is already set in `.env.local`:
   ```
   MONGODB_URI=mongodb://localhost:27017/shophub
   ```

**Option B: MongoDB Atlas (Recommended)**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster (FREE tier)
3. Get your connection string
4. Update `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shophub
   ```

See `MONGODB_SETUP.md` for detailed instructions.

### Step 3: Start the Development Server
```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
```

### Step 4: Test Everything

1. **Test Signup (Database)**:
   - Go to http://localhost:3000/signup
   - Create a new account
   - User will be saved to MongoDB `users` collection
   - Password is hashed with bcrypt

2. **Test Login (Database)**:
   - Go to http://localhost:3000/login
   - Login with your credentials
   - JWT token generated (30-minute expiry)
   - Session tracked for auto-logout

3. **Test Cart Success Notifications**:
   - Go to http://localhost:3000/test-cart
   - Click "Add to Cart" on any product
   - See green success toast notification
   - Cart counter updates in header

4. **Test Cart in Header**:
   - After adding items, hover over cart icon
   - See dropdown with cart preview
   - Shows items, quantities, and total
   - Click "View Cart" to see full cart

5. **Test MongoDB Cart Sync**:
   - Add items to cart while logged in
   - Cart automatically syncs to MongoDB
   - Logout and login again
   - Cart items are restored from database

6. **Test Auto Logout**:
   - Login to your account
   - Wait 30 minutes (or modify the time in AuthContext for testing)
   - You'll be automatically logged out
   - Alert message: "Session expired. Please login again."

## 🗂️ **Database Structure**

### Users Collection
```javascript
{
  _id: ObjectId,
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$12$hashedpassword...", // bcrypt hashed
  role: "user", // or "admin"
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### Carts Collection
```javascript
{
  _id: ObjectId,
  userId: "user_id_here",
  items: [
    {
      productId: "1",
      name: "Product Name",
      price: 25000,
      image: "url",
      quantity: 2,
      vendorLocation: "Lagos",
      selectedDeliveryService: {
        id: "dhl",
        name: "DHL Express",
        price: 2500,
        estimatedDays: "1-2 days"
      }
    }
  ],
  createdAt: ISODate,
  updatedAt: ISODate
}
```

## 🔐 **Security Features**

- ✅ Passwords hashed with bcrypt (12 rounds)
- ✅ JWT tokens with 30-minute expiry
- ✅ HTTP-only cookies for token storage
- ✅ Secure session management
- ✅ Auto-logout on token expiry
- ✅ MongoDB connection with authentication

## 📁 **New Files Created**

### MongoDB & Models
- `src/lib/mongodb.ts` - MongoDB connection utility
- `src/models/User.ts` - User schema and model
- `src/models/Cart.ts` - Cart schema and model

### API Routes
- `src/app/api/auth/signup/route.ts` - User registration
- `src/app/api/auth/login/route.ts` - User authentication
- `src/app/api/cart/route.ts` - Cart CRUD operations

### Components & Context
- `src/components/Toast.tsx` - Toast notification component
- `src/context/ToastContext.tsx` - Global toast management
- `src/context/CartContext.tsx` - Updated with MongoDB sync
- `src/context/AuthContext.tsx` - Updated with MongoDB auth

### Test & Documentation
- `src/app/test-cart/page.tsx` - Test page for cart features
- `MONGODB_SETUP.md` - MongoDB setup guide
- `SETUP_INSTRUCTIONS.md` - This file

## 🎯 **Features Summary**

| Feature | Status | Description |
|---------|--------|-------------|
| MongoDB User Auth | ✅ | Users saved to database with hashed passwords |
| MongoDB Cart Sync | ✅ | Cart automatically syncs with database |
| Success Toasts | ✅ | Beautiful notifications when adding to cart |
| Auto Logout | ✅ | Automatic logout after 30 minutes |
| Cart in Header | ✅ | Hover to see cart preview with items |
| JWT Authentication | ✅ | Secure token-based auth with expiry |
| Password Hashing | ✅ | Bcrypt with 12 rounds |
| Session Tracking | ✅ | Login time tracked for auto-logout |
| Cart Persistence | ✅ | Cart saved to both localStorage and MongoDB |

## 🐛 **Troubleshooting**

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: Make sure MongoDB is running or check your connection string in `.env.local`

### JWT Error
```
Error: jwt malformed
```
**Solution**: Clear localStorage and login again

### Cart Not Syncing
**Solution**: Make sure you're logged in. Cart only syncs to MongoDB when authenticated.

### Auto Logout Not Working
**Solution**: Check browser console for errors. Verify LOGIN_TIME_KEY is set in localStorage.

## 🚀 **Next Steps**

1. **Setup MongoDB** (local or Atlas)
2. **Start the app** with `npm run dev`
3. **Create an account** at `/signup`
4. **Test cart features** at `/test-cart`
5. **Check MongoDB** to see your data

## 📞 **Support**

If you encounter any issues:
1. Check the console for error messages
2. Verify MongoDB connection
3. Check `.env.local` configuration
4. Review `MONGODB_SETUP.md` for detailed MongoDB setup

---

**Everything is ready to go! Just setup MongoDB and start testing! 🎉**
