import Link from 'next/link';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductCardSimple from '@/components/ProductCardSimple';
import Carousel from '@/components/Carousel';

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Carousel */}
      <Carousel />

      {/* Top Banner Strip */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-8 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
              FREE SHIPPING on orders over $50
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              24/7 Customer Support
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              30-Day Money Back Guarantee
            </span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-900">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="bg-white p-6 rounded-xl text-center hover:shadow-xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-5xl mb-3">
                {category.slug === 'electronics' && '💻'}
                {category.slug === 'clothing' && '👕'}
                {category.slug === 'books' && '📚'}
                {category.slug === 'home-garden' && '🏡'}
              </div>
              <h3 className="font-bold text-lg text-blue-900">{category.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Shop Now →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Deals Section */}
      <section className="container mx-auto px-4 py-4">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-bold mb-2">⚡ Flash Sale</h2>
                <p className="text-xl">Up to 70% OFF - Limited Time Only!</p>
              </div>
              <div className="bg-white text-red-500 px-6 py-4 rounded-xl font-bold text-center">
                <div className="text-3xl">05:23:47</div>
                <div className="text-sm">Time Left</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-4xl font-bold text-blue-900 mb-2">Featured Products</h2>
            <p className="text-gray-600">Handpicked items just for you</p>
          </div>
          <Link
            href="/categories"
            className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center gap-2"
          >
            View All
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">New Arrivals</h3>
            <p className="mb-4">Check out the latest products</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50">
              Explore Now
            </button>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Trending Now</h3>
            <p className="mb-4">Most popular items this week</p>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50">
              Shop Trends
            </button>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Clearance Sale</h3>
            <p className="mb-4">Up to 80% off selected items</p>
            <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50">
              Grab Deals
            </button>
          </div>
        </div>
      </section>

      {/* Best Sellers - Carousel */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-2">Best Sellers</h2>
              <p className="text-gray-600">Top rated products by our customers</p>
            </div>
            <Link href="/categories" className="text-blue-600 hover:text-blue-800 font-semibold">
              See all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-4">
              {products.slice(0, 10).map((product) => (
                <div key={product.id} className="flex-shrink-0 w-64">
                  <ProductCardSimple product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-12 my-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Why Shop With Us?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-blue-900">Quality Guaranteed</h3>
              <p className="text-gray-600">All products verified for quality</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-blue-900">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing guaranteed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-blue-900">Secure Payment</h3>
              <p className="text-gray-600">100% secure transactions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-blue-900">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Shop by Brand</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white border rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-4xl">🏷️</div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular items this season - Amazon Style */}
      <section className="bg-white py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular items this season</h2>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="flex-shrink-0 w-40 hover:shadow-lg transition-shadow"
                >
                  <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards with Product Grids - Amazon Style */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Gaming Card */}
          <div className="bg-white p-6 rounded-lg flex flex-col h-full">
            <h3 className="text-xl font-bold mb-4">Level up your gaming</h3>
            <div className="grid grid-cols-2 gap-3 mb-4 flex-grow">
              <Link href={`/products/${products[0]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[0]?.image} alt={products[0]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Gaming headsets</p>
              </Link>
              <Link href={`/products/${products[2]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[2]?.image} alt={products[2]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Gaming keyboards</p>
              </Link>
              <Link href={`/products/${products[4]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[4]?.image} alt={products[4]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Gaming chairs</p>
              </Link>
              <Link href={`/products/${products[3]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[3]?.image} alt={products[3]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Gaming mice</p>
              </Link>
            </div>
            <Link href="/categories/electronics" className="text-blue-600 hover:text-orange-600 text-sm mt-auto">
              Shop the latest in gaming
            </Link>
          </div>

          {/* Home & Kitchen Card */}
          <div className="bg-white p-6 rounded-lg flex flex-col h-full">
            <h3 className="text-xl font-bold mb-4">Home & Kitchen essentials</h3>
            <div className="grid grid-cols-2 gap-3 mb-4 flex-grow">
              <Link href={`/products/${products[8]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[8]?.image} alt={products[8]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Coffee makers</p>
              </Link>
              <Link href={`/products/${products[9]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[9]?.image} alt={products[9]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Blenders</p>
              </Link>
              <Link href={`/products/${products[10]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[10]?.image} alt={products[10]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Vacuum cleaners</p>
              </Link>
              <Link href={`/products/${products[11]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[11]?.image} alt={products[11]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Air fryers</p>
              </Link>
            </div>
            <Link href="/categories/home-garden" className="text-blue-600 hover:text-orange-600 text-sm mt-auto">
              Shop now
            </Link>
          </div>

          {/* Finds for Home Card */}
          <div className="bg-white p-6 rounded-lg flex flex-col h-full">
            <h3 className="text-xl font-bold mb-4">Finds for Home</h3>
            <div className="grid grid-cols-2 gap-3 mb-4 flex-grow">
              <Link href={`/products/${products[13]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[13]?.image} alt={products[13]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Furniture</p>
              </Link>
              <Link href={`/products/${products[8]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[8]?.image} alt={products[8]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Lighting</p>
              </Link>
              <Link href={`/products/${products[9]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[9]?.image} alt={products[9]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Storage</p>
              </Link>
              <Link href={`/products/${products[10]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[10]?.image} alt={products[10]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Decor</p>
              </Link>
            </div>
            <Link href="/categories/home-garden" className="text-blue-600 hover:text-orange-600 text-sm mt-auto">
              See more
            </Link>
          </div>

          {/* Beauty Card */}
          <div className="bg-white p-6 rounded-lg flex flex-col h-full">
            <h3 className="text-xl font-bold mb-4">Level up your beauty routine</h3>
            <div className="grid grid-cols-2 gap-3 mb-4 flex-grow">
              <Link href={`/products/${products[5]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[5]?.image} alt={products[5]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Makeup</p>
              </Link>
              <Link href={`/products/${products[6]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[6]?.image} alt={products[6]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Skincare</p>
              </Link>
              <Link href={`/products/${products[7]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[7]?.image} alt={products[7]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Beauty tools</p>
              </Link>
              <Link href={`/products/${products[1]?.id}`} className="hover:opacity-80 transition-opacity">
                <img src={products[1]?.image} alt={products[1]?.name} className="w-full aspect-square object-cover rounded mb-2" />
                <p className="text-xs">Mirrors</p>
              </Link>
            </div>
            <Link href="/categories/clothing" className="text-blue-600 hover:text-orange-600 text-sm mt-auto">
              See more
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers in Category - Amazon Style */}
      <section className="bg-white py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Sellers in Sports & Outdoors</h2>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="flex-shrink-0 w-48 hover:shadow-lg transition-shadow"
                >
                  <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded" />
                  <div className="mt-2">
                    <h3 className="text-sm line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 my-1">
                      <div className="flex text-yellow-400 text-xs">{'★'.repeat(4)}{'☆'}</div>
                      <span className="text-xs text-gray-500">(2,847)</span>
                    </div>
                    <p className="text-lg font-bold">${product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Today's Deals - Amazon Style */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-blue-900">Today's Deals</h2>
            <Link href="/deals" className="text-blue-600 hover:text-blue-800 font-semibold">
              See all deals →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {products.slice(0, 5).map((product, index) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-lg" />
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    {20 + index * 5}% OFF
                  </div>
                </div>
                <div className="mt-2">
                  <div className="bg-red-600 text-white text-xs px-2 py-1 rounded inline-block mb-2">
                    Deal
                  </div>
                  <p className="text-lg font-bold text-red-600">${(product.price * 0.8).toFixed(2)}</p>
                  <p className="text-sm text-gray-500 line-through">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Keep shopping for - Amazon Style */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Keep shopping for</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-4xl mb-2">
                {category.slug === 'electronics' && '💻'}
                {category.slug === 'clothing' && '👕'}
                {category.slug === 'books' && '📚'}
                {category.slug === 'home-garden' && '🏡'}
              </div>
              <p className="text-sm font-semibold">{category.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Customers who viewed items in your browsing history also viewed */}
      <section className="bg-white py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Customers who viewed items in your browsing history also viewed
            </h2>
            <span className="text-sm text-gray-600">Page 1 of 5</span>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="flex-shrink-0 w-44 hover:shadow-lg transition-shadow bg-white border rounded p-2"
                >
                  <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded mb-2" />
                  <h3 className="text-xs line-clamp-2 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="flex text-yellow-400 text-xs">{'★'.repeat(4)}{'☆'}</div>
                    <span className="text-xs text-gray-500">(128)</span>
                  </div>
                  <p className="text-sm font-bold">${product.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related to items you've viewed */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related to items you've viewed</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {products.slice(0, 6).map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="bg-white rounded-lg hover:shadow-lg transition-shadow">
              <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-t-lg" />
              <div className="p-3">
                <h3 className="text-sm line-clamp-2 mb-2">{product.name}</h3>
                <div className="flex items-center gap-1 mb-1">
                  <div className="flex text-yellow-400 text-xs">{'★'.repeat(4)}{'☆'}</div>
                </div>
                <p className="text-lg font-bold">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* App Download Banner */}
      <section className="bg-blue-900 text-white py-12 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Download Our Mobile App</h2>
              <p className="text-blue-200 mb-6">
                Get exclusive app-only deals, faster checkout, and personalized recommendations!
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  App Store
                </button>
                <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  Google Play
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="text-8xl">📱</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
