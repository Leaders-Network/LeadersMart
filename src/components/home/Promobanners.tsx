import Link from 'next/link';
import SoftImg from '@/components/ui/Softimg';
import { bottomBanners, promoStrip } from '@/data/home';

const WRAP = 'mx-auto w-full max-w-[1920px] px-[15px]';

/** Wide strip between Top Categories and the deals row (about 968 x 68) */
export function PromoStrip() {
  return (
    <section className={`${WRAP} mt-[22px]`} aria-label="Promotion">
      <Link href={promoStrip.href} className="block aspect-[968/68] w-full overflow-hidden rounded-[4px]">
        <SoftImg src={promoStrip.image} alt={promoStrip.alt} className="h-full w-full object-cover" />
      </Link>
    </section>
  );
}

/** Three banners in a row (about 308 x 142 each) */
export function BannerTrio() {
  return (
    <section className={`${WRAP} mt-4`} aria-label="Featured banners">
      <ul className="grid grid-cols-1 gap-[22px] sm:grid-cols-3">
        {bottomBanners.map((b) => (
          <li key={b.id}>
            <Link href={b.href} className="block aspect-[308/142] w-full overflow-hidden rounded-[4px]">
              <SoftImg src={b.image} alt={b.alt} className="h-full w-full object-cover" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}