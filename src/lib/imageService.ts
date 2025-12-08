// Image service to get product images from various free APIs

export const imageCategories = {
  electronics: [
    'headphones',
    'laptop',
    'smartphone',
    'camera',
    'tablet',
    'smartwatch',
    'keyboard',
    'mouse',
    'monitor',
    'speaker',
  ],
  clothing: [
    'tshirt',
    'jeans',
    'dress',
    'shoes',
    'jacket',
    'sweater',
    'sneakers',
    'boots',
    'shirt',
    'pants',
  ],
  books: ['book', 'books', 'reading', 'library', 'novel', 'textbook'],
  'home-garden': [
    'furniture',
    'lamp',
    'chair',
    'table',
    'plant',
    'garden',
    'tools',
    'decoration',
    'sofa',
    'bed',
  ],
  beauty: ['perfume', 'cosmetics', 'makeup', 'skincare', 'beauty'],
  sports: ['fitness', 'gym', 'sports', 'exercise', 'yoga', 'running'],
};

/**
 * Generate Unsplash image URLs for a product
 * @param query - Search term (e.g., 'headphones', 'laptop')
 * @param count - Number of images to generate
 * @returns Array of image URLs
 */
export function getUnsplashImages(query: string, count: number = 4): string[] {
  const images: string[] = [];
  for (let i = 0; i < count; i++) {
    // Using Unsplash Source API with random seed for variety
    images.push(`https://source.unsplash.com/500x500/?${query}&sig=${i}`);
  }
  return images;
}

/**
 * Generate Pexels-style image URLs
 * Note: For production, you'd use the actual Pexels API with an API key
 */
export function getPexelsImages(query: string, count: number = 4): string[] {
  const images: string[] = [];
  for (let i = 0; i < count; i++) {
    // Placeholder - in production, use actual Pexels API
    images.push(`https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${1000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=500&h=500`);
  }
  return images;
}

/**
 * Get curated product images from Unsplash
 */
export const curatedProductImages = {
  // Electronics
  headphones: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
  ],
  laptop: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop',
  ],
  smartphone: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1592286927505-c0d6e0d1e8b0?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
  ],
  watch: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop',
  ],
  // Clothing
  tshirt: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500&h=500&fit=crop',
  ],
  jeans: [
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=500&h=500&fit=crop',
  ],
  shoes: [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop',
  ],
  // Books
  book: [
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=500&fit=crop',
  ],
  // Home & Garden
  furniture: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&h=500&fit=crop',
  ],
  garden: [
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
  ],
};

/**
 * Get random product images for a category
 */
export function getRandomProductImages(category: string, count: number = 4): string[] {
  const categoryImages = curatedProductImages[category as keyof typeof curatedProductImages];
  if (categoryImages) {
    return categoryImages.slice(0, count);
  }
  // Fallback to Unsplash random
  return getUnsplashImages(category, count);
}

/**
 * Generate placeholder image URL
 */
export function getPlaceholderImage(text: string = 'Product', width: number = 500, height: number = 500): string {
  return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
}
