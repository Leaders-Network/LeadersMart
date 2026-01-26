import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Cart from '@/models/Cart';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

function getUserIdFromToken(request: NextRequest): string | null {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('auth-token')?.value;
    
    if (!token) return null;
    
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
}

// GET - Fetch user's cart
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      // Create empty cart if doesn't exist
      cart = await Cart.create({ userId, items: [] });
    }

    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Add item to cart or update cart
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items } = await request.json();

    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = await Cart.create({ userId, items });
    } else {
      cart.items = items;
      await cart.save();
    }

    return NextResponse.json({ 
      message: 'Cart updated successfully',
      cart 
    });
  } catch (error) {
    console.error('Update cart error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Clear cart
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await Cart.findOneAndUpdate(
      { userId },
      { items: [] },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Clear cart error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}