import Link from 'next/link';
import Brand from './Brand';

export default function Footer() {
  const footerLinks = [
    {
      heading: 'Discover',
      links: [
        { label: 'Shop all products', href: '#' },
        { label: 'Flash sales', href: '#flash-sales' },
        { label: 'New arrivals', href: '#' },
        { label: 'Gift-worthy finds', href: '#' },
      ],
    },
    {
      heading: 'Here to help',
      links: [
        { label: 'Help center', href: '#' },
        { label: 'Track your order', href: '/orders' },
        { label: 'Shipping & returns', href: '#' },
        { label: 'Buyer protection', href: '#' },
      ],
    },
    {
      heading: 'For sellers',
      links: [
        { label: 'Become a seller', href: '/seller/register' },
        { label: 'Seller sign in', href: '/seller/sign-in' },
        { label: 'Seller resources', href: '#' },
        { label: 'Seller guidelines', href: '#' },
      ],
    },
    {
      heading: 'Leaders Mart',
      links: [
        { label: 'Our story', href: '#' },
        { label: 'Why shop with us', href: '#' },
        { label: 'Contact us', href: '#' },
        { label: 'Careers', href: '#' },
      ],
    },
  ];

  return (
    <footer style={{ background: '#111827' }}>
      <div className="max-w-[1312px] mx-auto px-4 lg:px-0 pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Brand variant="light" />
            <p className="text-[13px] mt-4 mb-4 leading-relaxed" style={{ color: '#9DA3B4' }}>
              A trusted marketplace for everyday discoveries.<br />
              Good products. Great people. Better shopping.
            </p>
            <p className="text-[13px] font-600 mb-5" style={{ color: '#D1D5DB', fontWeight: 600 }}>
              Your next great find is one tap away.
            </p>
            {/* App badges */}
            <div className="flex gap-2 flex-wrap">
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 rounded-lg border text-white text-[12px] hover:opacity-80"
                style={{ borderColor: '#374151', background: '#1F2937' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div style={{ color: '#9DA3B4', fontSize: 9 }}>Downloaded on the</div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 rounded-lg border text-white text-[12px] hover:opacity-80"
                style={{ borderColor: '#374151', background: '#1F2937' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div>
                  <div style={{ color: '#9DA3B4', fontSize: 9 }}>GET IT ON</div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h4 className="text-white text-[13px] font-700 mb-4" style={{ fontWeight: 700 }}>
                {group.heading}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] hover:text-white transition-colors"
                      style={{ color: '#9DA3B4' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #1F2937' }}>
          <p className="text-[12px]" style={{ color: '#6B7280' }}>
            © 2026 Leaders Mart. All good things reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy policy', 'Terms of service', 'Accessibility'].map((item) => (
              <Link key={item} href="#" className="text-[12px] hover:text-white" style={{ color: '#6B7280' }}>
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a href="#" className="hover:opacity-80" style={{ color: '#6B7280' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Pinterest */}
            <a href="#" className="hover:opacity-80" style={{ color: '#6B7280' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="hover:opacity-80" style={{ color: '#6B7280' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          <div className="flex items-center gap-2 text-[12px] font-600" style={{ color: '#9DA3B4', fontWeight: 600 }}>
            <span>VISA</span>
            <span>Mastercard</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
