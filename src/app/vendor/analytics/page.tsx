import VendorSidebar from '@/components/VendorSidebar';

const sampleMetrics = [
  { label: 'Revenue (MTD)', value: '$82,400', delta: '+12.4%' },
  { label: 'Units sold', value: '4,560', delta: '+8.1%' },
  { label: 'Return rate', value: '2.4%', delta: '-0.6%' },
  { label: 'Customer NPS', value: '67', delta: '+4' },
];

const charts = [
  {
    title: 'Channel performance',
    detail: 'Break down marketplace, retail, and wholesale contributions.',
  },
  {
    title: 'Acquisition sources',
    detail: 'View campaign lift and CAC across paid, organic, and partnerships.',
  },
  {
    title: 'Cohort retention',
    detail: 'Measure reorder velocity and churn per customer cohort.',
  },
];

export default function VendorAnalyticsPage() {
  return (
    <section className="bg-slate-50 py-12 text-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <VendorSidebar />
          <div className="space-y-8">
            <header className="rounded-3xl bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500 p-10 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Analytics</p>
              <h1 className="mt-4 text-4xl font-bold">Deep visibility into growth signals.</h1>
              <p className="mt-3 max-w-2xl text-blue-100">
                Track revenue, retention, and fulfilment health in a clean blue-and-white canvas. Export dashboards or schedule
                emailed digests for your team.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {sampleMetrics.map((metric) => (
                <div key={metric.label} className="rounded-3xl border border-blue-100 bg-white p-6">
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{metric.label}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">{metric.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{metric.delta} vs last period</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {charts.map((chart) => (
                <div key={chart.title} className="rounded-3xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{chart.title}</p>
                      <p className="text-sm text-slate-500">{chart.detail}</p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Live</span>
                  </div>
                  <div className="mt-6 h-48 rounded-2xl bg-gradient-to-r from-blue-100 to-white"></div>
                </div>
              ))}
              <div className="rounded-3xl border border-dashed border-blue-200 bg-white/80 p-6">
                <h2 className="text-2xl font-bold text-slate-900">Custom dashboards</h2>
                <p className="mt-3 text-sm text-slate-600">
                  Drag-and-drop cards, add SQL-powered widgets, and invite finance or marketing with role-based permissions.
                </p>
                <button className="mt-5 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30">
                  Create dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


