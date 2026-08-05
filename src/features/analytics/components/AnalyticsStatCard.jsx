import { Gauge, Clock, PackageX, HardHat, TrendingUp } from 'lucide-react'
import clsx from 'clsx'

const ICONS = {
  throughput: TrendingUp,
  utilization: Gauge,
  downtime: Clock,
  rejection: PackageX,
  ppe: HardHat,
}

const TONES = {
  good: 'text-emerald-600',
  neutral: 'text-slate-500',
  warning: 'text-amber-600',
  critical: 'text-red-600',
}

/** Headline KPI tile — no plot, so no hover layer. */
function AnalyticsStatCard({ label, value, caption, icon, tone = 'neutral' }) {
  const Icon = ICONS[icon] ?? TrendingUp

  return (
    <div className="rounded-xl border border-white/70 bg-white/90 px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-xl">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-900/10 text-slate-500">
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </span>
        <span className="truncate text-sm text-slate-500">{label}</span>
      </div>
      <p className="mt-3 text-3xl leading-none font-semibold text-slate-900 tabular-nums">{value}</p>
      <p className={clsx('mt-3 text-sm', TONES[tone] ?? TONES.neutral)}>{caption}</p>
    </div>
  )
}

export default AnalyticsStatCard
