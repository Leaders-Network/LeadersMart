// src/data/footer.ts
// Everything shown in the footer. Replace the placeholders with your real details.

export const contact = {
  address: 'Your street address, Lagos, Nigeria',
  hotline: '(800) 1234 8888 - (800) 1234 9999',
  email: 'contact@example.com',
  openTime: 'Monday to Saturday 8:00AM - 20:00PM (Sunday Close)',
};

export type FooterLink = { label: string; href: string };

export const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Information',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'FAQ', href: '/faqs' },
      { label: 'Warranty And Services', href: '/warranty' },
      { label: 'Support 24/7 page', href: '/support' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'My Account',
    links: [
      { label: 'Brands', href: '/brands' },
      { label: 'Gift Certificates', href: '/gift-certificates' },
      { label: 'Affiliates', href: '/affiliates' },
      { label: 'Specials', href: '/deals' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Returns', href: '/returns' },
      { label: 'Support', href: '/support' },
      { label: 'Site Map', href: '/sitemap' },
      { label: 'Customer Service', href: '/support' },
    ],
  },
  {
    title: 'Footer Links',
    links: [
      { label: 'Brands', href: '/brands' },
      { label: 'Gift Certificates', href: '/gift-certificates' },
      { label: 'Affiliates', href: '/affiliates' },
      { label: 'Specials', href: '/deals' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
];

export const socials = [
  { id: 'facebook', label: 'Facebook', href: '#', bg: 'bg-[#4a6ab9]' },
  { id: 'youtube', label: 'YouTube', href: '#', bg: 'bg-[#ed1c2f]' },
  { id: 'twitter', label: 'Twitter', href: '#', bg: 'bg-[#29a9e1]' },
  { id: 'google', label: 'Google Plus', href: '#', bg: 'bg-[#e8344b]' },
  { id: 'instagram', label: 'Instagram', href: '#', bg: 'bg-gradient-to-tr from-[#f9a03f] via-[#d6249f] to-[#5b4fd5]' },
  { id: 'pinterest', label: 'Pinterest', href: '#', bg: 'bg-[#cb2027]' },
] as const;

/** "Most searched" tags; each one links to /search?q=<tag> */
export const searchTags: string[] = [
  'iPhone XS Max', 'Laptop Sony', 'Sale Off', 'Washing Machine', 'Cosmetics', 'Samsung Galaxy Note 9', 'Redmi Note 7S', 'Nikon Camera', 'Google Pixel 3XL', 'Furniture', 'Nokia 7610', 'Computer', 'Gaming Laptop',
  'Macbook Air', 'Men Clothing', 'Women Dresses', 'Sunglasses', 'Camera Accessories', 'Bestsellers', 'Perfume Set', 'Auto Parts', 'Oppo Mobile', 'Best Of Season Sale 2019', 'DIR-819 Router', 'Smart Watch', 'LG Refrigerators',
  'Sony TV', 'Samsung TV 4K', 'iPhone XS Max', 'Laptop Sony', 'Sale Off', 'Washing Machine', 'Cosmetics', 'Samsung Galaxy Note 9', 'Redmi Note 7S', 'Nikon Camera', 'Google Pixel 3XL', 'Furniture', 'Nokia 7610',
  'Computer', 'Gaming Laptop', 'Macbook Air', 'Men Clothing', 'Auto Parts', 'Sunglasses', 'Camera Accessories', 'Bestsellers', 'Perfume Set', 'Women Dresses', 'Oppo Mobile',
];