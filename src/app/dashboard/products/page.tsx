'use client';

const products = [
  { name: 'Classic Leather Jacket', price: '$200', tag: 'Bestseller', accent: 'bg-amber-200' },
  { name: 'Designer Handbag', price: '$150', tag: 'New', accent: 'bg-yellow-200' },
  { name: 'Running Sneakers', price: '$75', tag: 'Hot', accent: 'bg-orange-200' },
  { name: 'Men\'s Denim', price: '$30', tag: 'Trending', accent: 'bg-blue-200' },
  { name: 'Silk Scarf', price: '$40', tag: 'Limited', accent: 'bg-pink-200' },
  { name: 'Sunglasses', price: '$50', tag: 'Popular', accent: 'bg-slate-200' },
  { name: 'Cotton T-Shirt', price: '$25', tag: 'Fresh', accent: 'bg-sky-200' },
  { name: 'Casual Sneakers', price: '$68', tag: 'New', accent: 'bg-emerald-200' },
];

export default function ProductsPage() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-[#e5def7] bg-[#f8f5ff] shadow-[0_12px_30px_rgba(91,64,181,0.08)]">
      <div className="flex min-h-[720px] bg-white">
        <div className="flex-1 p-4">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Products</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">Products</h2>
            </div>
            <button className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white">+ Add Product</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <div key={product.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className={`mb-3 flex h-24 items-center justify-center rounded-xl ${product.accent}`}>
                  <div className="rounded-lg bg-white/70 px-2.5 py-1.5 text-xs font-semibold text-slate-700">{product.tag}</div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{product.name}</p>
                    <p className="mt-1 text-xs text-slate-500">Inventory: 128</p>
                  </div>
                  <span className="text-base font-bold text-slate-800">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
