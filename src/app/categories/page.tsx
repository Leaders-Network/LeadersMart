import Link from 'next/link';
import { categories } from '@/data/categories';

export default function CategoriesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-white hover:underline mb-4 inline-block font-semibold">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-2">All Categories</h1>
          <p className="text-blue-100 text-lg">Browse products by category</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="bg-white p-8 rounded-xl text-center hover:shadow-xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-6xl mb-4">
                {category.slug === 'electronics' && '💻'}
                {category.slug === 'fashion' && '👕'}
                {category.slug === 'clothing' && '👔'}
                {category.slug === 'home-office' && '🏡'}
                {category.slug === 'home-garden' && '🌿'}
                {category.slug === 'home-appliances' && '🏠'}
                {category.slug === 'beauty-health' && '💄'}
                {category.slug === 'baby-kids' && '👶'}
                {category.slug === 'sports-fitness' && '⚽'}
                {category.slug === 'grocery-household' && '🛒'}
                {category.slug === 'automotive-industrial' && '🚗'}
                {category.slug === 'books' && '📚'}
                {category.slug === 'gadgets' && '📱'}
              </div>
              <h3 className="font-bold text-xl text-blue-900 mb-2">{category.name}</h3>
              <p className="text-sm text-gray-500">
                {category.subcategories?.length || 0} subcategories
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
