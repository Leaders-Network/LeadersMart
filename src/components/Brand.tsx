import Link from 'next/link';

interface BrandProps {
  variant?: 'dark' | 'light';
  showSellerCenter?: boolean;
  href?: string;
}

export default function Brand({ variant = 'dark', showSellerCenter = false, href = '/' }: BrandProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#171C36]';
  const subColor = variant === 'light' ? 'text-white/70' : 'text-[#6F7489]';

  return (
    <Link href={href} className="flex items-center gap-2.5 shrink-0">
      {/* Shopping bag icon */}
      <div className="w-9 h-9 rounded-[10px] flex items-center justify-center"
        style={{ background: variant === 'light' ? 'rgba(255,255,255,0.18)' : '#4353EC' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`text-[15px] font-700 tracking-[-0.2px] ${textColor}`} style={{ fontWeight: 700 }}>
          leaders mart
        </span>
        {showSellerCenter && (
          <span className={`text-[9px] font-600 tracking-[1.2px] uppercase ${subColor}`} style={{ fontWeight: 600 }}>
            SELLER CENTER
          </span>
        )}
      </div>
    </Link>
  );
}
