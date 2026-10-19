import Link from 'next/link';
import { categories } from '@/data/categories';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function CategoryIcon({ type, color }: { type: string; color: string }) {
  const p = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: '1.6', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (type) {
    case 'keyboard': return <svg {...p}><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="10" x2="6" y2="10"/><line x1="10" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="14" y2="10"/><line x1="18" y1="10" x2="18" y2="10"/><line x1="10" y1="14" x2="14" y2="14"/></svg>;
    case 'tag': return <svg {...p}><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>;
    case 'watch': return <svg {...p}><circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/></svg>;
    case 'headphones': return <svg {...p}><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>;
    case 'briefcase': return <svg {...p}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>;
    case 'heart': return <svg {...p}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
    default: return null;
  }
}

export default function CategoriesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: '#F7F8FC' }}>
        <div className="max-w-[1312px] mx-auto px-4 lg:px-0 py-12">
          <h1 className="text-[30px] font-700 text-[#171C36] mb-1" style={{ fontWeight: 700 }}>All categories</h1>
          <p className="text-[15px] mb-8" style={{ color: '#6F7489' }}>Big possibilities, neatly sorted.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map(cat => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex flex-col items-center gap-3 py-6 px-3 rounded-2xl text-center hover:shadow-md transition-shadow"
                style={{ background: cat.bg, border: '1px solid transparent' }}
              >
                <CategoryIcon type={cat.icon} color={cat.iconColor} />
                <div>
                  <p className="text-[13px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>{cat.name}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: '#9DA3B4' }}>{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
