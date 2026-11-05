// src/data/categorySections.ts
// One object per "category block" on the home page (Fashion & Accessories, Furniture & Decor, ...).
// Images go in /public/images/home/<section>/ (a grey box shows until a file exists).
 

import { addDemoDetails } from './demoDetails';

export type ProductTag = { text: string; color: string };
 
export type SectionProduct = {
  id: string;
  name: string;
  href: string;
  image: string;
  price: number;
  /** If set (and higher than price) the discount badge, red price and struck-through price appear */
  oldPrice?: number;
  rating?: number; // 0 - 5 (filled yellow stars)
  /** which tab ids this product belongs to */
  tabs: string[];
  /** small coloured label, top-left of the image (e.g. ONLINE ONLY, 2-3 DAYS) */
  tagLeft?: ProductTag;
  /** small coloured label, top-right of the image (e.g. TOP BRAND). Replaces the discount badge. */
  tagRight?: ProductTag;
  /** green "FREE" delivery truck on the image */
  freeShipping?: boolean;
};
 
export type CategorySectionData = {
  id: string;
  title: string;
  /** colour of the title block */
  color: string;
  /** active / hovered tab colour (defaults to `color`) */
  tabColor?: string;
  /** line under the header (defaults to `color`) */
  lineColor?: string;
  /** show an "All" tab first (default true). When false, the first tab is selected. */
  showAllTab?: boolean;
  banner: { image: string; alt: string; href: string };
  tabs: { id: string; label: string }[];
  products: SectionProduct[];
};


/* --------------------------- FASHION & ACCESSORIES --------------------------- */
export const fashionSection: CategorySectionData = {
  id: 'fashion-accessories',
  title: 'Fashion & Accessories',
  color: '#f9b312',
  banner: {
    image: '/images/home/fashion/banner.jpg',
    alt: 'Earn extra cashback, 50% off',
    href: '/categories/fashion',
  },
  tabs: [
    { id: 'esse-cillum', label: 'Esse cillum' },
    { id: 'excepteur', label: 'Excepteur' },
    { id: 'fashion-accessories', label: 'Fashion & Accessories' },
    { id: 'non-proident', label: 'Non proident' },
  ],
  products: [
    { id: '6', name: 'Zandouille Flank Venison Jowl Strip Steak Corne', href: '/products/6', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', price: 43, tabs: ['esse-cillum'] },
    { id: '7', name: 'Tail Cow Bacon Ham Turkey Kielbasa Pastram', href: '/products/7', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop', price: 156, tabs: ['esse-cillum'] },
    { id: '8', name: 'Pork Belly Burgdoggen Pork Loin Shankle Sint Sed', href: '/products/8', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop', price: 79, tabs: ['excepteur'] },
    { id: '24', name: 'Ground Round Tongue Kevin Porchetta Ribeye', href: '/products/24', image: '/images/home/fashion/cap.jpg', price: 91, tabs: ['excepteur'] },
    { id: '25', name: 'Corned Beef Kevin Beef Ribs Swine Alcatra Strip Steak', href: '/products/25', image: '/images/home/fashion/sweatshirt.jpg', price: 80, oldPrice: 87, tabs: ['fashion-accessories'] },
    { id: '26', name: 'Venison Pancetta Pork Chop Picanha Drumstick', href: '/products/26', image: '/images/home/fashion/sneakers.jpg', price: 76, tabs: ['fashion-accessories'] },
    { id: '30', name: 'Pork Belly Burgdoggen Pork Loin Shankleg Short Rib', href: '/products/30', image: '/images/home/fashion/tshirt.jpg', price: 90, tabs: ['fashion-accessories'] },
    { id: '31', name: 'Ipsum Eiusmod Cupidatat Burgdoggen Quis', href: '/products/31', image: '/images/home/fashion/skirt.jpg', price: 60, tabs: ['non-proident'] },
    { id: '32', name: 'Flank Strip Steak Nostrud Cow Swineipsum Dolor', href: '/products/32', image: '/images/home/fashion/shorts.jpg', price: 68, oldPrice: 75, tabs: ['non-proident'] },
    { id: '1', name: 'Beef Ribsen Shoulder Salami Tongue Filet Migno', href: '/products/1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', price: 85, oldPrice: 89, tabs: ['non-proident'] },
  ],
};


 
/* --------------------------- FURNITURE & DECOR --------------------------- */
 
export const furnitureSection: CategorySectionData = {
  id: 'furniture-decor',
  title: 'Furniture & Decor',
  color: '#4aa3df',
  tabColor: '#4f46e5', // template uses red here; this is the middle of your brand gradient
  lineColor: '#cfcfcf',
  showAllTab: false,
  banner: {
    image: '/images/home/furniture/banner1.jpg',
    alt: '2019 trend collection: sofa and lighting, living room, price from ₦69.00',
    href: '/categories/furniture',
  },
  tabs: [
    { id: 'furniture', label: 'Furniture' },
    { id: 'gifts', label: 'Gifts' },
    { id: 'headphone', label: 'Headphone' },
    { id: 'lights', label: 'Lights' },
  ],
  products: [
    { id: '27', name: 'Cillum Turducken Dolor In Fatback Non Pastrami Bal', href: '/products/27', image: '/images/home/furniture/pillow.jpg', price: 72, tabs: ['furniture', 'lights'] },
    { id: '28', name: 'Buffalo Meatball Shoulder Hamburger Corne', href: '/products/28', image: '/images/home/furniture/placemat.jpg', price: 70, oldPrice: 80, freeShipping: true, tabs: ['furniture', 'gifts'] },
    { id: '29', name: 'Bres Saola Usage Andouille Shankle Capicola', href: '/products/29', image: '/images/home/furniture/vase1.jpg', price: 99, oldPrice: 132, tabs: ['furniture', 'gifts'] },
    { id: '10', name: 'Benderloin Officia Drumstick Meatloaf Ham', href: '/products/10', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&h=500&fit=crop', price: 60, rating: 5, tabs: ['furniture', 'headphone'] },
    { id: '11', name: 'Andouille Turkey Beef Kevin Beef Lorem Jowl Sau', href: '/products/11', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&h=500&fit=crop', price: 45, oldPrice: 55, tabs: ['furniture', 'gifts'] },
    { id: '12', name: 'Buffalo Sausage Drumstick Meatloaf Haming', href: '/products/12', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&h=500&fit=crop', price: 33, tabs: ['furniture', 'gifts'] },
    { id: '9', name: 'Buffalo Drumstick Meatball Shoulder Turducken Bresaola', href: '/products/9', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop', price: 90, rating: 5, tagLeft: { text: 'Online only', color: '#3d8bd0' }, tabs: ['furniture'] },
    { id: '14', name: 'Boudin Porkbell Shoulder Hamburger Corned', href: '/products/14', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop', price: 126, tabs: ['furniture', 'gifts'] },
    { id: '3', name: 'Balltip Nullaelit Frankfurter Cow Flank Lorem Jowl', href: '/products/3', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop', price: 65, rating: 5, tagLeft: { text: '2-3 days', color: '#12b5b0' }, tagRight: { text: 'Top brand', color: '#8cc63f' }, tabs: ['furniture', 'lights'] },
    { id: '4', name: 'Alcatra Porkchop Venison Kielbasa Brisket', href: '/products/4', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop', price: 66, tabs: ['furniture', 'headphone'] },
  ],
};


/* ------------------------------ ELECTRONICS ------------------------------ */
 
export const electronicsSection: CategorySectionData = {
  id: 'electronics',
  title: 'Electronics',
  color: '#ff4d57',
  tabColor: '#4f46e5', // template uses red; this is the middle of your brand gradient
  lineColor: '#c4c4c4',
  showAllTab: false,
  banner: {
    image: '/images/home/electronics/banner2.jpg',
    alt: 'Sony selfie camera: capture all the moments, 4K resolution',
    href: '/categories/electronics',
  },
  tabs: [
    { id: 'electronics', label: 'Electronics' },
    { id: 'headphone', label: 'Headphone' },
    { id: 'laptop-accessories', label: 'Laptop & Accessories' },
  ],
  products: [
    { id: '1', name: 'Doenpuis Consuat Pastrami Boudin Corned Beef', href: '/products/1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', price: 50, oldPrice: 60, rating: 5, freeShipping: true, tabs: ['electronics', 'headphone'] },
    { id: '2', name: 'Cupim Should Ametpastrami Boudin Corned Beef', href: '/products/2', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop', price: 68, rating: 5, tagRight: { text: 'Top brand', color: '#8cc63f' }, tabs: ['electronics', 'headphone'] },
    { id: '3', name: 'Consecte Quichuck Beefribs Swine Drumstick Shank', href: '/products/3', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop', price: 70, rating: 5, tabs: ['electronics', 'laptop-accessories'] },
    { id: '4', name: 'Chicken Buffalo Capicola Kielbasa Short Ribs', href: '/products/4', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop', price: 5, oldPrice: 8, tabs: ['electronics', 'laptop-accessories'] },
    { id: '5', name: 'Capicola Salami Andouille Shankle Capicola', href: '/products/5', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&h=500&fit=crop', price: 83, tabs: ['electronics', 'headphone'] },
    { id: '15', name: 'Deniam Frankfurte Beef Ribs Swine Drumstick Shan', href: '/products/15', image: '/images/home/electronics/smartband.jpg', price: 60, oldPrice: 70, tabs: ['electronics'] },
    { id: '33', name: 'Corem Ipsum Dolor Prosciutto Picanha Porchetta', href: '/products/33', image: '/images/home/electronics/tv.jpg', price: 60, oldPrice: 65, rating: 5, tabs: ['electronics', 'laptop-accessories'] },
    { id: '34', name: 'Chicken Swinesha Turducken Corned Beefsho', href: '/products/34', image: '/images/home/electronics/vr-headset.jpg', price: 45, oldPrice: 50, rating: 5, tabs: ['electronics'] },
    { id: '22', name: 'Cenison Meatloa Mignon Pancetta Chuck', href: '/products/22', image: '/images/home/electronics/galaxy-note.jpg', price: 55, oldPrice: 62, rating: 5, tabs: ['electronics', 'laptop-accessories'] },
    { id: '23', name: 'Burgd Oggen Flank Tenderloin Pancetta', href: '/products/23', image: '/images/home/electronics/smartwatch.jpg', price: 50, oldPrice: 69, tagLeft: { text: '2-3 days', color: '#12b5b0' }, tabs: ['electronics'] },
  ],
};


/* ------------- COMPACT BLOCKS (two side by side, no tabs) ------------- */
 
export type CompactSectionData = Pick<
  CategorySectionData,
  'id' | 'title' | 'color' | 'lineColor' | 'tabColor' | 'banner' | 'products'
>;
 
const LOREM_NAME = 'Lorem Ipsum Dolor Sit Amet Consectetur';
 
export const toySection: CompactSectionData = {
  id: 'toy-kids-baby',
  title: 'Toy, Kids & Baby',
  color: '#4cbf59',
  tabColor: '#4f46e5',
  lineColor: '#cfcfcf',
  banner: { image: '/images/home/toys/banner3.jpg', alt: 'Jake Baby bath time: play in and out of water', href: '/categories/toys' },
  products: [
    { id: '16', name: 'Buffalo Sausage Drumstick Meatloaf Haming', href: '/products/16', image: '/images/home/toys/plate.jpg', price: 33, tabs: [] },
    { id: '17', name: 'Andouille Turkey Beef Kevin Beef Lorem Jowl Sau', href: '/products/17', image: '/images/home/toys/pink-vase.jpg', price: 45, oldPrice: 55, tabs: [] },
    { id: '18', name: 'Benderloin Officia Drumstick Meatloaf Ham', href: '/products/18', image: '/images/home/toys/blue-chair.jpg', price: 60, rating: 5, tabs: [] },
    { id: '19', name: LOREM_NAME, href: '/products/19', image: '/images/home/toys/product-4.png', price: 28, tabs: [] },
    { id: '20', name: LOREM_NAME, href: '/products/20', image: '/images/home/toys/product-5.png', price: 52, tabs: [] },
    { id: '21', name: LOREM_NAME, href: '/products/21', image: '/images/home/toys/product-6.png', price: 19, tabs: [] },
  ],
};
 
export const healthSection: CompactSectionData = {
  id: 'health-beauty',
  title: 'Health & Beauty',
  color: '#c068c4',
  tabColor: '#4f46e5',
  lineColor: '#cfcfcf',
  banner: { image: '/images/home/health/banner4.jpg', alt: 'Fruity-floral and fresh: special edition', href: '/categories/health-beauty' },
  products: [
    { id: '13', name: 'Turkey Brisket Shoulder Kielbasa Venison Buffalo P', href: '/products/13', image: '/images/home/health/spa-set.jpg', price: 65, tabs: [] },
    { id: '35', name: 'Biltong Ground Round Alcatra Frankfurter Ham Cap', href: '/products/35', image: '/images/home/health/body-wash.jpg', price: 98, tabs: [] },
    { id: '36', name: 'Bresaola Cupim Tongue Capicola Jowl Salami Ribeye', href: '/products/36', image: '/images/home/health/protein-bar.jpg', price: 89, tabs: [] },
    { id: '37', name: LOREM_NAME, href: '/products/37', image: '/images/home/health/product-4.png', price: 34, tabs: [] },
    { id: '38', name: LOREM_NAME, href: '/products/38', image: '/images/home/health/product-5.png', price: 71, tabs: [] },
    { id: '2', name: LOREM_NAME, href: '/products/2', image: '/images/home/health/product-6.png', price: 23, tabs: [] },
  ],
};

 
/* ------------------------------ BEST SELLER ------------------------------ */
// Re-uses products already defined above. Swap the ids for your real best sellers.
// 5 per page (3 in the left column, 2 in the right), so 10 ids = 2 dots.
 
const BEST_SELLER_IDS = ['6', '7', '8', '26', '30', '24', '25', '31', '32', '1'];
 
export const bestSellers: SectionProduct[] = BEST_SELLER_IDS.map(
  (id) => fashionSection.products.find((p) => p.id === id)!,
);
 
  [fashionSection, furnitureSection, electronicsSection, toySection, healthSection].forEach((s) =>
    addDemoDetails(s.products),
  );