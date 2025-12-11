Project snapshot

- Framework: Next.js (App Router). Primary source is `src/app`.
- TypeScript paths: `@/*` -> `./src/*` (see `tsconfig.json`).
- Styling: Tailwind + `globals.css` in `src/app`.

Quick commands

- Dev server: `npm run dev` (runs `next dev`).
- Build: `npm run build` then `npm run start` to serve production build.
- Lint: `npm run lint` (invokes `eslint`).

Architecture & important patterns

- App Router: Routes live under `src/app`. Example dynamic routes:
  - `src/app/categories/[slug]/page.tsx`
  - `src/app/products/[id]/page.tsx`
  - `src/app/cart/page.tsx`

- Layout & global providers: `src/app/layout.tsx` wraps pages with `CartProvider` and global `Header`.
  - Keep global UI and providers here; localize state to providers imported in `layout.tsx`.

- Client vs Server components:
  - The codebase uses the Next.js app-dir default (server components). Files that require client features add a top-line `'use client'` (example: `src/context/CartContext.tsx`).
  - When adding interactive components that use hooks or browser APIs, add `'use client'` as the first line.

- State and data:
  - Cart state lives in `src/context/CartContext.tsx` (in-memory React state; no persistence by default).
  - Product and category data are static arrays in `src/data/products.ts` and `src/data/categories.ts` (used by pages and components).
  - Types are defined in `src/types/index.ts` (e.g. `Product`, `CartItem`, `Category`) — import `@/types`.

Conventions & examples

- Absolute imports: always use `@/` for imports from `src`. Example: `import { products } from '@/data/products'`.
- Public assets: reference images with paths under `public/`, e.g. `image: '/placeholder-product.jpg'`.
- Fonts: loaded in `src/app/layout.tsx` via `next/font` — prefer adding global fonts there.

Editing guidelines for agents

- If you modify a UI component that uses state/hooks, ensure it has `'use client'` at top.
- Prefer small, focused commits that update one route or component at a time.
- When changing shape of `Product` or `CartItem`, update `src/types/index.ts` and adjust `CartContext` logic accordingly.
- When adding new pages, mirror patterns in `src/app/*`: export default `page` components as React components in `page.tsx` files.

Integration notes

- No external API integrations are present — data is local. If you add an API, prefer Next.js route handlers under `src/app/api/`.
- Build toolchain: `next` + `tailwindcss` + `postcss`. See `package.json` and `postcss.config.mjs` for details.

What I cannot assume

- There are no unit tests configured in the repo; do not add test assumptions.
- Cart state is ephemeral — if persistence is needed, add explicit storage (localStorage or server API) and document it.

Where to look for examples

- Global layout & provider: `src/app/layout.tsx`.
- Cart logic and client-hook example: `src/context/CartContext.tsx`.
- Static data shapes: `src/data/products.ts` and `src/data/categories.ts`.
- Types: `src/types/index.ts`.

If anything here seems incomplete or you want more examples (e.g., how components handle styling or modals), tell me which area to expand and I'll update this file.
