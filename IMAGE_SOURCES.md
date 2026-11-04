# Free Image Sources for Your Ecommerce Site

## 🎨 Free Stock Photo APIs (No Download Needed!)

### 1. **Unsplash API** (Currently Using)
- **Images**: 3+ million high-quality photos
- **Cost**: FREE (5,000 requests/hour)
- **Setup**: https://unsplash.com/developers
- **Usage**: Already integrated in your site!

### 2. **Pexels API**
- **Images**: 3+ million free photos
- **Cost**: FREE (200 requests/hour)
- **Setup**: https://www.pexels.com/api/
- **Sign up**: Get free API key

### 3. **Pixabay API**
- **Images**: 2.7+ million
- **Cost**: FREE (5,000 requests/hour)
- **Setup**: https://pixabay.com/api/docs/

### 4. **Unsplash Source** (Easiest - No API Key!)
- **Usage**: `https://source.unsplash.com/500x500/?product`
- **No signup needed**
- **Random images on each load**

## 📦 Product-Specific Image Sources

### For Electronics:
- **Unsplash Collections**:
  - Headphones: `https://unsplash.com/collections/1163637/headphones`
  - Laptops: `https://unsplash.com/collections/1319040/laptops`
  - Phones: `https://unsplash.com/collections/3657445/smartphones`

### For Fashion/Clothing:
- **Unsplash Collections**:
  - Fashion: `https://unsplash.com/collections/1154337/fashion`
  - Shoes: `https://unsplash.com/collections/1362655/shoes`
  - Accessories: `https://unsplash.com/collections/1368530/accessories`

### For Home & Garden:
- **Unsplash Collections**:
  - Furniture: `https://unsplash.com/collections/1459961/furniture`
  - Plants: `https://unsplash.com/collections/2127219/plants`
  - Decor: `https://unsplash.com/collections/1459961/home-decor`

## 🚀 How to Get 10,000+ Images

### Option 1: Use Unsplash API (Recommended)
```javascript
// Get API key from https://unsplash.com/developers
const response = await fetch(
  'https://api.unsplash.com/search/photos?query=headphones&per_page=30',
  {
    headers: {
      Authorization: 'Client-ID YOUR_ACCESS_KEY'
    }
  }
);
```

### Option 2: Use Multiple APIs Together
- Unsplash: 3M images
- Pexels: 3M images  
- Pixabay: 2.7M images
- **Total: 8.7M+ unique images!**

### Option 3: Scrape Product Images (Legal Sources)
- Amazon Product Advertising API
- eBay API
- AliExpress API
- Shopify Product Images

## 💡 Current Setup

Your site currently uses:
- **Unsplash CDN** for all product images
- **4 images per product** (different angles/views)
- **Automatic fallback** if images fail to load
- **No downloads needed** - images load from CDN

## 🔧 To Add More Products with Images:

1. **Use the image service** (`src/lib/imageService.ts`)
2. **Add products** to `src/data/products.ts`
3. **Images auto-generate** from Unsplash

Example:
```typescript
{
  id: '7',
  name: 'Gaming Mouse',
  price: 49.99,
  image: getRandomProductImages('mouse', 1)[0],
  images: getRandomProductImages('mouse', 4),
  category: 'electronics',
  description: 'High-precision gaming mouse',
}
```

## 📝 Legal Notes

- ✅ Unsplash: Free for commercial use, no attribution required
- ✅ Pexels: Free for commercial use, no attribution required
- ✅ Pixabay: Free for commercial use, no attribution required
- ⚠️ Always check license before using images commercially

## 🎯 Next Steps

1. Sign up for free API keys (takes 5 minutes)
2. Add API keys to your `.env.local` file
3. Use the image service to generate thousands of product images
4. No need to download or store images locally!
