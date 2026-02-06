import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import Vendor from '@/models/Vendor';

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const { businessName, contactName, email, phone, password } = await request.json();

        if (!businessName || !contactName || !email || !phone || !password) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        // Check if vendor already exists
        const existingVendor = await Vendor.findOne({ email: email.toLowerCase() });
        if (existingVendor) {
            return NextResponse.json(
                { error: 'Vendor already exists with this email' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new vendor
        const newVendor = await Vendor.create({
            businessName,
            contactName,
            email: email.toLowerCase(),
            phone,
            password: hashedPassword,
            role: 'vendor',
            active: true,
            deliveryRegions: [], // Can be updated later
        });

        // Return vendor without password
        const vendorResponse = {
            id: newVendor._id.toString(),
            businessName: newVendor.businessName,
            contactName: newVendor.contactName,
            email: newVendor.email,
            phone: newVendor.phone,
            role: newVendor.role,
            active: newVendor.active,
            createdAt: newVendor.createdAt,
        };

        return NextResponse.json({
            message: 'Vendor account created successfully',
            vendor: vendorResponse
        }, { status: 201 });

    } catch (error: any) {
        console.error('Vendor signup error:', error);

        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'Vendor already exists with this email' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}