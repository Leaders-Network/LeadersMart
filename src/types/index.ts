export interface DeliveryService {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images?: string[]; // Multiple images for gallery
  category: string;
  description: string;
  brand?: string;
  stock?: number;
  colors?: string[];
  sizes?: string[];
  vendorLocation: string; // State where vendor is located
  deliveryServices: DeliveryService[]; // Available delivery services for this product
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  items: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedDeliveryService?: DeliveryService;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  password?: string; // Optional for client-side use
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Vendor {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}
