import type { ReactNode } from 'react';

const WRAP = 'mx-auto w-full max-w-[1920px] px-[15px]';

/* 24x24 outline icons, drawn thin like the template */
const ICONS: Record<string, ReactNode> = {
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </>
  ),
  money: (
    <>
      <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
      <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 16 6 6" />
      <circle cx="16" cy="9" r="2.9" />
      <circle cx="6" cy="5" r="3" />
    </>
  ),
  support: (
    <>
      <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
      <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </>
  ),
  wallet: (
    <>
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </>
  ),
};

const SERVICES = [
  { icon: 'rocket', title: 'Free Shipping', text: 'on orders over ₦49' },
  { icon: 'money', title: 'Money Guarantee', text: '30 days money back' },
  { icon: 'support', title: 'Online Support', text: '24/24 on day' },
  { icon: 'gift', title: 'Gift Promotion', text: 'money back guarantee' },
  { icon: 'wallet', title: 'Payment Method', text: 'online 24/24 on day' },
] as const;

export default function ServiceStrip() {
  return (
    <section className={`${WRAP} mt-[28px]`} aria-label="Our services">
      <ul className="grid grid-cols-1 gap-[25px] sm:grid-cols-2 lg:grid-cols-5">
        {SERVICES.map((s) => (
          <li
            key={s.title}
            className="flex h-[73px] items-center gap-[17px] rounded-[4px] border border-[#e8e8e8] bg-[#f8f8f8] px-[22px]"
          >
            <svg
              className="h-[38px] w-[38px] shrink-0 text-[#8B52D7]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {ICONS[s.icon]}
            </svg>
            <div className="min-w-0">
              <p className="text-[13px] font-normal uppercase leading-5 text-[#222]">{s.title}</p>
              <p className="text-[12px] leading-5 text-[#888]">{s.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}