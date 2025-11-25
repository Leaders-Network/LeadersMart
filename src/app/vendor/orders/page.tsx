import VendorSidebar from '@/components/VendorSidebar';

const orderStages = [
  { stage: 'Pending', count: 32, subtext: 'Awaiting confirmation' },
  { stage: 'Processing', count: 18, subtext: 'Being prepared' },
  { stage: 'Shipped', count: 54, subtext: 'In transit' },
  { stage: 'Delivered', count: 310, subtext: 'Completed in last 30d' },
];

const fulfillmentTips = [
  'Enable smart batching to combine nearby deliveries.',
  'Sync carrier tracking to automatically notify customers.',
  'Use SLA alerts to escalate orders approaching deadlines.',
];

export default function VendorOrdersPage() {
  return (
    <section className="bg-slate-50 py-12 text-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <VendorSidebar />
          <div className="space-y-8">
            <header className="rounded-3xl bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500 p-10 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Orders</p>
              <h1 className="mt-4 text-4xl font-bold">Stay ahead of fulfilment SLAs.</h1>
              <p className="mt-3 max-w-2xl text-blue-100">
                A blue-white timeline shows each order’s progress, making it easy to prioritize escalations and keep customers informed.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {orderStages.map((item) => (
                <div key={item.stage} className="rounded-3xl border border-blue-100 bg-white p-6">
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{item.stage}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">{item.count}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.subtext}</p>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Fulfilment queue</p>
                  <h2 className="text-xl font-semibold text-slate-900">Today&apos;s orders</h2>
                </div>
                <button className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30">
                  Export CSV
                </button>
              </div>
              <div className="px-6 py-6 text-sm text-slate-600">
                Connect your real order feed to display live data here. Status pills, courier info, and SLA timers will render automatically.
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">Escalation playbook</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {fulfillmentTips.map((tip) => (
                    <li key={tip} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">Need automation?</h3>
                <p className="mt-3 text-sm text-slate-600">
                  Enable rules to auto-assign carriers, split shipments, or trigger customer outreach when delays are detected.
                </p>
                <button className="mt-5 rounded-2xl border border-blue-200 px-6 py-3 text-sm font-semibold text-blue-700">
                  Configure automations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


