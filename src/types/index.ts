export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  categoryLabel: string;
  seller: string;
  description: string;
  rating: number;
  reviewCount: number;
  discount?: number;
  stock?: number;
  claimed?: number;
  badge?: 'BESTSELLER' | 'NEW FIND' | 'STAFF PICK';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: string;
  icon: string;
  bg: string;
  iconColor: string;
}

export interface CartItem extends Product {
  quantity: number;
}
