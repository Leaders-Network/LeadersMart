# MongoDB Setup Guide

## Option 1: Local MongoDB Installation

### Windows:
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install MongoDB with default settings
3. MongoDB will run on `mongodb://localhost:27017` by default
4. Your `.env.local` is already configured for local MongoDB

### Mac (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu/Debian):
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

## Option 2: MongoDB Atlas (Cloud - Recommended)

1. **Create Account**:
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create Cluster**:
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your preferred region
   - Click "Create Cluster"

3. **Setup Database Access**:
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Setup Network Access**:
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address

5. **Get Connection String**:
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster.mongodb.net/`

6. **Update .env.local**:
   ```env
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/shophub?retryWrites=true&w=majority
   ```
   Replace:
   - `YOUR_USERNAME` with your database username
   - `YOUR_PASSWORD` with your database password
   - `YOUR_CLUSTER` with your cluster name

## Verify Connection

After setting up MongoDB, start your Next.js app:

```bash
npm run dev
```

You should see in the console:
```
✅ MongoDB connected successfully
```

## Database Collections

The app will automatically create these collections:
- **users**: Stores user accounts (name, email, hashed password, role)
- **carts**: Stores user shopping carts (userId, items array)

## Test the Setup

1. **Create an account**: Go to `/signup` and register
2. **Check MongoDB**: 
   - For local: Use MongoDB Compass (GUI tool)
   - For Atlas: Use the "Browse Collections" feature in Atlas dashboard
3. **Verify user**: You should see your user in the `users` collection
4. **Add items to cart**: Go to `/test-cart` and add items
5. **Check cart**: Your cart should be saved in the `carts` collection

## Troubleshooting

### Connection Error:
- Check if MongoDB is running (local)
- Verify connection string in `.env.local`
- Check network access settings (Atlas)
- Ensure IP is whitelisted (Atlas)

### Authentication Error:
- Verify username and password in connection string
- Check database user permissions

### Can't Find Database:
- Database is created automatically on first write
- Collections are created when first document is inserted

## Security Notes

⚠️ **Important for Production**:
1. Never commit `.env.local` to git
2. Use strong, unique passwords
3. Restrict IP access in production
4. Use environment variables for sensitive data
5. Enable MongoDB authentication
6. Use SSL/TLS connections

## Additional Resources

- MongoDB Documentation: https://docs.mongodb.com/
- MongoDB Atlas Guide: https://docs.atlas.mongodb.com/
- Mongoose Documentation: https://mongoosejs.com/docs/
