import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Cart from '@/models/Cart';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Get auth header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ 
        error: 'No token provided',
        headers: Object.fromEntries(request.headers.entries())
      }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    // Find all carts for debugging
    const allCarts = await Cart.find({});
    const userCart = await Cart.findOne({ userId: decoded.userId });
    
    return NextResponse.json({
      message: 'Cart test successful',
      userId: decoded.userId,
      userCart,
      totalCarts: allCarts.length,
      allCarts: allCarts.map(cart => ({
        userId: cart.userId,
        itemCount: cart.items.length
      }))
    });
    
  } catch (error: any) {
    return NextResponse.json({
      error: 'Test failed',
      message: error.message,
      jwtSecret: JWT_SECRET ? 'Set' : 'Not set',
      mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not set'
    }, { status: 500 });
  }
}