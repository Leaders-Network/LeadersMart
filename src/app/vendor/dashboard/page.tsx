'use client';

import { FormEvent, useMemo, useState } from 'react';
import VendorSidebar from '@/components/VendorSidebar';
import {
  Area,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ProductStatus = 'Active' | 'Draft' | 'Out of stock';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  sales: number;
  views: number;
  rating: number;
  updatedAt: string;
};

type ProductDraft = {
  name: string;
  category: string;
  price: string;
  stock: string;
  status: ProductStatus;
};

const seedProducts: Product[] = [
  {
    id: 'LM-4012',
    name: 'Smart Pulse Watch',
    category: 'Wearables',
    price: 129.99,
    stock: 84,
    status: 'Active',
    sales: 312,
    views: 2104,
    rating: 4.7,
    updatedAt: '2h ago',
  },
  {
    id: 'LM-3876',
    name: 'Noise Cancelling Headset',
    category: 'Audio',
    price: 189.0,
    stock: 42,
    status: 'Active',
    sales: 198,
    views: 1540,
    rating: 4.5,
    updatedAt: '6h ago',
  },
  {
    id: 'LM-3551',
    name: 'Minimalist Sneaker',
    category: 'Fashion',
    price: 89.99,
    stock: 0,
    status: 'Out of stock',
    sales: 420,
    views: 980,
    rating: 4.8,
    updatedAt: '1d ago',
  },
  {
    id: 'LM-3902',
    name: 'Eco-friendly Water Bottle',
    category: 'Lifestyle',
    price: 32.5,
    stock: 230,
    status: 'Draft',
    sales: 0,
    views: 120,
    rating: 4.2,
    updatedAt: '3d ago',
  },
];

const monthlyPerformance = [
  { month: 'Jan', value: 14_200 },
  { month: 'Feb', value: 11_600 },
  { month: 'Mar', value: 15_800 },
  { month: 'Apr', value: 18_400 },
  { month: 'May', value: 16_100 },
  { month: 'Jun', value: 21_300 },
];

const onboardingChecklist = [
  'Upload at least 5 hero products',
  'Verify business documents',
  'Set up preferred payout method',
  'Configure delivery regions',
];

const quickTips = [
  {
    title: 'Optimize photos',
    detail: 'Bright, lifestyle-focused images improve conversions by 32%.',
  },
  {
    title: 'Respond fast',
    detail: 'Vendors who reply within 1 hour keep a 4.8★ satisfaction score.',
  },
  {
    title: 'Bundle accessories',
    detail: 'Bundles can lift basket sizes by 18% in electronics.',
  },
];

export default function VendorDashboardPage() {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ProductStatus>('all');
  const [showProductForm, setShowProductForm] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [draftProduct, setDraftProduct] = useState<ProductDraft>({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'Active',
  });
  const [focusedProduct, setFocusedProduct] = useState<Product | null>(seedProducts[0]);
  const [toast, setToast] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' ? true : product.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [products, searchTerm, statusFilter]);

  const inventoryValue = useMemo(
    () => products.reduce((sum, product) => sum + product.price * product.stock, 0),
    [products],
  );

  const bestSeller = useMemo(
    () => [...products].sort((a, b) => b.sales - a.sales)[0],
    [products],
  );

  const latestMonthRevenue = monthlyPerformance.at(-1)?.value ?? 0;

  function openCreateProduct() {
    setFormMode('create');
    setDraftProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      status: 'Active',
    });
    setShowProductForm(true);
  }

  function openEditProduct(product: Product) {
    setFormMode('edit');
    setDraftProduct({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status,
    });
    setFocusedProduct(product);
    setShowProductForm(true);
  }

  function handleProductSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsedPrice = parseFloat(draftProduct.price);
    const parsedStock = parseInt(draftProduct.stock, 10);

    if (Number.isNaN(parsedPrice) || Number.isNaN(parsedStock)) {
      setToast('Please provide valid price and stock values.');
      return;
    }

    if (formMode === 'create') {
      const newProduct: Product = {
        id: `LM-${Math.floor(Math.random() * 9000 + 1000)}`,
        name: draftProduct.name,
        category: draftProduct.category,
        price: parsedPrice,
        stock: parsedStock,
        status: draftProduct.status,
        sales: 0,
        views: 0,
        rating: 0,
        updatedAt: 'just now',
      };
      setProducts((prev) => [newProduct, ...prev]);
      setFocusedProduct(newProduct);
      setToast(`${newProduct.name} added successfully.`);
    } else if (focusedProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === focusedProduct.id
            ? {
                ...product,
                name: draftProduct.name,
                category: draftProduct.category,
                price: parsedPrice,
                stock: parsedStock,
                status: draftProduct.status,
                updatedAt: 'just now',
              }
            : product,
        ),
      );
      setToast(`${draftProduct.name} updated successfully.`);
    }

    setShowProductForm(false);
  }

  function handleDeleteProduct(productId: string) {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
    if (focusedProduct?.id === productId) {
      setFocusedProduct(null);
    }
    setToast('Product deleted.');
  }

  return (
    <section className="bg-slate-50 py-12 text-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <VendorSidebar />
          <div className="space-y-10">
            <div className="rounded-3xl bg-linear-to-br from-blue-900 via-blue-700 to-sky-500 p-10 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Vendor dashboard</p>
              <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-bold leading-tight md:text-5xl">Command center for your storefront</h1>
                  <p className="mt-4 max-w-2xl text-blue-100">
                    Monitor KPIs, manage inventory, and align your team from a calm blue-and-white interface designed to keep you
                    focused.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 px-6 py-4 text-sm font-semibold text-blue-50 backdrop-blur">
                  Tip: Share read-only analytics with finance via secure links.
                </div>
              </div>
            </div>

            <section className="space-y-6">
              <header className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Insights</p>
                  <h2 className="text-3xl font-bold text-slate-900">Live performance</h2>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as 'all' | ProductStatus)}
                    className="rounded-2xl border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="all">All statuses</option>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Out of stock">Out of stock</option>
                  </select>
                  <button
                    onClick={openCreateProduct}
                    className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700"
                  >
                    + Add product
                  </button>
                </div>
              </header>

              <div className="grid gap-6 lg:grid-cols-3">
                <StatCard
                  title="Monthly revenue"
                  value={`$${latestMonthRevenue.toLocaleString()}`}
                  change="+18% vs last month"
                />
                <StatCard
                  title="Inventory value"
                  value={`$${inventoryValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                  change="Updated live"
                />
                <StatCard
                  title="Best seller"
                  value={bestSeller ? bestSeller.name : '—'}
                  change={bestSeller ? `${bestSeller.sales} orders` : 'No data'}
                />
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Analytics</p>
                      <h3 className="text-xl font-semibold text-slate-900">6-month sales trend</h3>
                    </div>
                    <span className="rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold text-blue-600">Live sync</span>
                  </div>

              <div className="mt-8 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyPerformance}
                    margin={{ top: 10, right: 20, bottom: 0, left: -10 }}
                  >
                    <defs>
                      <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity={1} />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity={1} />
                      </linearGradient>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="month"
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={12}
                      tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<AnalyticsTooltip />} cursor={{ stroke: '#cbd5f5' }} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="none"
                      fill="url(#areaGradient)"
                      activeDot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="url(#lineGradient)"
                      strokeWidth={2.5}
                      dot={{ r: 3.5, strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6">
                    <h3 className="text-lg font-semibold text-slate-900">Onboarding checklist</h3>
                    <ul className="mt-4 space-y-3 text-sm">
                      {onboardingChecklist.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-blue-50 to-white p-6">
                    <h3 className="text-lg font-semibold text-slate-900">Performance tips</h3>
                    <div className="mt-4 space-y-4 text-sm">
                      {quickTips.map((tip) => (
                        <div key={tip.title}>
                          <p className="font-semibold text-blue-700">{tip.title}</p>
                          <p className="text-slate-600">{tip.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Product catalog</p>
                    <h3 className="text-xl font-semibold text-slate-900">{filteredProducts.length} items</h3>
                  </div>
                  <div className="text-sm text-slate-500">
                    Sorted by <span className="font-semibold text-slate-700">most recent activity</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-sm">
                    <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-6 py-3">Product</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Stock</th>
                        <th className="px-6 py-3">Sales</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-slate-100 text-slate-700">
                          <td className="px-6 py-4">
                            <div className="font-semibold">{product.name}</div>
                            <div className="text-xs text-slate-500">{product.id}</div>
                          </td>
                          <td className="px-6 py-4">{product.category}</td>
                          <td className="px-6 py-4 font-semibold">${product.price.toFixed(2)}</td>
                          <td className="px-6 py-4">{product.stock} units</td>
                          <td className="px-6 py-4">{product.sales}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                product.status === 'Active'
                                  ? 'bg-green-50 text-green-600'
                                  : product.status === 'Draft'
                                  ? 'bg-slate-100 text-slate-600'
                                  : 'bg-amber-50 text-amber-600'
                              }`}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td className="space-x-3 px-6 py-4 text-right">
                            <button
                              className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                              onClick={() => setFocusedProduct(product)}
                            >
                              View
                            </button>
                            <button
                              className="text-sm font-semibold text-slate-600 hover:text-slate-900"
                              onClick={() => openEditProduct(product)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-sm font-semibold text-rose-500 hover:text-rose-700"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {focusedProduct && (
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Product focus</p>
                    <h3 className="text-2xl font-bold text-slate-900">{focusedProduct.name}</h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-2 text-sm">
                      <InfoTile label="Status" value={focusedProduct.status} />
                      <InfoTile label="Stock" value={`${focusedProduct.stock} units`} />
                      <InfoTile
                        label="Conversion rate"
                        value={`${Math.min(98, Math.round((focusedProduct.sales / Math.max(1, focusedProduct.views)) * 100))}%`}
                      />
                      <InfoTile label="Rating" value={`${focusedProduct.rating} ★`} />
                    </div>
                  </div>

              <div className="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-600 to-blue-500 p-6 text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Next best action</p>
                    <h3 className="mt-4 text-2xl font-bold">Boost {focusedProduct.name}</h3>
                    <ul className="mt-6 space-y-4 text-sm text-blue-50">
                      <li className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-white" />
                        Add lifestyle photos to improve click-through rate by up to 26%.
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-white" />
                        Incentivize first 50 orders with a 10% launch coupon.
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-white" />
                        Sync stock with retail ERP to avoid overselling.
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {showProductForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  {formMode === 'create' ? 'Add new product' : 'Update product'}
                </p>
                <h3 className="text-2xl font-bold text-slate-900">
                  {formMode === 'create'
                    ? 'Let’s launch something new'
                    : draftProduct.name || 'Product details'}
                </h3>
              </div>
              <button
                className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-slate-900"
                onClick={() => setShowProductForm(false)}
              >
                ✕
              </button>
            </div>

            <form className="mt-6 grid gap-4" onSubmit={handleProductSave}>
              <FormField
                label="Product name"
                value={draftProduct.name}
                onChange={(value) => setDraftProduct((prev) => ({ ...prev, name: value }))}
                placeholder="Premium wireless charger"
              />
              <FormField
                label="Category"
                value={draftProduct.category}
                onChange={(value) => setDraftProduct((prev) => ({ ...prev, category: value }))}
                placeholder="Accessories"
              />
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  label="Price ($)"
                  value={draftProduct.price}
                  onChange={(value) => setDraftProduct((prev) => ({ ...prev, price: value }))}
                  placeholder="79.99"
                />
                <FormField
                  label="Stock"
                  value={draftProduct.stock}
                  onChange={(value) => setDraftProduct((prev) => ({ ...prev, stock: value }))}
                  placeholder="150"
                />
                <label className="text-sm font-semibold text-slate-600">
                  Status
                  <select
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    value={draftProduct.status}
                    onChange={(event) =>
                      setDraftProduct((prev) => ({
                        ...prev,
                        status: event.target.value as ProductStatus,
                      }))
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Out of stock">Out of stock</option>
                  </select>
                </label>
              </div>

              <div className="flex justify-between gap-4">
                {formMode === 'edit' && focusedProduct && (
                  <button
                    type="button"
                    className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    onClick={() => handleDeleteProduct(focusedProduct.id)}
                  >
                    Delete
                  </button>
                )}
                <div className="ml-auto flex gap-3">
                  <button
                    type="button"
                    className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    onClick={() => setShowProductForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-2xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700"
                  >
                    {formMode === 'create' ? 'Add product' : 'Save changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl">
          {toast}
          <button className="ml-4 text-blue-200" onClick={() => setToast(null)}>
            Close
          </button>
        </div>
      )}
    </section>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="text-sm font-semibold text-slate-600">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
        required
      />
    </label>
  );
}

function StatCard({ title, value, change }: { title: string; value: string | undefined; change: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{title}</p>
      <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{change}</p>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-slate-500">{label}</p>
      <p className="text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value?: number;
    payload?: { month: string };
  }>;
};

function AnalyticsTooltip(props: ChartTooltipProps) {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    const dataPoint = payload[0];
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-lg">
        <p className="font-semibold text-slate-900">{dataPoint.payload?.month}</p>
        <p className="text-slate-600">${dataPoint.value?.toLocaleString()}</p>
      </div>
    );
  }

  return null;
}

