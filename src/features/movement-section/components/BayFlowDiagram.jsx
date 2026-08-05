import { CircleDot, CircleMinus, Settings, TriangleAlert } from 'lucide-react'
import clsx from 'clsx'
import { MOVEMENT_STATUS, movementBays, movementSummary } from '../data/mockMovementSection'

const CARD_SHADOW =
  'shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)]'

const GHOST_WIRE_COLOR = '#cbd5e1'

const SUMMARY_ICONS = { belts: Settings, stoppages: CircleMinus, warning: TriangleAlert, stopped: CircleDot }

/** Straight wire with an arrowhead at the destination end, showing flow direction. */
function Wire({ color }) {
  return (
    <span className="flex w-8 shrink-0 items-center sm:w-10" aria-hidden>
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
      <span
        className="h-0 w-0 shrink-0 border-y-[4px] border-l-[6px] border-y-transparent"
        style={{ borderLeftColor: color }}
      />
    </span>
  )
}

function BeltNode({ id, status }) {
  const meta = MOVEMENT_STATUS[status] ?? MOVEMENT_STATUS.stopped

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

/** Faded placeholder node — the upper belt this section feeds into, not tracked here. */
function GhostNode({ id, status }) {
  const meta = MOVEMENT_STATUS[status] ?? MOVEMENT_STATUS.stopped

  return (
    <span
      className={clsx(
        'flex h-14 w-24 shrink-0 items-center justify-center rounded-lg text-sm font-semibold',
        meta.ghost,
      )}
    >
      {id}
    </span>
  )
}

function StatusPill({ status }) {
  const meta = MOVEMENT_STATUS[status] ?? MOVEMENT_STATUS.stopped

  return (
    <span className={clsx('rounded-full px-3 py-1 text-xs font-semibold', meta.pill)}>{meta.label}</span>
  )
}

function BayMetricsCard({ metrics, status }) {
  const meta = MOVEMENT_STATUS[status] ?? MOVEMENT_STATUS.stopped

  return (
    <div className="w-full shrink-0 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50/60 px-4 sm:w-56">
      <div className="flex items-center justify-between py-2.5">
        <span className="text-xs text-slate-500">Belt Activity</span>
        <span className={clsx('text-sm font-bold', meta.activity)}>{metrics.beltActivity}</span>
      </div>
      <div className="flex items-center justify-between py-2.5">
        <span className="text-xs text-slate-500">Utilization</span>
        <span className="text-sm font-bold text-slate-900 tabular-nums">{metrics.utilization}%</span>
      </div>
      <div className="flex items-center justify-between py-2.5">
        <span className="text-xs text-slate-500">Open Stops</span>
        <span className="text-sm font-bold text-slate-900 tabular-nums">{metrics.openStops}</span>
      </div>
    </div>
  )
}

function BayRow({ bay }) {
  const meta = MOVEMENT_STATUS[bay.status] ?? MOVEMENT_STATUS.stopped
  const [mainBelt, subBelt] = bay.belts

  return (
    <div className="flex items-center gap-2 border-b border-dashed border-slate-200 py-5 last:border-b-0">
      <div className="relative flex min-w-0 flex-1 items-center justify-start gap-1 overflow-x-auto">
        <div className="absolute left-[24%] top-1/2 flex w-5 -translate-y-1/2 items-center justify-center">
          <span className="origin-center -rotate-90 text-[11px] font-semibold whitespace-nowrap text-slate-400">
            {bay.label}
          </span>
        </div>

        <div className="ml-[30%] flex shrink-0 flex-col items-center gap-2">
          <StatusPill status={bay.status} />
          <div className="flex items-center">
            <BeltNode {...mainBelt} />
            <Wire color={meta.line} />
            <BeltNode {...subBelt} />
            <Wire color={GHOST_WIRE_COLOR} />
            <GhostNode id={bay.upperBelt} status={bay.status} />
          </div>
        </div>
      </div>

      <BayMetricsCard metrics={bay.metrics} status={bay.status} />
    </div>
  )
}

function SummaryStatCard({ icon, label, value, caption, tone = 'neutral' }) {
  const Icon = SUMMARY_ICONS[icon] ?? Settings

  return (
    <div className={clsx('rounded-2xl border border-white/80 bg-white/90 px-5 py-4 backdrop-blur-md', CARD_SHADOW)}>
      <div className="flex items-center gap-2.5">
        <span
          className={clsx(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
            tone === 'danger'
              ? 'bg-red-500 text-white'
              : 'border border-slate-900/10 text-slate-500',
          )}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <span className="text-sm text-slate-500">{label}</span>
      </div>
      <p
        className={clsx(
          'mt-3 text-3xl leading-none font-bold tabular-nums',
          tone === 'warning' || tone === 'danger' ? 'text-amber-600' : 'text-slate-900',
        )}
      >
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-500">{caption}</p>
    </div>
  )
}

/** MB → SB movement belts per bay, feeding each bay's upper belt, plus shift-wide KPI cards. */
function BayFlowDiagram() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
      <section className={clsx('flex-1 rounded-2xl border border-white/80 bg-white/90 px-5 pt-6 backdrop-blur-md', CARD_SHADOW)}>
        <div className="flex flex-col">
          {movementBays.map((bay) => (
            <BayRow key={bay.id} bay={bay} />
          ))}
        </div>
      </section>

      <div className="grid shrink-0 grid-cols-2 gap-3 lg:w-64 lg:grid-cols-1">
        {movementSummary.map((card) => (
          <SummaryStatCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  )
}

export default BayFlowDiagram
