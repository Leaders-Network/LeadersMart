# Product Images Guide for ShopHub

## Where to Get Free Product Images

### 1. **Unsplash** (https://unsplash.com)
- High-quality, free-to-use images
- Great for lifestyle and product photography
- No attribution required
- Search for: "smartphone", "laptop", "fashion", "furniture", etc.

### 2. **Pexels** (https://pexels.com)
- Free stock photos and videos
- Commercial use allowed
- Search by category

### 3. **Pixabay** (https://pixabay.com)
- Over 2.7 million free images
- No attribution required
- Good for product mockups

### 4. **Freepik** (https://freepik.com)
- Free and premium images
- Great for product mockups
- Attribution required for free tier

### 5. **Product-Specific Sources**
- **Electronics**: manufacturer websites (Samsung, Apple, etc.)
- **Fashion**: brand websites or fashion stock sites
- **Amazon Product Images**: Use as reference (check licensing)

## How to Add Images to Your Project

### Option 1: Local Images (Recommended for Production)

1. **Download images** from the sources above
2. **Rename them** descriptively (e.g., `iphone-14-pro.jpg`, `nike-shoes-1.jpg`)
3. **Place them** in the `public/images/products/` folder
4. **Update your products data**:

```typescript
{
  id: '1',
  name: 'iPhone 14 Pro',
  price: 999.99,
  image: '/images/products/iphone-14-pro.jpg',
  images: [
    '/images/products/iphone-14-pro.jpg',
    '/images/products/iphone-14-pro-2.jpg',
    '/images/products/iphone-14-pro-3.jpg',
  ],
  category: 'electronics',
  description: 'Latest iPhone with amazing features',
}
```

### Option 2: Use CDN/External URLs

```typescript
{
  id: '1',
  name: 'Product Name',
  image: 'https://images.unsplash.com/photo-xxxxx',
  category: 'electronics',
}
```

### Option 3: Use Placeholder Service (Current Setup)

The site currently uses placeholder images. To use real images:

1. Update `src/data/products.ts`
2. Replace placeholder URLs with real image URLs

## Image Specifications

### Product Cards
- **Size**: 400x400px (square)
- **Format**: JPG or WebP
- **Max file size**: 200KB

### Product Detail Pages
- **Size**: 800x800px
- **Format**: JPG or WebP
- **Max file size**: 500KB

### Category Banners
- **Size**: 1200x400px
- **Format**: JPG or WebP

## Quick Start: Using Unsplash

1. Go to https://unsplash.com
2. Search for your product category
3. Download the image (choose "Small" size for web)
4. Save to `public/images/products/`
5. Update your product data with the path

## Example Product with Real Images

```typescript
export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400',
    ],
    category: 'electronics',
    description: 'High-quality wireless headphones with noise cancellation',
    brand: 'Sony',
    stock: 50,
  },
];
```

## Need Help?

- For bulk image downloads: Use browser extensions like "Image Downloader"
- For image optimization: Use tools like TinyPNG or Squoosh
- For image editing: Use Canva or Photopea (free Photoshop alternative)
