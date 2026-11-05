'use client';

const orderItems = [
  { name: 'Eco-Friendly T-Shirt', color: 'Color: Blue', size: 'Size: M', price: '$20.00', total: '$40.00' },
  { name: 'Designer Sunglasses', color: 'Color: Brown', size: 'Size: One Size', price: '$120.00', total: '$120.00' },
];

export default function OrdersPage() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-[#e5def7] bg-[#f8f5ff] shadow-[0_12px_30px_rgba(91,64,181,0.08)]">
      <div className="flex min-h-[720px] bg-white">
        <div className="flex-1 p-4">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Order Details</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">Order Details</h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <button className="rounded-lg border border-slate-200 bg-white px-3 py-2">Print</button>
              <button className="rounded-lg bg-violet-600 px-3 py-2 text-white">Save</button>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 text-sm leading-6 text-slate-600 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="mb-1 text-sm text-slate-500">Customer Info</p>
              <p className="font-semibold text-slate-800">Rafat Williams</p>
              <p>rafat@example.com</p>
              <p>+234 800 000 0000</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="mb-1 text-sm text-slate-500">Delivery Info</p>
              <p className="font-semibold text-slate-800">Home</p>
              <p>123 Market Road, Enugu</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-3 flex items-center justify-between text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              <span>Order items</span>
              <span>#1005</span>
            </div>

            <div className="space-y-3">
              {orderItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-xl bg-white p-3">
                  <div>
                    <p className="font-semibold text-slate-800">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.color}</p>
                    <p className="text-sm text-slate-500">{item.size}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-800">{item.price}</p>
                    <p className="text-sm text-slate-500">Subtotal: {item.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
