'use client';

import Image from 'next/image';
import { allProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StarRating from '@/components/StarRating';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = allProducts.find((p) => p.id === params.id);
  const { addToCart } = useCart();

  if (!product) notFound();

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
          <div className="bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-10" style={{ border: '1px solid #E6E8F1' }}>
            <div className="relative w-full md:w-80 aspect-square rounded-2xl overflow-hidden shrink-0" style={{ background: '#F7F8FC' }}>
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-600 tracking-wider block mb-2" style={{ color: '#9DA3B4', fontWeight: 600 }}>
                {product.seller} · {product.categoryLabel}
              </span>
              <h1 className="text-[28px] font-700 text-[#171C36] mb-3" style={{ fontWeight: 700 }}>{product.name}</h1>
              <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
              <div className="flex items-baseline gap-3 my-4">
                <span className="text-[32px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>₦{product.price.toLocaleString('en', { minimumFractionDigits: 2 })}</span>
                {product.originalPrice && (
                  <span className="text-[16px] line-through" style={{ color: '#9DA3B4' }}>₦{product.originalPrice.toLocaleString('en', { minimumFractionDigits: 2 })}</span>
                )}
              </div>
              <p className="text-[14px] leading-relaxed mb-8" style={{ color: '#6F7489' }}>{product.description}</p>
              <button
                onClick={() => addToCart(product)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-[15px] font-600 hover:opacity-90"
                style={{ background: '#4353EC', fontWeight: 600 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
