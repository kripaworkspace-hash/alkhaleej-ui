import { CircleGauge, OctagonAlert, Package, Truck } from 'lucide-react'

const ICONS = {
  bags: Package,
  utilization: CircleGauge,
  stoppages: OctagonAlert,
  trucks: Truck,
}

function SummaryCard({ icon, label, value }) {
  const Icon = ICONS[icon] ?? Package

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white/95 px-4 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-md">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-900/10 text-slate-500">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs text-slate-500">{label}</p>
        <p className="text-lg leading-tight font-bold text-slate-900 tabular-nums">{value}</p>
      </div>
    </div>
  )
}

export default SummaryCard
