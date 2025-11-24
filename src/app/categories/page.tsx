import Link from 'next/link';
import { categories } from '@/data/categories';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="bg-white border rounded-lg p-8 text-center hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
