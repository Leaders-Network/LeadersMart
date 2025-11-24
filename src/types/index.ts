export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CartItem extends Product {
  quantity: number;
}
