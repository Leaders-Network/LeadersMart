'use client';

import { useState } from 'react';
import Link from 'next/link';
import VendorSidebar from '@/components/VendorSidebar';

// ─── Data ─────────────────────────────────────────────────────────────────────
const transactions = [
  { id: 'PAY-0091', type: 'withdrawal', amount: '-₦1,200.00', date: 'Oct 7, 2026', status: 'Completed', statusBg: '#E7F6EF', statusColor: '#167A59', method: 'MTN MoMo · 0801 *** 7821', note: 'Weekly payout' },
  { id: 'PAY-0090', type: 'earning',    amount: '+₦327.00',   date: 'Oct 6, 2026', status: 'Settled',   statusBg: '#EEEDFF', statusColor: '#4353EC', method: '4 orders',              note: 'Order earnings' },
  { id: 'PAY-0089', type: 'earning',    amount: '+₦483.00',   date: 'Oct 5, 2026', status: 'Settled',   statusBg: '#EEEDFF', statusColor: '#4353EC', method: '6 orders',              note: 'Order earnings' },
  { id: 'PAY-0088', type: 'withdrawal', amount: '-₦800.00',   date: 'Oct 3, 2026', status: 'Completed', statusBg: '#E7F6EF', statusColor: '#167A59', method: 'MTN MoMo · 0801 *** 7821', note: 'Mid-week payout' },
  { id: 'PAY-0087', type: 'earning',    amount: '+₦216.00',   date: 'Oct 2, 2026', status: 'Settled',   statusBg: '#EEEDFF', statusColor: '#4353EC', method: '3 orders',              note: 'Order earnings' },
  { id: 'PAY-0086', type: 'earning',    amount: '+₦572.00',   date: 'Oct 1, 2026', status: 'Settled',   statusBg: '#EEEDFF', statusColor: '#4353EC', method: '7 orders',              note: 'Order earnings' },
  { id: 'PAY-0085', type: 'withdrawal', amount: '-₦950.00',   date: 'Sep 30, 2026', status: 'Completed', statusBg: '#E7F6EF', statusColor: '#167A59', method: 'MTN MoMo · 0801 *** 7821', note: 'Weekly payout' },
  { id: 'PAY-0084', type: 'fee',        amount: '-₦24.58',    date: 'Sep 30, 2026', status: 'Deducted',  statusBg: '#FFF1E7', statusColor: '#B65C27', method: 'Platform fee',         note: '1% marketplace fee' },
];

// MTN MoMo yellow
const MOMO_YELLOW = '#FFCC00';
const MOMO_BG     = '#FFFBEB';
const MOMO_BORDER = '#FDE68A';

// ─── Shared top-bar used across all seller sub-pages ──────────────────────────
function DashboardTopBar({ breadcrumb, mobileMenuOpen, setMobileMenuOpen }: {
  breadcrumb: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}) {
  return (
    <div className="bg-white border-b sticky top-0 z-30 flex items-center gap-4 px-6 py-0" style={{ borderColor: '#E6E8F1', height: 76 }}>
      <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Open navigation">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M3 12h18M3 6h18M3 18h18" stroke="#171C36" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <div className="flex items-center gap-1.5 text-[13px]">
        <Link href="/seller/dashboard" style={{ color: '#9DA3B4' }} className="hover:text-[#171C36]">Seller center</Link>
        <span style={{ color: '#D1D5DB' }}>/</span>
        <span className="font-600 text-[#171C36]" style={{ fontWeight: 600 }}>{breadcrumb}</span>
      </div>
      <div className="relative hidden md:block flex-1 max-w-xs ml-4">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="#9DA3B4" strokeWidth="1.8"/>
          <path d="m21 21-4.35-4.35" stroke="#9DA3B4" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <input type="text" placeholder="Search orders, products, and more" className="h-9 w-full pl-8 pr-4 rounded-lg text-[13px] outline-none" style={{ background: '#F7F8FC', border: '1.5px solid #E6E8F1', color: '#171C36' }} />
      </div>
      <div className="ml-auto flex items-center gap-4">
        <span className="hidden md:block text-[13px]" style={{ color: '#9DA3B4' }}>Thursday, October 8, 2026</span>
        <button className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-50" style={{ border: '1.5px solid #E6E8F1' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#6F7489" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#4353EC' }} />
        </button>
      </div>
    </div>
  );
}

// ─── Withdraw modal ───────────────────────────────────────────────────────────
function WithdrawModal({ balance, onClose, onSuccess }: { balance: number; onClose: () => void; onSuccess: (amt: number) => void }) {
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const numericAmount = parseFloat(amount.replace(/,/g, '')) || 0;

  function validate() {
    const e: Record<string, string> = {};
    if (!amount || numericAmount <= 0) e.amount = 'Enter a valid amount.';
    else if (numericAmount > balance) e.amount = `Amount exceeds available balance (₦${balance.toLocaleString()}).`;
    else if (numericAmount < 5) e.amount = 'Minimum withdrawal is ₦5.00.';
    if (!pin || pin.length < 4) e.pin = 'Enter your 4-digit MoMo PIN.';
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (step === 'form') {
      const e = validate();
      if (Object.keys(e).length) { setErrors(e); return; }
      setErrors({});
      setStep('confirm');
    } else if (step === 'confirm') {
      setStep('success');
      onSuccess(numericAmount);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(23,28,54,0.55)' }} onClick={onClose}>
      <div className="bg-white w-full max-w-md" style={{ borderRadius: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: '#E6E8F1' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: MOMO_BG, border: `1.5px solid ${MOMO_BORDER}` }}>
              <span className="text-[15px]" style={{ fontWeight: 800, color: '#78350F' }}>M</span>
            </div>
            <div>
              <p className="text-[15px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>
                {step === 'success' ? 'Withdrawal sent!' : 'Withdraw funds'}
              </p>
              <p className="text-[12px]" style={{ color: '#9DA3B4' }}>MTN Mobile Money</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#6F7489" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div className="px-6 py-6">
          {step === 'success' ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#E7F6EF' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="#167A59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="#167A59" strokeWidth="2"/>
                </svg>
              </div>
              <p className="text-[20px] font-700 text-[#171C36] mb-1" style={{ fontWeight: 700 }}>₦{numericAmount.toLocaleString('en', { minimumFractionDigits: 2 })} on its way</p>
              <p className="text-[14px] mb-5" style={{ color: '#6F7489' }}>
                Your withdrawal to MTN MoMo account ending in <strong>7821</strong> has been submitted. Funds typically arrive within a few minutes.
              </p>
              <div className="p-3 rounded-xl text-left mb-5" style={{ background: '#F7F8FC', border: '1px solid #E6E8F1' }}>
                <div className="flex justify-between text-[13px] mb-2">
                  <span style={{ color: '#6F7489' }}>Transaction ID</span>
                  <span className="font-600 text-[#171C36]" style={{ fontWeight: 600 }}>PAY-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span style={{ color: '#6F7489' }}>Estimated arrival</span>
                  <span className="font-600 text-[#171C36]" style={{ fontWeight: 600 }}>Within 10 minutes</span>
                </div>
              </div>
              <button onClick={onClose} className="w-full h-11 rounded-xl text-white text-[14px] font-600 hover:opacity-90" style={{ background: '#4353EC', fontWeight: 600 }}>Done</button>
            </div>
          ) : step === 'confirm' ? (
            <div>
              <p className="text-[14px] mb-5" style={{ color: '#6F7489' }}>Please confirm the details below before we send your funds.</p>
              <div className="p-4 rounded-xl mb-5" style={{ background: '#F7F8FC', border: '1px solid #E6E8F1' }}>
                {[
                  { label: 'Amount', value: `₦${numericAmount.toLocaleString('en', { minimumFractionDigits: 2 })}` },
                  { label: 'To', value: 'MTN MoMo · 0801 *** 7821' },
                  { label: 'Account name', value: 'Jordan Lee' },
                  { label: 'Fee', value: 'Free' },
                  { label: 'You receive', value: `₦${numericAmount.toLocaleString('en', { minimumFractionDigits: 2 })}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2 text-[13px]" style={{ borderBottom: '1px solid #E6E8F1' }}>
                    <span style={{ color: '#6F7489' }}>{label}</span>
                    <span className="font-600 text-[#171C36]" style={{ fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('form')} className="flex-1 h-11 rounded-xl text-[14px] font-600 border hover:bg-gray-50" style={{ border: '1.5px solid #E6E8F1', color: '#6F7489', fontWeight: 600 }}>Back</button>
                <button onClick={handleSubmit} className="flex-1 h-11 rounded-xl text-white text-[14px] font-600 hover:opacity-90" style={{ background: '#4353EC', fontWeight: 600 }}>Confirm withdrawal</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Destination */}
              <div className="p-3.5 rounded-xl flex items-center gap-3 mb-5" style={{ background: MOMO_BG, border: `1.5px solid ${MOMO_BORDER}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: MOMO_YELLOW }}>
                  <span className="text-[16px]" style={{ fontWeight: 900, color: '#78350F' }}>M</span>
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>MTN Mobile Money</p>
                  <p className="text-[12px]" style={{ color: '#92400E' }}>0801 *** 7821 · Jordan Lee</p>
                </div>
                <span className="text-[11px] font-600 px-2 py-0.5 rounded-full" style={{ background: '#E7F6EF', color: '#167A59', fontWeight: 600 }}>Verified</span>
              </div>

              {/* Amount */}
              <div className="mb-4">
                <label className="block text-[13px] font-600 text-[#171C36] mb-1.5" style={{ fontWeight: 600 }}>Amount to withdraw</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>₦</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={e => { setAmount(e.target.value); setErrors(p => ({ ...p, amount: '' })); }}
                    placeholder="0.00"
                    min="5"
                    step="0.01"
                    className="w-full h-12 pl-8 pr-4 rounded-xl border outline-none text-[16px] font-600"
                    style={{ border: `1.5px solid ${errors.amount ? '#C0392B' : '#E6E8F1'}`, color: '#171C36', fontWeight: 600 }}
                  />
                </div>
                {errors.amount
                  ? <p className="text-[11px] mt-1" style={{ color: '#C0392B' }}>{errors.amount}</p>
                  : <p className="text-[11px] mt-1" style={{ color: '#9DA3B4' }}>Available: <span className="font-600 text-[#171C36]" style={{ fontWeight: 600 }}>₦{balance.toLocaleString('en', { minimumFractionDigits: 2 })}</span></p>
                }
                <div className="flex gap-2 mt-2">
                  {[25000, 50000, 100000, 500000].map(q => (
                    <button key={q} type="button"
                      onClick={() => { setAmount(String(Math.min(q, balance))); setErrors(p => ({ ...p, amount: '' })); }}
                      className="flex-1 py-1.5 rounded-lg text-[12px] font-600 border hover:border-[#4353EC] hover:text-[#4353EC]"
                      style={{ border: '1.5px solid #E6E8F1', color: '#6F7489', fontWeight: 600 }}
                    >
                      ₦{q >= 1000 ? `${q/1000}k` : q}
                    </button>
                  ))}
                </div>
              </div>

              {/* PIN */}
              <div className="mb-6">
                <label className="block text-[13px] font-600 text-[#171C36] mb-1.5" style={{ fontWeight: 600 }}>MoMo PIN</label>
                <input
                  type="password"
                  value={pin}
                  onChange={e => { setPin(e.target.value.slice(0, 4)); setErrors(p => ({ ...p, pin: '' })); }}
                  placeholder="• • • •"
                  maxLength={4}
                  inputMode="numeric"
                  className="w-full h-12 px-4 rounded-xl border outline-none text-[20px] tracking-widest text-center"
                  style={{ border: `1.5px solid ${errors.pin ? '#C0392B' : '#E6E8F1'}`, color: '#171C36', letterSpacing: '0.4em' }}
                />
                {errors.pin && <p className="text-[11px] mt-1" style={{ color: '#C0392B' }}>{errors.pin}</p>}
              </div>

              <button type="submit" className="w-full h-12 rounded-xl text-white text-[15px] font-600 flex items-center justify-center gap-2 hover:opacity-90" style={{ background: '#4353EC', fontWeight: 600 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Continue
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-4">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#167A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[11px]" style={{ color: '#9DA3B4' }}>Secured by 256-bit encryption. We never store your PIN.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Add MoMo account modal ───────────────────────────────────────────────────
function AddMoMoModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState({ phone: '', name: '', network: 'MTN' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.phone) e.phone = 'Phone number is required.';
    else if (!/^0[789][01]\d{8}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid Nigeria phone number (e.g. 0801 000 0000).';
    if (!form.name.trim()) e.name = 'Account name is required.';
    return e;
  }

  function handleSave(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaved(true);
    setTimeout(() => { onSave(); onClose(); }, 1200);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(23,28,54,0.55)' }} onClick={onClose}>
      <div className="bg-white w-full max-w-md" style={{ borderRadius: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: '#E6E8F1' }}>
          <p className="text-[15px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Add MTN MoMo account</p>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#6F7489" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="px-6 py-6">
          {saved ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#E7F6EF' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="#167A59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="#167A59" strokeWidth="2"/>
                </svg>
              </div>
              <p className="text-[15px] font-600 text-[#167A59]" style={{ fontWeight: 600 }}>Account added!</p>
            </div>
          ) : (
            <form onSubmit={handleSave} noValidate>
              <div className="p-3.5 rounded-xl flex items-center gap-3 mb-5" style={{ background: MOMO_BG, border: `1.5px solid ${MOMO_BORDER}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: MOMO_YELLOW }}>
                  <span style={{ fontWeight: 900, color: '#78350F', fontSize: 15 }}>M</span>
                </div>
                <p className="text-[13px]" style={{ color: '#92400E' }}>
                  Make sure the phone number is registered with <strong>MTN Mobile Money</strong> in Nigeria.
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-[13px] font-600 text-[#171C36] mb-1.5" style={{ fontWeight: 600 }}>Network</label>
                <div className="flex gap-2">
                  {['MTN'].map(n => (
                    <button key={n} type="button"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[13px] font-600"
                      style={{ border: `1.5px solid ${MOMO_YELLOW}`, background: MOMO_BG, color: '#92400E', fontWeight: 600 }}
                    >
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: MOMO_YELLOW, fontWeight: 900, color: '#78350F' }}>M</div>
                      MTN MoMo
                    </button>
                  ))}
                  <div className="flex-1 flex items-center px-3 py-2.5 rounded-xl border text-[12px]" style={{ border: '1.5px solid #E6E8F1', color: '#9DA3B4' }}>Other networks — coming soon</div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[13px] font-600 text-[#171C36] mb-1.5" style={{ fontWeight: 600 }}>Phone number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => { setForm(p => ({ ...p, phone: e.target.value })); setErrors(p => ({ ...p, phone: '' })); }}
                  placeholder="0801 000 0000"
                  className="w-full h-12 px-4 rounded-xl border outline-none text-[14px]"
                  style={{ border: `1.5px solid ${errors.phone ? '#C0392B' : '#E6E8F1'}`, color: '#171C36' }}
                />
                {errors.phone && <p className="text-[11px] mt-1" style={{ color: '#C0392B' }}>{errors.phone}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-[13px] font-600 text-[#171C36] mb-1.5" style={{ fontWeight: 600 }}>Account name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })); }}
                  placeholder="As registered with MTN"
                  className="w-full h-12 px-4 rounded-xl border outline-none text-[14px]"
                  style={{ border: `1.5px solid ${errors.name ? '#C0392B' : '#E6E8F1'}`, color: '#171C36' }}
                />
                {errors.name && <p className="text-[11px] mt-1" style={{ color: '#C0392B' }}>{errors.name}</p>}
                <p className="text-[11px] mt-1" style={{ color: '#9DA3B4' }}>Must match exactly the name on your MoMo account.</p>
              </div>

              <button type="submit" className="w-full h-11 rounded-xl text-white text-[14px] font-600 hover:opacity-90" style={{ background: '#4353EC', fontWeight: 600 }}>
                Save account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function PayoutsPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showAddMoMo, setShowAddMoMo] = useState(false);
  const [hasMoMo, setHasMoMo] = useState(true); // demo: already connected
  const [balance, setBalance] = useState(2430500);
  const [txns, setTxns] = useState(transactions);
  const [filterType, setFilterType] = useState<'all' | 'withdrawal' | 'earning' | 'fee'>('all');

  const filtered = filterType === 'all' ? txns : txns.filter(t => t.type === filterType);

  function handleWithdrawSuccess(amount: number) {
    setBalance(prev => prev - amount);
    const newTxn = {
      id: `PAY-${Math.floor(Math.random() * 9000 + 1000)}`,
      type: 'withdrawal' as const,
      amount: `-₦${amount.toFixed(2)}`,
      date: 'Oct 8, 2026',
      status: 'Completed',
      statusBg: '#E7F6EF',
      statusColor: '#167A59',
      method: 'MTN MoMo · 0801 *** 7821',
      note: 'Manual withdrawal',
    };
    setTxns(prev => [newTxn, ...prev]);
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#F7F8FC', fontFamily: "'Inter', sans-serif" }}>
      <VendorSidebar />

      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileNavOpen(false)} style={{ background: 'rgba(23,28,54,0.4)' }}>
          <div className="absolute left-0 top-0 bottom-0 w-[240px] bg-white" onClick={e => e.stopPropagation()}>
            <VendorSidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopBar breadcrumb="Payouts" mobileMenuOpen={mobileNavOpen} setMobileMenuOpen={setMobileNavOpen} />

        <div className="flex-1 p-6 lg:p-8">
          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-[26px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Payouts</h1>
              <p className="text-[14px] mt-0.5" style={{ color: '#6F7489' }}>Your earnings, ready when you are.</p>
            </div>
            <button
              onClick={() => hasMoMo ? setShowWithdraw(true) : setShowAddMoMo(true)}
              className="flex items-center gap-2 h-10 px-5 rounded-xl text-white text-[13px] font-600 hover:opacity-90 self-start"
              style={{ background: '#4353EC', fontWeight: 600 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v10m0 0l-3-3m3 3l3-3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 15v4a2 2 0 002 2h14a2 2 0 002-2v-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Withdraw funds
            </button>
          </div>

          {/* Balance + payout method row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Available balance */}
            <div className="md:col-span-1 bg-white p-6 flex flex-col gap-4" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
              <div className="flex items-center justify-between">
                <span className="text-[13px]" style={{ color: '#6F7489' }}>Available balance</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#F7F8FC' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <line x1="12" y1="1" x2="12" y2="23" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-[34px] font-800 text-[#171C36] leading-none" style={{ fontWeight: 800 }}>
                  ₦{balance.toLocaleString('en', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[12px] mt-1.5 flex items-center gap-1" style={{ color: '#167A59' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#167A59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#167A59" strokeWidth="2"/></svg>
                  <span>Ready to withdraw</span>
                </p>
              </div>
              <button
                onClick={() => hasMoMo ? setShowWithdraw(true) : setShowAddMoMo(true)}
                className="w-full h-10 rounded-xl text-white text-[13px] font-600 hover:opacity-90"
                style={{ background: '#4353EC', fontWeight: 600 }}
              >
                Withdraw now
              </button>
            </div>

            {/* This week / month stats */}
            <div className="md:col-span-1 bg-white p-6 flex flex-col gap-3" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
              <span className="text-[13px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>Earnings summary</span>
              {[
                { label: 'This week', value: '₦1,598.00', color: '#4353EC' },
                { label: 'This month', value: '₦6,240.00', color: '#167A59' },
                { label: 'Total withdrawn', value: '₦18,320.00', color: '#6F7489' },
                { label: 'Platform fee (1%)', value: '₦62.40', color: '#B65C27' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #F7F8FC' }}>
                  <span className="text-[13px]" style={{ color: '#6F7489' }}>{label}</span>
                  <span className="text-[13px] font-600" style={{ fontWeight: 600, color }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Payout method */}
            <div className="md:col-span-1 bg-white p-6 flex flex-col gap-4" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-600 text-[#171C36]" style={{ fontWeight: 600 }}>Payout method</span>
                <button onClick={() => setShowAddMoMo(true)} className="text-[12px] font-600 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>
                  {hasMoMo ? 'Edit' : '+ Add'}
                </button>
              </div>

              {hasMoMo ? (
                <div>
                  <div className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: MOMO_BG, border: `1.5px solid ${MOMO_BORDER}` }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: MOMO_YELLOW }}>
                      <span style={{ fontWeight: 900, color: '#78350F', fontSize: 18 }}>M</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>MTN Mobile Money</p>
                      <p className="text-[12px]" style={{ color: '#92400E' }}>0801 *** 7821</p>
                      <p className="text-[11px]" style={{ color: '#B45309' }}>Jordan Lee</p>
                    </div>
                    <span className="text-[11px] font-600 px-2 py-0.5 rounded-full shrink-0" style={{ background: '#E7F6EF', color: '#167A59', fontWeight: 600 }}>Active</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#167A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[11px]" style={{ color: '#9DA3B4' }}>Verified · Withdrawals instant – 10 min</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="p-4 rounded-xl text-center" style={{ background: '#F7F8FC', border: '1.5px dashed #E6E8F1' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: MOMO_BG, border: `1.5px solid ${MOMO_BORDER}` }}>
                      <span style={{ fontWeight: 900, color: '#78350F', fontSize: 16 }}>M</span>
                    </div>
                    <p className="text-[13px] font-600 text-[#171C36] mb-1" style={{ fontWeight: 600 }}>No payout method yet</p>
                    <p className="text-[12px] mb-3" style={{ color: '#9DA3B4' }}>Add your MTN MoMo account to start withdrawing.</p>
                    <button onClick={() => setShowAddMoMo(true)} className="px-4 py-2 rounded-xl text-white text-[13px] font-600 hover:opacity-90" style={{ background: '#4353EC', fontWeight: 600 }}>
                      Add MTN MoMo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info notice */}
          <div className="flex items-start gap-3 px-5 py-4 rounded-2xl mb-6" style={{ background: '#EEEDFF' }}>
            <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#4353EC" strokeWidth="2"/>
              <line x1="12" y1="8" x2="12" y2="12" stroke="#4353EC" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="16" x2="12.01" y2="16" stroke="#4353EC" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p className="text-[13px] text-[#171C36]">
              <span className="font-600" style={{ fontWeight: 600 }}>Payouts are processed instantly to your MTN MoMo account.</span>{' '}
              A 1% marketplace fee applies to all earnings. Minimum withdrawal is ₦500. Funds are settled 24 hours after delivery confirmation. Available to Nigerian MTN MoMo accounts only.
            </p>
          </div>

          {/* Transaction history */}
          <div className="bg-white p-6" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="text-[15px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>Transaction history</h3>
                <p className="text-[12px]" style={{ color: '#9DA3B4' }}>Every penny, accounted for.</p>
              </div>
              {/* Filter pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {([['all', 'All'], ['earning', 'Earnings'], ['withdrawal', 'Withdrawals'], ['fee', 'Fees']] as const).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setFilterType(key)}
                    className="px-3 py-1.5 rounded-full text-[12px] font-500"
                    style={{
                      fontWeight: 500,
                      background: filterType === key ? '#171C36' : 'white',
                      color: filterType === key ? 'white' : '#6F7489',
                      border: `1.5px solid ${filterType === key ? '#171C36' : '#E6E8F1'}`,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr style={{ borderBottom: '1px solid #E6E8F1' }}>
                    {['ID', 'Note', 'Method', 'Date', 'Status', 'Amount'].map(h => (
                      <th key={h} className="text-left pb-3 text-[11px] font-600 uppercase tracking-wider" style={{ color: '#9DA3B4', fontWeight: 600, paddingRight: 16 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((txn, i) => (
                    <tr key={txn.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F7F8FC' : 'none' }}>
                      <td className="py-3.5 pr-4">
                        <span className="text-[13px] font-600" style={{ color: '#4353EC', fontWeight: 600 }}>{txn.id}</span>
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className="text-[13px] text-[#171C36]">{txn.note}</span>
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className="text-[13px]" style={{ color: '#6F7489' }}>{txn.method}</span>
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className="text-[13px]" style={{ color: '#9DA3B4' }}>{txn.date}</span>
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-600" style={{ background: txn.statusBg, color: txn.statusColor, fontWeight: 600 }}>
                          {txn.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <span
                          className="text-[14px] font-700"
                          style={{ fontWeight: 700, color: txn.amount.startsWith('+') ? '#167A59' : txn.type === 'fee' ? '#B65C27' : '#171C36' }}
                        >
                          {txn.amount}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={6} className="py-10 text-center text-[13px]" style={{ color: '#9DA3B4' }}>No transactions found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid #F7F8FC' }}>
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="#167A59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="#167A59" strokeWidth="2"/>
                </svg>
                <span className="text-[12px]" style={{ color: '#9DA3B4' }}>All transactions encrypted and secured</span>
              </div>
              <Link href="#" className="text-[12px] hover:opacity-80" style={{ color: '#4353EC' }}>Download statement</Link>
            </div>
          </div>
        </div>
      </div>

      {showWithdraw && (
        <WithdrawModal
          balance={balance}
          onClose={() => setShowWithdraw(false)}
          onSuccess={handleWithdrawSuccess}
        />
      )}
      {showAddMoMo && (
        <AddMoMoModal
          onClose={() => setShowAddMoMo(false)}
          onSave={() => setHasMoMo(true)}
        />
      )}
    </div>
  );
}
