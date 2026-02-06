import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVendor extends Document {
    businessName: string;
    contactName: string;
    email: string;
    phone: string;
    password: string;
    role: 'vendor';
    active: boolean;
    businessDocuments?: {
        taxId?: string;
        businessLicense?: string;
        verified: boolean;
    };
    payoutMethod?: {
        bankName?: string;
        accountNumber?: string;
        routingNumber?: string;
    };
    deliveryRegions: string[];
    createdAt: Date;
    updatedAt: Date;
}

const VendorSchema: Schema = new Schema(
    {
        businessName: {
            type: String,
            required: [true, 'Please provide a business name'],
            trim: true,
        },
        contactName: {
            type: String,
            required: [true, 'Please provide a contact name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        phone: {
            type: String,
            required: [true, 'Please provide a phone number'],
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
        role: {
            type: String,
            default: 'vendor',
            immutable: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        businessDocuments: {
            taxId: String,
            businessLicense: String,
            verified: {
                type: Boolean,
                default: false,
            },
        },
        payoutMethod: {
            bankName: String,
            accountNumber: String,
            routingNumber: String,
        },
        deliveryRegions: [{
            type: String,
            trim: true,
        }],
    },
    {
        timestamps: true,
    }
);

// Prevent model recompilation in development
const Vendor: Model<IVendor> = mongoose.models.Vendor || mongoose.model<IVendor>('Vendor', VendorSchema);

export default Vendor;