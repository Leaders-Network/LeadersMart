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
