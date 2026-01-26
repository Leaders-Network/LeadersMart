# ⚡ Quick Start Guide

## 🎯 Get Up and Running in 5 Minutes!

### Step 1: Setup MongoDB (Choose One)

#### Option A: MongoDB Atlas (Easiest - Cloud)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a FREE cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Update `.env.local`:
```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/shophub
```

#### Option B: Local MongoDB
```bash
# Already installed? Just make sure it's running!
# Windows: MongoDB should auto-start
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongodb
```

**Note**: Your `.env.local` already has a secure JWT secret generated for you!

### Step 2: Start the App
```bash
npm run dev
```

Look for this message:
```
✅ MongoDB connected successfully
```

### Step 3: Test Everything (2 minutes)

1. **Create Account** → http://localhost:3000/signup
   - Enter name, email, password
   - Click "Create Account"
   - ✅ User saved to MongoDB!

2. **Test Cart** → http://localhost:3000/test-cart
   - Click "Add to Cart" on any product
   - ✅ See green success toast!
   - ✅ Cart badge updates in header!

3. **View Cart Preview**
   - Hover over cart icon in header
   - ✅ See your items in dropdown!

4. **Check MongoDB**
   - Atlas: Go to "Browse Collections"
   - Local: Use MongoDB Compass
   - ✅ See your user in `users` collection
   - ✅ See your cart in `carts` collection

### Step 4: Test Auto-Logout (Optional)

To test quickly, modify the timeout:

In `src/context/AuthContext.tsx`, line ~30:
```typescript
// Change from 30 minutes to 1 minute for testing
const thirtyMinutes = 1 * 60 * 1000; // 1 minute
```

Then:
1. Login
2. Wait 1 minute
3. ✅ Auto-logout with alert!

## 🎉 You're Done!

### What You Have Now:

✅ **MongoDB Integration**
- Users saved to database
- Carts synced to database
- Secure password hashing

✅ **Success Notifications**
- Toast messages when adding to cart
- Beautiful animations

✅ **Auto Logout**
- Automatic logout after 30 minutes
- Session tracking

✅ **Cart in Header**
- Hover to see cart preview
- Real-time updates
- Item count badge

## 📚 Next Steps

- Read `SETUP_INSTRUCTIONS.md` for detailed info
- Read `ARCHITECTURE.md` to understand the system
- Read `MONGODB_SETUP.md` for MongoDB help

## 🐛 Having Issues?

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
# Windows: Check Services
# Mac: brew services list
# Linux: sudo systemctl status mongodb
```

### Can't See Toast Notifications
- Check browser console for errors
- Make sure ToastProvider is in layout.tsx

### Cart Not Syncing
- Make sure you're logged in
- Check browser console for API errors
- Verify JWT token in localStorage

## 🎯 Test Checklist

- [ ] MongoDB connected successfully
- [ ] Created user account
- [ ] User appears in MongoDB
- [ ] Added items to cart
- [ ] Saw success toast notification
- [ ] Cart badge shows correct count
- [ ] Cart preview shows in header
- [ ] Cart synced to MongoDB
- [ ] Logout and login restores cart
- [ ] Auto-logout works after 30 min

---

**Everything working? You're ready to build! 🚀**

Need help? Check the other documentation files or the console for error messages.
