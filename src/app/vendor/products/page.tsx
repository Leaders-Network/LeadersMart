'use client';

import { FormEvent, useState } from 'react';
import VendorSidebar from '@/components/VendorSidebar';

type ProductStatus = 'Active' | 'Draft' | 'Out of stock';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description: string;
  updatedAt: string;
};

type ProductDraft = {
  name: string;
  category: string;
  price: string;
  stock: string;
  status: ProductStatus;
  description: string;
};

const seedProducts: Product[] = [
  {
    id: 'LM-4012',
    name: 'Smart Pulse Watch',
    category: 'Wearables',
    price: 129.99,
    stock: 84,
    status: 'Active',
    description: 'Health tracking wearable with AMOLED display.',
    updatedAt: '2h ago',
  },
  {
    id: 'LM-3876',
    name: 'Noise Cancelling Headset',
    category: 'Audio',
    price: 189.0,
    stock: 42,
    status: 'Active',
    description: 'Studio-grade headset with adaptive ANC.',
    updatedAt: '6h ago',
  },
  {
    id: 'LM-3551',
    name: 'Minimalist Sneaker',
    category: 'Fashion',
    price: 89.99,
    stock: 0,
    status: 'Out of stock',
    description: 'Vegan leather everyday sneaker.',
    updatedAt: '1d ago',
  },
  {
    id: 'LM-3902',
    name: 'Eco-friendly Water Bottle',
    category: 'Lifestyle',
    price: 32.5,
    stock: 230,
    status: 'Draft',
    description: 'Insulated bottle made from recycled steel.',
    updatedAt: '3d ago',
  },
];

const quickActions = [
  { title: 'Bulk upload', detail: 'Import CSV or connect your PIM to sync 1,000+ listings.' },
  { title: 'Pricing rules', detail: 'Auto-adjust price bands per channel or competitor data.' },
  { title: 'Content review', detail: 'Flag low-quality images or missing attributes instantly.' },
];

export default function VendorProductsPage() {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [focusProduct, setFocusProduct] = useState<Product | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [showForm, setShowForm] = useState(false);
  const [draftProduct, setDraftProduct] = useState<ProductDraft>({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'Active',
    description: '',
  });

  function openCreate() {
    setFormMode('create');
    setDraftProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      status: 'Active',
      description: '',
    });
    setFocusProduct(null);
    setShowForm(true);
  }

  function openEdit(product: Product) {
    setFormMode('edit');
    setFocusProduct(product);
    setDraftProduct({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status,
      description: product.description,
    });
    setShowForm(true);
  }

  function handleDelete(productId: string) {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
    if (focusProduct?.id === productId) {
      setFocusProduct(null);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsedPrice = parseFloat(draftProduct.price);
    const parsedStock = parseInt(draftProduct.stock, 10);

    if (Number.isNaN(parsedPrice) || Number.isNaN(parsedStock)) {
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
        description: draftProduct.description,
        updatedAt: 'just now',
      };
      setProducts((prev) => [newProduct, ...prev]);
    } else if (focusProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === focusProduct.id
            ? {
                ...product,
                name: draftProduct.name,
                category: draftProduct.category,
                price: parsedPrice,
                stock: parsedStock,
                status: draftProduct.status,
                description: draftProduct.description,
                updatedAt: 'just now',
              }
            : product,
        ),
      );
    }

    setShowForm(false);
  }

  return (
    <section className="bg-slate-50 py-12 text-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <VendorSidebar />
          <div className="space-y-8">
            <header className="rounded-3xl bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500 p-10 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Products</p>
              <h1 className="mt-4 text-4xl font-bold">Manage catalog with confidence.</h1>
              <p className="mt-3 max-w-2xl text-blue-100">
                Browse the catalog as cards, inspect inventory health, and make quick edits without leaving the blue-and-white workspace.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={openCreate}
                  className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg shadow-blue-900/30"
                >
                  + Add product
                </button>
                <button className="rounded-2xl border border-white/50 px-6 py-3 text-sm font-semibold text-white">
                  Sync listings
                </button>
              </div>
            </header>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Catalog status</p>
                  <h2 className="text-xl font-semibold text-slate-900">Connect your data source</h2>
                </div>
                <button className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30">
                  Sync now
                </button>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Once you plug in your inventory feed, this area will show validation errors, status breakdowns, and merchandising
                recommendations.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {quickActions.map((action) => (
                <div key={action.title} className="rounded-3xl border border-blue-100 bg-white p-6">
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{action.title}</p>
                  <p className="mt-3 text-sm text-slate-600">{action.detail}</p>
                </div>
              ))}
            </div>

            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Product catalog</p>
                  <h2 className="text-2xl font-bold text-slate-900">{products.length} items</h2>
                </div>
                <button
                  onClick={openCreate}
                  className="rounded-2xl border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700"
                >
                  New product
                </button>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <article key={product.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-blue-600">{product.category}</p>
                        <h3 className="mt-1 text-xl font-semibold text-slate-900">{product.name}</h3>
                      </div>
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
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{product.description}</p>
                    <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <dt className="text-slate-500">Price</dt>
                        <dd className="font-semibold">${product.price.toFixed(2)}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Stock</dt>
                        <dd className="font-semibold">{product.stock} units</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">SKU</dt>
                        <dd className="font-semibold">{product.id}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Updated</dt>
                        <dd className="font-semibold">{product.updatedAt}</dd>
                      </div>
                    </dl>
                    <div className="mt-5 flex gap-3">
                      <button
                        className="flex-1 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30"
                        onClick={() => openEdit(product)}
                      >
                        Update
                      </button>
                      <button
                        className="flex-1 rounded-2xl border border-rose-100 px-4 py-2 text-sm font-semibold text-rose-600"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  {formMode === 'create' ? 'Add new product' : 'Update product'}
                </p>
                <h3 className="text-2xl font-bold text-slate-900">
                  {formMode === 'create' ? 'Let’s launch something new' : draftProduct.name || 'Product details'}
                </h3>
              </div>
              <button
                className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-slate-900"
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>
            </div>

            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
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
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
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
              <label className="text-sm font-semibold text-slate-600">
                Description
                <textarea
                  value={draftProduct.description}
                  onChange={(event) => setDraftProduct((prev) => ({ ...prev, description: event.target.value }))}
                  placeholder="Share a concise value proposition"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  rows={3}
                />
              </label>

              <div className="flex justify-between gap-4">
                {formMode === 'edit' && focusProduct && (
                  <button
                    type="button"
                    className="rounded-2xl border border-rose-100 px-5 py-2.5 text-sm font-semibold text-rose-600"
                    onClick={() => {
                      handleDelete(focusProduct.id);
                      setShowForm(false);
                    }}
                  >
                    Delete
                  </button>
                )}
                <div className="ml-auto flex gap-3">
                  <button
                    type="button"
                    className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600"
                    onClick={() => setShowForm(false)}
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

