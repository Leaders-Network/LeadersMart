import { allProducts } from '@/data/products';
import { categories } from '@/data/categories';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const categoryProducts = allProducts.filter((p) => p.category === params.slug);

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: '#F7F8FC' }}>
        <div className="max-w-[1312px] mx-auto px-4 lg:px-0 py-10">
          <Link href="/" className="flex items-center gap-1.5 text-[13px] mb-6 hover:opacity-80" style={{ color: '#4353EC' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to marketplace
          </Link>
          <h1 className="text-[30px] font-700 text-[#171C36] mb-1" style={{ fontWeight: 700 }}>{category.name}</h1>
          <p className="text-[14px] mb-8" style={{ color: '#6F7489' }}>{categoryProducts.length} products available</p>

          {categoryProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl" style={{ border: '1px solid #E6E8F1' }}>
              <p className="text-[15px]" style={{ color: '#6F7489' }}>No products found in this category yet.</p>
              <Link href="/" className="mt-4 inline-block text-[13px] font-600" style={{ color: '#4353EC', fontWeight: 600 }}>Browse all products →</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
