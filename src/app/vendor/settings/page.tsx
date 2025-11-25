import VendorSidebar from '@/components/VendorSidebar';

const settingsSections = [
  {
    title: 'Business profile',
    detail: 'Brand identity, documents, and regional preferences.',
  },
  {
    title: 'Team & roles',
    detail: 'Invite teammates, assign permissions, and enforce MFA.',
  },
  {
    title: 'Billing & payouts',
    detail: 'Bank accounts, payout cadence, and invoice history.',
  },
  {
    title: 'Notifications',
    detail: 'Control email, SMS, and Slack alerts for every workflow.',
  },
];

export default function VendorSettingsPage() {
  return (
    <section className="bg-slate-50 py-12 text-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <VendorSidebar />
          <div className="space-y-8">
            <header className="rounded-3xl bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500 p-10 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Settings</p>
              <h1 className="mt-4 text-4xl font-bold">Control every lever from one calm hub.</h1>
              <p className="mt-3 max-w-2xl text-blue-100">
                Configure security, payouts, and workflows in a minimal blue-white layout. Future integrations will surface forms and
                toggles directly below.
              </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
              {settingsSections.map((section) => (
                <div key={section.title} className="rounded-3xl border border-slate-200 bg-white p-6">
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{section.title}</p>
                  <p className="mt-3 text-sm text-slate-600">{section.detail}</p>
                  <button className="mt-4 text-sm font-semibold text-blue-700">Manage →</button>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-6">
              <h2 className="text-2xl font-bold text-slate-900">Security center</h2>
              <p className="mt-3 text-sm text-slate-600">
                Enable SSO, review audit logs, and monitor device approvals. Integrate with Okta, Azure AD, or Google Workspace in a
                few clicks.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-2xl border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700">Enable SSO</button>
                <button className="rounded-2xl border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700">
                  Download audit log
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


