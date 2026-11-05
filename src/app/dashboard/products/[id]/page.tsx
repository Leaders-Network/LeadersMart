'use client';

const reviewList = [
  { name: 'Aisha M.', score: '4.8', text: 'Comfortable and premium look.' },
  { name: 'Tobi K.', score: '4.9', text: 'Perfect fit and great quality.' },
];

export default function ProductDetailPage() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-[#e5def7] bg-[#f8f5ff] shadow-[0_12px_30px_rgba(91,64,181,0.08)]">
      <div className="flex min-h-[720px] bg-white">
        <div className="flex-1 p-4">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Product Details</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">Product Details</h2>
            </div>
            <div className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">Featured</div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-4 flex h-52 items-center justify-center rounded-2xl bg-linear-to-br from-orange-200 via-violet-100 to-slate-200">
                <div className="rounded-2xl bg-white/70 px-5 py-3 text-xl font-bold text-slate-800 shadow-sm">Sneakers</div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-16 rounded-xl bg-white ring-1 ring-slate-200" />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Category</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-800">Running Sneakers</h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-slate-800">$75.00</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">In stock</span>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                <p>Material: Mesh & rubber</p>
                <p>Color: White / orange</p>
                <p>Size: US 7 - 12</p>
              </div>

              <button className="w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white">Add to cart</button>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800">Ratings & Reviews</p>
              <span className="text-violet-700">4.6 ★</span>
            </div>
            <div className="space-y-3">
              {reviewList.map((review) => (
                <div key={review.name} className="rounded-xl bg-white p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium text-slate-700">{review.name}</span>
                    <span className="text-sm font-semibold text-violet-700">{review.score} ★</span>
                  </div>
                  <p className="text-sm text-slate-600">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
