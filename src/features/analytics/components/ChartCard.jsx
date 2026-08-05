/** Shared card chrome for every chart on the Analytics dashboard. */
function ChartCard({ title, subtitle, action, children }) {
  return (
    <div className="h-full rounded-xl border border-white/70 bg-white/90 px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-xl">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export default ChartCard
