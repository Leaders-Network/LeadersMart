// src/data/home.ts
// Content for the home sections under the hero. Replace images/links with your real ones.
// Images go in /public/images/home/... (a grey box shows until a file exists).
import { addDemoDetails } from './demoDetails';

export type TopCategory = { name: string; slug: string; image: string };

export const topCategories: TopCategory[] = [
  { name: 'Fashion', slug: 'fashion', image: '/images/home/categories/fashion.jpg' },
  { name: 'Electronics', slug: 'electronics', image: '/images/home/categories/electronics.jpg'},
  { name: 'Home and Office', slug: 'home-office', image: '/images/home/categories/furniture.jpg' },
  { name: 'Beauty and Health', slug: 'beauty-health', image: '/images/home/categories/perfume.jpg' },
  { name: 'Baby and Kids', slug: 'baby-kids', image: '/images/home/categories/cosmetics.jpg' },
  { name: 'Sports and Fitness', slug: 'sports-fitness', image: '/images/home/categories/men-shoes.jpg' },
  { name: 'Gadgets', slug: 'gadgets', image: '/images/home/categories/camera.jpg' },
  { name: 'Home and Garden', slug: 'home-garden', image: '/images/home/categories/gifts.jpg' },
  { name: 'Perfume', slug: 'perfume', image: '/images/home/categories/perfume.jpg' },
//   { name: 'Backpack', slug: 'backpack', image: '/images/home/categories/backpack.jpg' },
  { name: 'Laptop', slug: 'laptop', image: '/images/home/categories/laptop.jpg' },
  { name: 'Headphone', slug: 'headphone', image: '/images/home/categories/headphones.jpg' },
  { name: 'Watches', slug: 'watches', image: '/images/home/categories/watches.jpg' },
];

/** Wide strip under Top Categories (about 968 x 68) */
export const promoStrip = {
  image: '/images/home/promo-strip.jpg',
  alt: 'Sale up to 50% on high technology assistive devices',
  href: '/deals',
};

/** When the "deal of the day" countdown ends */
export const dealEndsAt = '2027-01-31T23:59:59';

export type DealProduct = {
  id: string;
  name: string;
  href: string;
  image: string;
  price: number;
  oldPrice: number;
  rating: number; // 0 - 5
  description: string;
};

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore..';

export const dealProducts: DealProduct[] = [
  { id: '9', name: 'Bres Saola Usage Andouille Shankle Capicola', href: '/products/9', image: '/images/home/deals/vase.jpg', price: 99, oldPrice: 132, rating: 0, description: LOREM },
  { id: '4', name: 'Chicken Buffalo Capicola Kielbasa Short Ribs', href: '/products/4', image: '/images/home/deals/phones.jpg', price: 5, oldPrice: 8, rating: 0, description: LOREM },
  { id: '20', name: 'Pork Belly Tenderloin Ribeye Jerky Pancetta', href: '/products/20', image: '/images/home/deals/product-3.jpg', price: 45, oldPrice: 60, rating: 4, description: LOREM },
  { id: '21', name: 'Turkey Meatloaf Tri-Tip Strip Steak Sirloin', href: '/products/21', image: '/images/home/deals/product-4.jpg', price: 18, oldPrice: 24, rating: 3, description: LOREM },
];

/** Three banners at the bottom (about 308 x 142 each) */
export const bottomBanners = [
  { id: 1, image: '/images/home/banners/banner-1.jpg', alt: 'Super sale 50% off', href: '/deals' },
  { id: 2, image: '/images/home/banners/banner-2.jpg', alt: 'The weekend: sale up 50%', href: '/deals' },
  { id: 3, image: '/images/home/banners/banner-3.jpg', alt: 'The weekend: sale up 50%', href: '/deals' },
];



/* ------------------------- COLOURED PROMO CARDS ------------------------- */
 
export type PromoSegment = { t: string; b?: boolean }; // b = bold
 
export type PromoCard = {
  id: number;
  theme: 'blue' | 'orange' | 'green' | 'red';
  /** two lines of title text, bold parts marked with b */
  title: PromoSegment[][];
  label: string; // "Price to:" / "Sale up to:"
  value: string; // "₦39.00" or "30%"
  suffix?: string; // "OFF"
  href: string;
  image: string; // round photo in the corner (about 190 x 190)
  alt: string;
};
 
export const promoCards: PromoCard[] = [
  {
    id: 1,
    theme: 'blue',
    title: [[{ t: 'LAPTOP ' }, { t: 'DELL INPRAISION', b: true }], [{ t: 'SERIES X' }]],
    label: 'Price to:',
    value: '₦39.00',
    href: '/categories/laptop',
    image: '/images/home/promo-cards/laptop.jpg',
    alt: 'Laptop Dell Inspiration Series X, price to ₦39.00',
  },
  {
    id: 2,
    theme: 'orange',
    title: [[{ t: 'SPECIAL OFFER! ' }, { t: 'BUY 1 GET 1', b: true }], [{ t: 'PIZZA FREE' }]],
    label: 'Sale up to:',
    value: '30%',
    suffix: 'OFF',
    href: '/deals',
    image: '/images/home/promo-cards/pizza1.jpg',
    alt: 'Buy 1 get 1 pizza free, sale up to 30% off',
  },
  {
    id: 3,
    theme: 'green',
    title: [[{ t: '03 DAYS 02 NIGHTS TOUR AT' }], [{ t: 'HAWAII', b: true }, { t: ' BEACH' }]],
    label: 'Price to:',
    value: '₦99.00',
    href: '/deals',
    image: '/images/home/promo-cards/hawaii1.jpg',
    alt: '3 days 2 nights tour at Hawaii beach, price to ₦99.00',
  },
  {
    id: 4,
    theme: 'red',
    title: [[{ t: 'SPECIAL OFFER', b: true }, { t: ' ON ALL ITEMS' }], [{ t: 'IKEA FURNITURE' }]],
    label: 'Sale up to:',
    value: '70%',
    suffix: 'OFF',
    href: '/categories/furniture',
    image: '/images/home/promo-cards/furniture2.jpg',
    alt: 'Special offer on all Ikea furniture, sale up to 70% off',
  },
];

 
/* ------------------------------ BRAND LOGOS ------------------------------ */
// Put logos in /public/images/home/brands/ (about 110 x 50, transparent PNG or SVG works best).
 
export type Brand = { name: string; image: string; href: string };
 
export const brands: Brand[] = [
  { name: 'Huebris', image: '/images/home/brands/huebris.jpg', href: '/brands/huebris' },
  { name: 'BP', image: '/images/home/brands/leaders_mart_logo.png', href: '/brands/bp' },
  { name: 'Doritos', image: '/images/home/brands/doritos.jpg', href: '/brands/doritos' },
  { name: 'Amazon', image: '/images/home/brands/amazon.jpg', href: '/brands/amazon' },
  { name: 'Apex Glass', image: '/images/home/brands/momo-logo1.webp', href: '/brands/apex-glass' },
  { name: 'AgZyme', image: '/images/home/brands/agzyme.jpg', href: '/brands/agzyme' },
  { name: 'Incase', image: '/images/home/brands/incase.jpg', href: '/brands/incase' },
  { name: 'Your Logo', image: '/images/home/brands/mtn-logo.svg', href: '/brands/mtn' },
  // placeholders so the carousel has something to scroll to; replace with real brands
  { name: 'Brand 9', image: '/images/home/brands/br2.jpg', href: '/brands/brand-9' },
  { name: 'Brand 10', image: '/images/home/brands/huebris.jpg', href: '/brands/brand-10' },
  { name: 'Brand 11', image: '/images/home/brands/leaders_mart_logo.png', href: '/brands/brand-11' },
  { name: 'Brand 12', image: '/images/home/brands/momo-logo.webp', href: '/brands/brand-12' },
];

  addDemoDetails(dealProducts);