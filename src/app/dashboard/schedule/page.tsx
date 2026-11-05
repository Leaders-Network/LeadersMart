'use client';

const scheduleRows = [
  { day: 'Mon', event: 'Team sync', tone: 'bg-violet-100 text-violet-700' },
  { day: 'Tue', event: 'Design review', tone: 'bg-amber-100 text-amber-700' },
  { day: 'Wed', event: 'Launch prep', tone: 'bg-emerald-100 text-emerald-700' },
  { day: 'Thu', event: 'Marketing sprint', tone: 'bg-rose-100 text-rose-700' },
  { day: 'Fri', event: 'Warehouse check', tone: 'bg-sky-100 text-sky-700' },
];

export default function SchedulePage() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-[#e5def7] bg-[#f8f5ff] shadow-[0_12px_30px_rgba(91,64,181,0.08)]">
      <div className="flex min-h-[720px] bg-white">
        <div className="flex-1 p-4">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Schedule</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">Schedule</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700">⟳</div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700">＋</div>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-violet-50 px-2 py-1 font-medium text-violet-700">Apr 2025</span>
            <span>Week view</span>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <div className="mb-3 grid grid-cols-5 gap-2 text-center text-sm font-semibold uppercase tracking-[0.04em] text-slate-500">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-2">
              {scheduleRows.map((row, index) => (
                <div key={row.day} className="rounded-xl border border-slate-200 bg-white p-2">
                  <div className={`mb-2 rounded-full px-2 py-1.5 text-xs font-semibold ${row.tone}`}>
                    {row.day}
                  </div>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-violet-50 p-2 text-sm leading-5 text-violet-700">{row.event}</div>
                    {index % 2 === 0 ? <div className="rounded-lg bg-slate-100 p-2 text-xs text-slate-600">2 tasks</div> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
