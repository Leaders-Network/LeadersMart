import { products } from '@/data/products';
import { categories } from '@/data/categories';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryProducts = products.filter((p) => p.category === slug);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="text-white hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link href="/categories" className="text-white hover:underline">
              Categories
            </Link>
            <span>/</span>
            <span className="text-blue-200">{category.name}</span>
          </div>
          <h1 className="text-5xl font-bold mb-2">{category.name}</h1>
          <p className="text-blue-100 text-lg">{categoryProducts.length} products available</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {categoryProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-600 text-lg mb-4">No products found in this category yet.</p>
            <Link 
              href="/categories" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Browse Other Categories
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                All {category.name} Products
              </h2>
              <div className="text-gray-600">
                Showing {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
