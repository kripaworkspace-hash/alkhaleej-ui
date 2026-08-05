import { Clock, Package, Truck, TriangleAlert } from 'lucide-react'
import clsx from 'clsx'
import TruckImage from '../../../components/ui/TruckImage'
import { LOADING_STATUS, loadingBays, loadingSummary } from '../data/mockLoadingSection'

const CARD_SHADOW =
  'shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)]'

const SUMMARY_ICONS = { bpm: Clock, bags: Package, rejected: TriangleAlert, trucks: Truck }

/** Straight wire with an arrowhead at the destination end, showing flow direction. */
function Wire({ color }) {
  return (
    <span className="flex w-6 shrink-0 items-center sm:w-8" aria-hidden>
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
      <span
        className="h-0 w-0 shrink-0 border-y-[4px] border-l-[6px] border-y-transparent"
        style={{ borderLeftColor: color }}
      />
    </span>
  )
}

function BeltNode({ id, status }) {
  const meta = LOADING_STATUS[status] ?? LOADING_STATUS.noTruck

  return (
    <span
      className={clsx(
        'flex h-14 w-24 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white shadow-sm',
        meta.node,
      )}
    >
      {id}
    </span>
  )
}

/** Truck icon box ending the belt chain — its status pill and current rate float above it.
 * The truck itself is tinted green when a truck is present at the bay, grey otherwise —
 * same color concept as the Main Bagging Area flow diagram. */
function DispatchBlock({ status, rate, truckPresent }) {
  const meta = LOADING_STATUS[status] ?? LOADING_STATUS.noTruck

  return (
    <div className="flex w-36 shrink-0 flex-col items-center gap-3 py-1">
      <div className="flex items-center gap-2.5 whitespace-nowrap">
        <span className={clsx('rounded-full px-3 py-1 text-xs font-semibold', meta.pill)}>{meta.label}</span>
        <span className={clsx('text-sm font-bold tabular-nums', meta.rate)}>{rate}/min</span>
      </div>
      <div className="-mt-2.5 flex h-20 w-20 items-center justify-center">
        <TruckImage className="h-full w-full object-contain" tint={truckPresent ? '#10b981' : '#94a3b8'} />
      </div>
    </div>
  )
}

function BayMetricsCard({ metrics }) {
  return (
    <div className="w-full shrink-0 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50/60 px-4 sm:w-56">
      <div className="flex items-center justify-between py-2.5">
        <span className="text-xs text-slate-500">Total Bags</span>
        <span className="text-sm font-bold text-slate-900 tabular-nums">{metrics.totalBags.toLocaleString()}</span>
      </div>
      <div className="flex items-center justify-between py-2.5">
        <span className="text-xs text-slate-500">Truck Status</span>
        <span className={clsx('text-sm font-bold', metrics.truckPresent ? 'text-emerald-600' : 'text-red-500')}>
          {metrics.truckPresent ? 'Present' : 'Absent'}
        </span>
      </div>
      <div className="flex items-center justify-between py-2.5">
        <span className="text-xs text-slate-500">External Rejected</span>
        <span className="text-sm font-bold text-slate-900 tabular-nums">{metrics.externalRejected}</span>
      </div>
    </div>
  )
}

function BayRow({ bay }) {
  const meta = LOADING_STATUS[bay.status] ?? LOADING_STATUS.noTruck

  return (
    <div className="flex items-center gap-2 border-b border-dashed border-slate-200 py-5 last:border-b-0">
      <div className="relative flex min-w-0 flex-1 items-center justify-start gap-1 overflow-x-auto">
        <div className="absolute left-[24%] top-1/2 flex w-5 -translate-y-1/2 items-center justify-center">
          <span className="origin-center -rotate-90 text-[11px] font-semibold whitespace-nowrap text-slate-400">
            {bay.label}
          </span>
        </div>

        <div className="ml-[30%] flex shrink-0 items-center">
          <div className="flex shrink-0 items-center">
            {bay.belts.map((belt, i) => (
              <div key={belt.id} className="flex items-center">
                <BeltNode id={belt.id} status={bay.status} />
                {i < bay.belts.length - 1 && <Wire color={meta.wire} />}
              </div>
            ))}
          </div>
          <Wire color={meta.wire} />
          <DispatchBlock status={bay.status} rate={bay.rate} truckPresent={bay.metrics.truckPresent} />
        </div>
      </div>

      <BayMetricsCard metrics={bay.metrics} />
    </div>
  )
}

function SummaryStatCard({ icon, label, value, caption, tone = 'neutral' }) {
  const Icon = SUMMARY_ICONS[icon] ?? Package

  return (
    <div className={clsx('rounded-2xl border border-white/80 bg-white/90 px-5 py-4 backdrop-blur-md', CARD_SHADOW)}>
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-900/10 text-slate-500">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <span className="text-sm text-slate-500">{label}</span>
      </div>
      <p
        className={clsx(
          'mt-3 text-3xl leading-none font-bold tabular-nums',
          tone === 'warning' ? 'text-amber-600' : 'text-slate-900',
        )}
      >
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-500">{caption}</p>
    </div>
  )
}

/** UB → SB/LB belt chain per bay, ending at the dispatch truck, plus shift-wide KPI cards. */
function BayFlowDiagram() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
      <section className={clsx('flex-1 rounded-2xl border border-white/80 bg-white/90 px-5 pt-6 backdrop-blur-md', CARD_SHADOW)}>
        <div className="flex flex-col">
          {loadingBays.map((bay) => (
            <BayRow key={bay.id} bay={bay} />
          ))}
        </div>
      </section>

      <div className="grid shrink-0 grid-cols-2 gap-3 lg:w-64 lg:grid-cols-1">
        {loadingSummary.map((card) => (
          <SummaryStatCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  )
}

export default BayFlowDiagram
