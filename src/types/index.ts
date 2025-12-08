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
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
  password?: string;
}

export interface Vendor {
  id: string;
  name: string;
  active: boolean;
  contactEmail?: string;
}
