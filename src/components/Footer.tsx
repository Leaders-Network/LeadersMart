import Link from 'next/link';
import type { ReactNode } from 'react';
import NewsletterForm from '@/components/NewsletterForm';
import { contact, footerColumns, searchTags, socials } from '@/data/footer';

/* Page background is dark navy; these are the shades used on it */
const BG = 'bg-[#23233f]';
const TEXT = 'text-[#c9c9d6]';
const ACCENT = 'text-indigo-400'; /* the template's red, swapped for a brand colour that reads on dark */
const FOOT_WRAP = 'mx-auto w-full max-w-[1920px] px-[15px] sm:px-[30px] xl:px-[45px]';

/* ------------------------------- small icons ----------------------------- */

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function ContactIcon({ children }: { children: ReactNode }) {
  return (
    <svg className={`mr-[9px] h-3 w-3 shrink-0 ${ACCENT}`} viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
      {children}
    </svg>
  );
}

function SocialIcon({ id }: { id: (typeof socials)[number]['id'] }) {
  const common = { className: 'h-[14px] w-[14px]', viewBox: '0 0 24 24', 'aria-hidden': true } as const;
  switch (id) {
    case 'facebook':
      return (
        <svg {...common} fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...common} fill="currentColor">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
          <path d="m10 15 5-3-5-3z" fill="#ed1c2f" />
        </svg>
      );
    case 'twitter':
      return (
        <svg {...common} fill="currentColor">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      );
    case 'google':
      return <span className="text-[12px] font-bold leading-none">G+</span>;
    case 'instagram':
      return (
        <svg {...common} {...strokeProps}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <path d="M17.5 6.5h.01" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg {...common} {...strokeProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 17l2-9a2.5 2.5 0 1 1 1 4.6" />
        </svg>
      );
  }
}

function MailRocketIcon() {
  return (
    <svg className="h-[42px] w-[78px] shrink-0 text-white" viewBox="0 0 78 42" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="26" y="3" width="50" height="36" rx="1" />
      <path d="M26 3l25 21L76 3M26 39l17-17M76 39L59 22" />
      <path d="M2 12h18M8 21h14M2 30h18" />
    </svg>
  );
}

/* ------------------------------ app + payments --------------------------- */
/* Simple text badges so nothing depends on image files. Swap for official badge images if you like. */

function AppStoreBadge() {
  return (
    <a href="#" aria-label="Download on the App Store" className="flex h-[34px] w-[94px] flex-col justify-center rounded-[4px] border border-white/80 bg-black pl-3 leading-none text-white">
      <span className="text-[6px]">Download on the</span>
      <span className="mt-[2px] text-[13px] font-medium">App Store</span>
    </a>
  );
}

function GooglePlayBadge() {
  return (
    <a href="#" aria-label="Get it on Google Play" className="flex h-[34px] w-[97px] items-center gap-[6px] rounded-[4px] border border-white/80 bg-black pl-[10px] leading-none text-white">
      <svg className="h-[18px] w-[16px] shrink-0" viewBox="0 0 16 18" aria-hidden="true">
        <path d="M1 1l9 8-9 8z" fill="#4fc3f7" />
        <path d="M1 1l11 6.2-2 1.8z" fill="#66bb6a" />
        <path d="M1 17l11-6.2-2-1.8z" fill="#ef5350" />
        <path d="M12 7.2l3 1.8-3 1.8-2-1.8z" fill="#ffca28" />
      </svg>
      <span className="flex flex-col">
        <span className="text-[5.5px] uppercase">Android app on</span>
        <span className="mt-[2px] text-[12px]">Google play</span>
      </span>
    </a>
  );
}

const PAYMENTS = [
  { name: 'Maestro', cls: 'bg-[#1f4e9c] text-white italic', text: 'maestro' },
  { name: 'PayPal', cls: 'bg-[#e8f1fb] text-[#1c3f94] italic font-bold', text: 'PayPal' },
  { name: 'Western Union', cls: 'bg-black text-[#f5c518] border border-[#f5c518] font-bold', text: 'WU' },
  { name: 'Visa', cls: 'bg-white text-[#1a1f71] italic font-bold', text: 'VISA' },
  { name: 'Cirrus', cls: 'bg-[#1a5da6] text-white', text: 'Cirrus' },
  { name: 'eBay', cls: 'bg-[#f5c518] text-[#222] font-bold', text: 'ebay' },
];

/* ------------------------------- pieces ---------------------------------- */

function Heading({ children, line = 'h-px bg-[#5a5a75]' }: { children: ReactNode; line?: string }) {
  return (
    <>
      <h3 className="text-[14px] font-bold uppercase leading-5 text-white">{children}</h3>
      <span className={`mt-[11px] block w-[25px] ${line}`} />
    </>
  );
}

/* -------------------------------- footer -------------------------------- */

export default function Footer() {
  return (
    <footer className={`${BG} ${TEXT}`}>
      {/* ====== top: contact + 4 link columns ====== */}
      <div className={`${FOOT_WRAP} pt-[42px]`}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[42.45%_14.86%_14.86%_14.86%_1fr] lg:gap-x-0">
          {/* contact */}
          <div className="col-span-2 lg:col-span-1">
            <Heading>Contact Us</Heading>
            <ul className="mt-[14px] text-[12px]">
              <li className="flex h-[33px] items-center">
                <ContactIcon>
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </ContactIcon>
                <strong className="mr-[6px] font-bold text-white">Address:</strong>
                <span>{contact.address}</span>
              </li>
              <li className="flex h-[33px] items-center">
                <ContactIcon>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </ContactIcon>
                <strong className="mr-[6px] font-bold text-white">Hotline:</strong>
                <a href={`tel:${contact.hotline.split(' ')[0].replace(/[^\d+]/g, '')}`} className="hover:text-white">
                  {contact.hotline}
                </a>
              </li>
              <li className="flex h-[33px] items-center">
                <ContactIcon>
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </ContactIcon>
                <strong className="mr-[6px] font-bold text-white">Email:</strong>
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </li>
              <li className="flex h-[33px] items-center">
                <ContactIcon>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </ContactIcon>
                <strong className="mr-[6px] font-bold text-white">Open Time:</strong>
                <span>{contact.openTime}</span>
              </li>
            </ul>

            <ul className="mt-[24px] flex gap-2">
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className={`flex h-8 w-8 items-center justify-center rounded-[2px] text-white transition-opacity hover:opacity-85 ${s.bg}`}
                  >
                    <SocialIcon id={s.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* link columns */}
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <Heading>{col.title}</Heading>
              <ul className="mt-3">
                {col.links.map((l) => (
                  <li key={l.label} className="flex h-[29px] items-center">
                    <Link href={l.href} className="text-[12px] transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-[43px] border-t border-[#3a3a55]" />

        {/* ====== most searched ====== */}
        <div className="pb-[49px] pt-[43px]">
          <Heading line="h-[2px] bg-indigo-400">Most Searched on LeadersMart</Heading>
          <ul className="mt-[22px] flex flex-wrap gap-[5px]">
            {searchTags.map((t, i) => (
              <li key={`${t}-${i}`}>
                <Link
                  href={`/search?q=${encodeURIComponent(t)}`}
                  className="inline-flex h-6 items-center rounded-[2px] bg-[#35354f] px-[13px] text-[11px] font-medium text-white transition-colors hover:bg-[#46466a]"
                >
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ====== newsletter band ====== */}
      <div className="bg-[#2d2d49]">
        <div className={`${FOOT_WRAP} flex min-h-[82px] flex-col items-start justify-between gap-4 py-5 md:flex-row md:items-center md:py-0`}>
          <div className="flex items-center gap-[43px]">
            <MailRocketIcon />
            <p className="text-[13px] font-medium uppercase leading-5 text-white">
              Sign up for newsletter &amp; get <strong className="font-bold">20% off</strong> first order
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* ====== bottom bar ====== */}
      <div className={`${FOOT_WRAP} flex flex-col gap-6 pb-[30px] pt-[25px] md:flex-row md:justify-between`}>
        <div className="flex flex-wrap items-center gap-x-[28px] gap-y-3 md:mt-[7px] md:self-start">
          <p className="text-[12px] font-bold uppercase leading-none text-white">Download our app</p>
          <div className="flex gap-[11px]">
            <AppStoreBadge />
            <GooglePlayBadge />
          </div>
        </div>

        <div className="flex flex-col gap-[17px] md:items-end">
          <ul className="flex gap-2" aria-label="Accepted payment methods">
            {PAYMENTS.map((p) => (
              <li
                key={p.name}
                title={p.name}
                className={`flex h-[25px] w-10 items-center justify-center rounded-[3px] text-[9px] leading-none ${p.cls}`}
              >
                {p.text}
              </li>
            ))}
          </ul>
          <p className="text-[11px] leading-4">
            © {new Date().getFullYear()} <span className={ACCENT}>LeadersMart</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}