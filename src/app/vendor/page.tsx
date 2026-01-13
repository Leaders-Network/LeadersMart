import Link from 'next/link';

const highlightStats = [
  { label: 'Vendors onboarded', value: '1,200+' },
  { label: 'Avg. fulfilment time', value: '1.6 days' },
  { label: 'Customer satisfaction', value: '4.8 ★' },
];

const experiencePillars = [
  {
    title: 'Launch-ready storefronts',
    detail:
      'Curated templates and automated catalog imports help you list products in minutes, not weeks.',
  },
  {
    title: 'Real-time inventory sync',
    detail:
      'Connect your POS or ERP and let LeadersMart keep stock levels aligned across every sales channel.',
  },
  {
    title: 'Actionable analytics',
    detail:
      'A blue-and-white dashboard highlights the KPIs that matter—orders, revenue, fulfilment, and returns.',
  },
];

const steps = [
  { number: '01', title: 'Create an account', detail: 'Tell us about your business and delivery regions.' },
  { number: '02', title: 'Verify & list products', detail: 'Upload SKUs, pricing, and availability in bulk.' },
  { number: '03', title: 'Go live with insights', detail: 'Track performance in the vendor dashboard instantly.' },
];

const perks = [
  { title: 'Instant payouts', detail: 'Same-day settlements to your preferred bank.' },
  { title: 'Priority support', detail: 'Dedicated success manager and marketplace hotline.' },
  { title: 'Sponsored placements', detail: 'Boost discovery with targeted homepage slots.' },
];

export default function VendorLandingPage() {
  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500 text-white">
        <div className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">
              LeadersMart Vendors
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Grow a modern storefront with clarity, control, and confidence.
            </h1>
            <p className="text-lg text-blue-100">
              Sell faster with enterprise-level tooling wrapped in a calm blue-white experience.
              Plug in your catalog, invite teammates, and monitor sales from a dashboard built to feel premium.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/vendor/auth"
                className="rounded-2xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg shadow-blue-900/30 transition hover:bg-slate-100"
              >
                Vendor sign in / sign up
              </Link>
              <Link
                href="/vendor/dashboard"
                className="rounded-2xl border border-white/50 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Preview dashboard
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlightStats.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="text-sm uppercase tracking-wide text-blue-100">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">
              What to expect
            </p>
            <h2 className="mt-4 text-2xl font-bold">A modern marketplace toolkit</h2>
            <p className="mt-4 text-blue-100">
              LeadersMart packages payouts, catalog automation, and analytics into one sleek workspace.
            </p>
            <ul className="mt-8 space-y-6 text-blue-50">
              <li>• Blue/white dashboard that surfaces KPIs in one glance.</li>
              <li>• Collaborative workflows for support agents and fulfilment partners.</li>
              <li>• Insights refreshed every 5 minutes across desktop and mobile.</li>
            </ul>
            <div className="mt-10 rounded-2xl bg-white/20 px-5 py-3 text-sm font-semibold text-blue-50">
              Need a guided tour? <span className="text-white">Book a demo with a vendor success lead.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto space-y-16 px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {experiencePillars.map((pillar) => (
            <div key={pillar.title} className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">The experience</p>
              <h3 className="mt-4 text-2xl font-bold text-slate-900">{pillar.title}</h3>
              <p className="mt-4 text-sm text-slate-600">{pillar.detail}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-12 text-white">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-blue-100">Launch playbook</p>
              <h3 className="mt-4 text-3xl font-bold">Three steps to start selling</h3>
            </div>
            <Link
              href="/vendor/auth"
              className="self-start rounded-2xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg shadow-blue-900/30 transition hover:bg-slate-100"
            >
              Begin onboarding
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="rounded-2xl bg-white/10 p-6">
                <p className="text-sm font-semibold text-blue-100">{step.number}</p>
                <h4 className="mt-2 text-xl font-bold">{step.title}</h4>
                <p className="mt-2 text-sm text-blue-50">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Why vendors stay</p>
            <h3 className="mt-4 text-3xl font-bold text-slate-900">Built for brands who value design + data.</h3>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {perks.map((perk) => (
                <div key={perk.title} className="rounded-2xl bg-slate-50 p-6">
                  <h4 className="text-lg font-semibold text-slate-900">{perk.title}</h4>
                  <p className="mt-2 text-sm text-slate-600">{perk.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-2xl border border-dashed border-blue-200 p-6 text-sm text-slate-600">
              Still exploring?{' '}
              <Link href="/vendor/dashboard" className="font-semibold text-blue-600">
                Browse the live dashboard preview
              </Link>{' '}
              or{' '}
              <Link href="/vendor/auth" className="font-semibold text-blue-600">
                create your vendor account
              </Link>{' '}
              when you are ready.
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-8 text-slate-900">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-600">Support</p>
              <h4 className="mt-4 text-2xl font-bold">Concierge onboarding</h4>
              <p className="mt-4 text-sm text-slate-600">
                Schedule a white-glove onboarding call, upload your catalog with our team, and learn best practices
                for channel growth.
              </p>
              <Link href="/help" className="mt-6 inline-block font-semibold text-blue-700">
                Talk to success →
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-600">Security</p>
              <h4 className="mt-4 text-2xl font-bold text-slate-900">Verified marketplace</h4>
              <p className="mt-4 text-sm text-slate-600">
                Every vendor goes through compliance checks. Two-factor authentication and audit logs protect your
                operations around the clock.
              </p>
              <Link href="/vendor/auth" className="mt-6 inline-block font-semibold text-blue-700">
                Secure login →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

