'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthForm = {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  password: string;
};

export default function VendorAuthPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [formValues, setFormValues] = useState<AuthForm>({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  function handleChange(field: keyof AuthForm, value: string) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(
      authMode === 'login'
        ? 'Authenticating… Redirecting to your dashboard.'
        : 'Creating your vendor profile… Redirecting to dashboard.',
    );

    setTimeout(() => {
      router.push('/vendor/dashboard');
    }, 900);
  }

  return (
    <section className="bg-slate-50 py-16 text-slate-900">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500 p-10 text-white">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/20 blur-3xl" />
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Vendor access</p>
          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
            Sign in or create a LeadersMart vendor account.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Streamlined workflows, instant payouts, and analytics wrapped in a calm blue-white interface. Securely
            manage catalog, orders, and fulfilment from any device.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <HighlightCard title="24/7 support" detail="Marketplace specialists ready to help across chat, mail, and phone." />
            <HighlightCard title="Modern security" detail="Multi-factor auth, device approvals, and downloadable audit logs." />
          </div>

          <div className="mt-10 rounded-2xl bg-white/15 px-6 py-4 text-sm font-semibold text-blue-50 backdrop-blur">
            Prefer a guided onboarding? Book a 20-minute call with a vendor success lead.
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-xl">
            <div className="flex gap-2 rounded-full bg-slate-100 p-1 text-sm font-semibold">
              <button
                className={`flex-1 rounded-full px-4 py-2 transition ${
                  authMode === 'login'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                onClick={() => setAuthMode('login')}
              >
                Sign in
              </button>
              <button
                className={`flex-1 rounded-full px-4 py-2 transition ${
                  authMode === 'signup'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                onClick={() => setAuthMode('signup')}
              >
                Create account
              </button>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {authMode === 'signup' && (
                <>
                  <FormField
                    label="Business name"
                    value={formValues.businessName}
                    placeholder="E.g. Northstar Gadgets"
                    onChange={(value) => handleChange('businessName', value)}
                  />
                  <FormField
                    label="Contact person"
                    value={formValues.contactName}
                    placeholder="Your full name"
                    onChange={(value) => handleChange('contactName', value)}
                  />
                  <FormField
                    label="Phone number"
                    value={formValues.phone}
                    placeholder="+1 555 987 3210"
                    onChange={(value) => handleChange('phone', value)}
                  />
                </>
              )}

              <FormField
                label={authMode === 'login' ? 'Vendor email or ID' : 'Work email'}
                value={formValues.email}
                placeholder="vendor@leadersmart.com"
                onChange={(value) => handleChange('email', value)}
              />

              <FormField
                label="Password"
                type="password"
                value={formValues.password}
                placeholder="••••••••"
                onChange={(value) => handleChange('password', value)}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {isSubmitting
                  ? authMode === 'login'
                    ? 'Signing in...'
                    : 'Creating account...'
                  : authMode === 'login'
                  ? 'Enter dashboard'
                  : 'Create vendor account'}
              </button>

              <p className="text-center text-sm text-slate-500">
                By continuing, you agree to the LeadersMart{' '}
                <span className="font-semibold text-blue-600">Vendor Terms & Security Policy</span>.
              </p>
            </form>
          </div>

          <div className="rounded-3xl border border-dashed border-blue-200 bg-white/80 p-6 text-sm text-slate-600">
            {statusMessage ? (
              statusMessage
            ) : (
              <>
                Need access for your support team?{' '}
                <span className="font-semibold text-blue-600">Invite teammates from the dashboard after login.</span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="text-sm font-semibold text-slate-600">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
        required
      />
    </label>
  );
}

function HighlightCard({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">{title}</p>
      <p className="mt-2 text-sm text-blue-50">{detail}</p>
    </div>
  );
}


