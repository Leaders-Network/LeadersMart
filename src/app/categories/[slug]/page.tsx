import { products } from '@/data/products';
import { categories } from '@/data/categories';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const categoryProducts = products.filter((p) => p.category === params.slug);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-white hover:underline mb-4 inline-block font-semibold">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-2">{category.name}</h1>
          <p className="text-blue-100 text-lg">{categoryProducts.length} products available</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {categoryProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-600 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
