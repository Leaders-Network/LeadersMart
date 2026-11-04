// src/data/megaMenu.ts
// Edit this file to change what shows in the Features / Collections / Pages hover menus.
// Replace the hrefs with your real routes.

export type BadgeType = 'HOT' | 'NEW';

export type MenuLink = {
  label: string;
  href: string;
  badge?: BadgeType;
  /** shows the small ">" arrow on the right */
  hasSub?: boolean;
};

export type MenuColumn = {
  title: string;
  links: MenuLink[];
};

export type CollectionColumn = {
  title: string;
  href: string;
  /** Put the images in /public/images/menu/ (about 360 x 252px). A grey box shows until they exist. */
  image: string;
  links: { label: string; href: string }[];
};

export type PromoBanner = {
  title: string;
  cta: string;
  href: string;
};

/* ------------------------------- FEATURES ------------------------------- */

export const featuresMenu: MenuColumn[] = [
  {
    title: 'Shop Pages',
    links: [
      { label: 'Sidebar left (Outside content)', href: '/shop/sidebar-left-outside' },
      { label: 'Sidebar left (Inside content)', href: '/shop/sidebar-left-inside' },
      { label: 'Sidebar right (Outside content)', href: '/shop/sidebar-right-outside' },
      { label: 'Sidebar right (Inside content)', href: '/shop/sidebar-right-inside' },
      { label: 'Sidebar left, right (Off Canvas)', href: '/shop/off-canvas' },
      { label: 'Category features', href: '/shop/category-features', badge: 'NEW' },
      { label: 'Product bundles', href: '/shop/product-bundles', badge: 'NEW' },
    ],
  },
  {
    title: 'Shop Style',
    links: [
      { label: 'Grid columns', href: '/shop/grid-columns', badge: 'HOT', hasSub: true },
      { label: 'Quick shop products', href: '/shop/quick-shop' },
      { label: 'Countdown of special offer', href: '/shop/countdown' },
      { label: 'Out of stock', href: '/shop/out-of-stock' },
      { label: 'Color swatches pro', href: '/shop/color-swatches', badge: 'HOT' },
    ],
  },
  {
    title: 'Product Page',
    links: [
      { label: 'Sidebar left (Outside content)', href: '/product/sidebar-left-outside' },
      { label: 'Sidebar left (Inside content)', href: '/product/sidebar-left-inside' },
      { label: 'Sidebar right (Outside content)', href: '/product/sidebar-right-outside' },
      { label: 'Sidebar right (Inside content)', href: '/product/sidebar-right-inside' },
      { label: 'Sidebar left, right (Off Canvas)', href: '/product/off-canvas' },
      { label: 'All sidebar (Layout Fluid)', href: '/product/layout-fluid' },
    ],
  },
  {
    title: 'Product Style',
    links: [
      { label: 'Checkbox and radio style', href: '/product/checkbox-radio' },
      { label: 'Product gallery', href: '/product/gallery', badge: 'NEW', hasSub: true },
      { label: 'Zoom image', href: '/product/zoom-image' },
      { label: 'Image size chart', href: '/product/size-chart' },
      { label: 'Tabs vertical', href: '/product/tabs-vertical' },
      { label: 'Tabs horizontal', href: '/product/tabs-horizontal' },
      { label: 'Show orders', href: '/product/show-orders' },
      { label: 'Color swatches pro', href: '/product/color-swatches' },
      { label: 'Countdown of special offer', href: '/product/countdown' },
      { label: 'Videos', href: '/product/videos', badge: 'NEW' },
      { label: 'Custom tab', href: '/product/custom-tab', badge: 'NEW' },
    ],
  },
];

export const featuresBanners: PromoBanner[] = [
  { title: 'View Configuration Guide', cta: 'Click here', href: '/help' },
  { title: 'View Configuration Guide', cta: 'Click here', href: '/help' },
];

/* ------------------------------ COLLECTIONS ----------------------------- */

export const collectionsMenu: CollectionColumn[] = [
  {
    title: 'Headphone',
    href: '/categories/headphone',
    image: '/images/menu/headphone.jpg',
    links: [
      { label: 'Wireless', href: '/categories/headphone?type=wireless' },
      { label: 'Over-ear', href: '/categories/headphone?type=over-ear' },
      { label: 'In-ear', href: '/categories/headphone?type=in-ear' },
      { label: 'Gaming', href: '/categories/headphone?type=gaming' },
      { label: 'Accessories', href: '/categories/headphone?type=accessories' },
    ],
  },
  {
    title: 'Collections',
    href: '/categories/collections',
    image: '/images/menu/collections.jpg',
    links: [
      { label: 'Backpack', href: '/categories/backpack' },
      { label: 'Camera', href: '/categories/camera' },
      { label: 'Fashion', href: '/categories/fashion' },
      { label: 'Laptop', href: '/categories/laptop' },
      { label: 'Men Shoes', href: '/categories/men-shoes' },
    ],
  },
  {
    title: 'Laptop & Accessories',
    href: '/categories/laptop-accessories',
    image: '/images/menu/laptop-accessories.jpg',
    links: [
      { label: 'Laptops', href: '/categories/laptops' },
      { label: 'Keyboards', href: '/categories/keyboards' },
      { label: 'Mice', href: '/categories/mice' },
      { label: 'Chargers', href: '/categories/chargers' },
      { label: 'Bags & Sleeves', href: '/categories/laptop-bags' },
    ],
  },
  {
    title: 'Health & Beauty',
    href: '/categories/health-beauty',
    image: '/images/menu/health-beauty.jpg',
    links: [
      { label: 'Skincare', href: '/categories/skincare' },
      { label: 'Makeup', href: '/categories/makeup' },
      { label: 'Fragrance', href: '/categories/fragrance' },
      { label: 'Hair care', href: '/categories/hair-care' },
      { label: 'Wellness', href: '/categories/wellness' },
    ],
  },
];

/* --------------------------------- PAGES -------------------------------- */

/** Two columns, shown side by side */
export const pagesMenu: { label: string; href: string }[][] = [
  [
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Contact us', href: '/contact' },
    { label: 'Support 24/7 Page', href: '/support' },
    { label: 'SiteMap', href: '/sitemap' },
    { label: 'Page 404', href: '/404' },
  ],
  [
    { label: 'Coming Soon', href: '/coming-soon' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Typography', href: '/typography' },
    { label: 'Photo Gallery', href: '/gallery' },
    { label: 'Best Seller', href: '/best-sellers' },
    { label: 'New Arrivals', href: '/new-arrivals' },
    { label: 'Most Rated', href: '/most-rated' },
  ],
];