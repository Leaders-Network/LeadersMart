// Helper function to get product images
export function getProductImage(imageName: string): string {
  // For development, use placeholder images
  // Replace with your actual image URLs or local paths
  if (imageName.startsWith('http')) {
    return imageName;
  }
  
  // Use placeholder service for now
  return `https://placehold.co/400x400/e0e7ff/3b82f6?text=${encodeURIComponent(imageName)}`;
}

// Get category icon/image
export function getCategoryIcon(categorySlug: string): string {
  const icons: Record<string, string> = {
    electronics: '💻',
    fashion: '👕',
    'home-office': '🏡',
    'beauty-health': '💄',
    'baby-kids': '👶',
    'sports-fitness': '⚽',
    'grocery-household': '🛒',
    'automotive-industrial': '🚗',
  };
  
  return icons[categorySlug] || '📦';
}

// Placeholder images for different categories
export const placeholderImages = {
  electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
  fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
  'home-office': 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400',
  'beauty-health': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
  'baby-kids': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
  'sports-fitness': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
  'grocery-household': 'https://images.unsplash.com/photo-1543168256-418811576931?w=400',
  'automotive-industrial': 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400',
};
