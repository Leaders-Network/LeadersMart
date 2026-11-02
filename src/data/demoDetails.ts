import type { QuickViewProduct } from '@/types/product';

const DEMO_OVERVIEW =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ...';

export function addDemoDetails(products: QuickViewProduct[]) {
  const pool = Array.from(new Set(products.map((p) => p.image)));

  products.forEach((p, i) => {
    p.brand ??= 'LeadersMart';
    p.description ??= DEMO_OVERVIEW;
    p.views ??= 1000 + (((i + 1) * 7919) % 20000);

    if (!p.images) {
      const others = pool.filter((src) => src !== p.image);
      const start = others.length ? i % others.length : 0;
      const rotated = [...others.slice(start), ...others.slice(0, start)];
      p.images = [p.image, ...rotated.slice(0, 3)];
    }
  });
}