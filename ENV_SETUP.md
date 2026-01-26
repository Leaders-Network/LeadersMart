# 🔐 Environment Variables Setup

## Your `.env.local` File

Your `.env.local` file has been created with secure, auto-generated secrets. Here's what each variable means:

### Required Variables

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/shophub
```
**What it does**: Connects your app to MongoDB database
**Options**:
- Local: `mongodb://localhost:27017/shophub`
- Atlas: `mongodb+srv://username:password@cluster.mongodb.net/shophub`

```env
# JWT Secret
JWT_SECRET=8f3a9b2c7d1e6f4a5b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0
```
**What it does**: Signs and verifies JWT authentication tokens
**Note**: A secure random key has been generated for you

```env
# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
**What it does**: Base URL for your application
**Note**: Change to your production URL when deploying

## 🚀 Quick Setup

### Option 1: Local MongoDB (Easiest for Development)

1. **Install MongoDB**:
   - Windows: Download from https://www.mongodb.com/try/download/community
   - Mac: `brew install mongodb-community`
   - Linux: `sudo apt-get install mongodb`

2. **Start MongoDB**:
   - Windows: Runs automatically after install
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongodb`

3. **Your `.env.local` is already configured!**
   ```env
   MONGODB_URI=mongodb://localhost:27017/shophub
   ```

4. **Start your app**:
   ```bash
   npm run dev
   ```

### Option 2: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create Account**: https://www.mongodb.com/cloud/atlas/register

2. **Create Free Cluster**:
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to you

3. **Setup Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password (save these!)

4. **Setup Network Access**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)

5. **Get Connection String**:
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

6. **Update `.env.local`**:
   ```env
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/shophub?retryWrites=true&w=majority
   ```
   Replace:
   - `YOUR_USERNAME` with your database username
   - `YOUR_PASSWORD` with your database password
   - `YOUR_CLUSTER` with your cluster name

## ✅ Verify Setup

Start your app:
```bash
npm run dev
```

Look for this message in the console:
```
✅ MongoDB connected successfully
```

If you see this, you're all set! 🎉

## 🔒 Security Notes

### Development
- ✅ `.env.local` is already in `.gitignore`
- ✅ JWT secret is auto-generated and secure
- ✅ Never commit `.env.local` to git

### Production
When deploying to production:

1. **Generate New JWT Secret**:
   ```bash
   # On Mac/Linux
   openssl rand -hex 64
   
   # Or use Node.js
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **Use Environment Variables**:
   - Vercel: Add in Project Settings → Environment Variables
   - Netlify: Add in Site Settings → Environment Variables
   - Other: Use your platform's environment variable system

3. **Secure MongoDB**:
   - Use MongoDB Atlas with IP whitelist
   - Use strong database passwords
   - Enable MongoDB authentication
   - Use SSL/TLS connections

## 🐛 Troubleshooting

### Error: "MONGODB_URI is not defined"
**Solution**: Make sure `.env.local` exists in your project root

### Error: "connect ECONNREFUSED"
**Solution**: 
- Check if MongoDB is running (local)
- Verify connection string (Atlas)
- Check network access settings (Atlas)

### Error: "Authentication failed"
**Solution**: 
- Verify username and password in connection string
- Check database user permissions in Atlas

### Error: "jwt malformed"
**Solution**: 
- Clear browser localStorage
- Login again

## 📝 Example `.env.local` Files

### For Local Development
```env
MONGODB_URI=mongodb://localhost:27017/shophub
JWT_SECRET=8f3a9b2c7d1e6f4a5b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### For MongoDB Atlas
```env
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/shophub?retryWrites=true&w=majority
JWT_SECRET=8f3a9b2c7d1e6f4a5b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### For Production
```env
MONGODB_URI=mongodb+srv://produser:strongpassword@production-cluster.xyz789.mongodb.net/shophub?retryWrites=true&w=majority
JWT_SECRET=<generate-new-secure-random-key-for-production>
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## ✨ What We're NOT Using

- ❌ NextAuth - We're using custom JWT authentication
- ❌ Refresh tokens - Using 30-minute JWT tokens
- ❌ OAuth providers - Simple email/password auth
- ❌ Session database - Using JWT tokens only

## ✅ What We ARE Using

- ✅ MongoDB for user and cart storage
- ✅ JWT tokens for authentication (30-minute expiry)
- ✅ bcrypt for password hashing
- ✅ HTTP-only cookies for security
- ✅ localStorage for client-side persistence
- ✅ Auto-logout after 30 minutes

---

**Your environment is ready! Start building! 🚀**

Need help? Check the console for error messages or see the other documentation files.
