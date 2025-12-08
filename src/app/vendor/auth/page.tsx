'use client';

import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Delivery options
const deliveryOptions = [
  "GIG Logistics",
  "DHL",
  "FedEx",
  "SpeedAF",
  "Kwik Delivery",
  "Bolt Delivery",
  "Jumia Delivery",
];

type AuthForm = {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  password: string;
  deliveryServices: string[];
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
    deliveryServices: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [deliveryError, setDeliveryError] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  function handleChange(field: keyof AuthForm, value: string) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleDeliverySelect(service: string) {
    setFormValues((prev) => {
      const exists = prev.deliveryServices.includes(service);
      let updatedServices: string[];
  
      if (exists) {
        // Remove service if already selected
        updatedServices = prev.deliveryServices.filter((s) => s !== service);
      } else {
        // Add service
        updatedServices = [...prev.deliveryServices, service];
      }
  
      // Reset error if at least one service is selected
      if (updatedServices.length > 0) setDeliveryError(false);
  
      return { ...prev, deliveryServices: updatedServices };
    });
  }
  

  function verifyNIN() {
    
    alert('NIN verification in progress...hold on a minute ');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (authMode === 'signup' && formValues.deliveryServices.length < 1) {
      setDeliveryError(true);
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(
      authMode === 'login'
        ? 'Authenticating… Redirecting to your dashboard.'
        : 'Creating your vendor profile… Redirecting to dashboard.'
    );

    setTimeout(() => {
      router.push('/vendor/dashboard');
    }, 900);
  }

  return (
    <section className={`bg-slate-50 py-16 text-slate-900 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr]">

        {/* LEFT SIDE */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500 p-10 text-white transform transition-all duration-700 hover:scale-[1.02]">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/20 blur-3xl animate-pulse" />
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

          <div className="mt-10 rounded-2xl bg-white/15 px-6 py-4 text-sm font-semibold text-blue-50 backdrop-blur hover:scale-[1.01] transition-transform">
            Prefer a guided onboarding? Book a 20-minute call with a vendor success lead.
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-xl transform transition-all duration-500 hover:scale-[1.02]">

            {/* Toggle */}
            <div className="flex gap-2 rounded-full bg-slate-100 p-1 text-sm font-semibold">
              <button
                className={`flex-1 rounded-full px-4 py-2 transition ${authMode === 'login' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                onClick={() => setAuthMode('login')}
              >
                Sign in
              </button>
              <button
                className={`flex-1 rounded-full px-4 py-2 transition ${authMode === 'signup' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                onClick={() => setAuthMode('signup')}
              >
                Create account
              </button>
            </div>

            {/* FORM */}
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

                  {/* NIN */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600">NIN Number</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter your NIN"
                        className="mt-2 rounded-2xl border border-slate-200 px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={verifyNIN}
                      >
                        Verify NIN
                      </button>
                    </div>
                  </div>

                  {/* Delivery Services */}
                  <div>
                    <label className="text-sm font-semibold text-slate-600">
                      Delivery Services Close to You
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {deliveryOptions.map((service) => {
                        const selected = formValues.deliveryServices.includes(service);
                        return (
                          <button
                            type="button"
                            key={service}
                            onClick={() => handleDeliverySelect(service)}
                            className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                              selected
                                ? "bg-blue-600 text-white border-blue-600 scale-105 shadow-md"
                                : "bg-white text-slate-600 border-slate-300 hover:border-blue-400 hover:text-blue-600"
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                    {deliveryError && <p className="text-red-500 text-sm mt-1">Please select at least one delivery service.</p>}
                  </div>
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
    <label className="text-sm font-semibold text-slate-600 flex flex-col">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none transition"
        required
      />
    </label>
  );
}

function HighlightCard({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-5 backdrop-blur transform transition hover:scale-[1.02]">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">{title}</p>
      <p className="mt-2 text-sm text-blue-50">{detail}</p>
    </div>
  );
}
