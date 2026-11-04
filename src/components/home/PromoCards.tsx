import Link from 'next/link';
import SoftImg from '@/components/ui/Softimg';
import { promoCards, type PromoCard } from '@/data/home';

const WRAP = 'mx-auto w-full max-w-[1920px] px-[15px]';

const THEMES: Record<PromoCard['theme'], string> = {
  blue: 'bg-gradient-to-tr from-[#4f6cf2] to-[#63cbff]',
  orange: 'bg-gradient-to-tr from-[#ff8a24] to-[#ffc25c]',
  green: 'bg-gradient-to-tr from-[#1fc16a] to-[#62e99b]',
  red: 'bg-gradient-to-tr from-[#f9705b] to-[#ffa89b]',
};

function DoubleChevron() {
  return (
    <svg className="h-[9px] w-[9px]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 2l4 4-4 4M7 2l4 4-4 4" />
    </svg>
  );
}

export default function PromoCards() {
  return (
    <section className={`${WRAP} mt-[28px]`} aria-label="Special offers">
      <ul className="grid grid-cols-1 gap-[25px] sm:grid-cols-2 lg:grid-cols-4">
        {promoCards.map((c) => (
          <li key={c.id}>
            <Link
              href={c.href}
              aria-label={c.alt}
              className={`relative block h-[189px] overflow-hidden rounded-[4px] px-5 pt-[18px] text-white ${THEMES[c.theme]}`}
            >
              {/* round photo, cut off by the card edges */}
              <div className="absolute -bottom-[73px] -right-[17px] h-[190px] w-[190px] overflow-hidden rounded-full border-4 border-white">
                <SoftImg src={c.image} alt="" className="h-full w-full object-cover" />
              </div>

              <p className="relative text-[18px] font-light uppercase leading-[21px]">
                {c.title.map((line, i) => (
                  <span key={i} className="block">
                    {line.map((seg, j) => (
                      <span key={j} className={seg.b ? 'font-bold' : ''}>
                        {seg.t}
                      </span>
                    ))}
                  </span>
                ))}
              </p>

              <p className="relative mt-[25px] text-[12px] font-bold uppercase leading-4 text-white/90">{c.label}</p>
              <p className="relative flex items-baseline gap-1 leading-[26px]">
                <span className="text-[22px] font-bold">{c.value}</span>
                {c.suffix && <span className="text-[15px] font-bold uppercase">{c.suffix}</span>}
              </p>

              <p className="relative mt-[31px] flex items-center gap-1 text-[12px] font-bold uppercase leading-4">
                Shop now <DoubleChevron />
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}