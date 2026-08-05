import { Clock, Package, Recycle, Settings } from 'lucide-react'
import clsx from 'clsx'
import { PACKING_STATUS, packingBays, packingSummary } from '../data/mockPackingBay'

const CARD_SHADOW =
  'shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)]'

const SUMMARY_ICONS = { bpm: Clock, sacks: Package, rejection: Recycle, belts: Settings }

/** Two packing belt readouts feeding one merge point, drawn with right-angle strokes. */
function Bracket({ color }) {
  return (
    <svg width="44" height="120" viewBox="0 0 44 120" className="shrink-0" aria-hidden>
      <path
        d="M0,28 L16,28 L16,60 M0,92 L16,92 L16,60 M16,60 L44,60"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
    </svg>
  )
}

/** Straight wire with an arrowhead at the destination end, showing flow direction.
 * `label` (the bay's Running/Stopped status) floats as a pill centered above the line. */
function Wire({ color, label, pillClass }) {
  return (
    <span className="relative flex w-24 shrink-0 items-center sm:w-28">
      {label && (
        <span
          className={clsx(
            'absolute -top-6 left-[40%] w-max -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[10px] font-semibold whitespace-nowrap',
            pillClass,
          )}
        >
          {label}
        </span>
      )}
      <span className="h-[2px] flex-1" style={{ backgroundColor: color }} aria-hidden />
      <span
        className="h-0 w-0 shrink-0 border-y-[4px] border-l-[6px] border-y-transparent"
        style={{ borderLeftColor: color }}
        aria-hidden
      />
    </span>
  )
}

function BeltNode({ id, bpm, status }) {
  const meta = PACKING_STATUS[status] ?? PACKING_STATUS.stopped

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={clsx(
          'flex h-14 w-24 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white shadow-sm',
          meta.node,
        )}
      >
        {id}
      </span>
      <div className="leading-tight">
        <p className="text-sm font-bold text-slate-900 tabular-nums">{bpm}</p>
        <p className="text-[10px] text-slate-400">bags/min</p>
      </div>
    </div>
  )
}

/** Faded placeholder node — the movement belt this section feeds into, not tracked here. */
function GhostNode({ id, status }) {
  const meta = PACKING_STATUS[status] ?? PACKING_STATUS.stopped

  return (
    <span className={clsx('flex h-14 w-24 shrink-0 items-center justify-center rounded-lg text-sm font-semibold', meta.ghost)}>
      {id}
    </span>
  )
}

function BayMetricsCard({ metrics }) {
  const rows = [
    { label: 'Sacks Counted', value: metrics.sacksCounted.toLocaleString() },
    { label: 'Utilization', value: `${metrics.utilization}%` },
    { label: 'Open Stops', value: metrics.openStops },
  ]

  return (
    <div className="w-full shrink-0 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50/60 px-4 sm:w-56">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between py-2.5">
          <span className="text-xs text-slate-500">{row.label}</span>
          <span className="text-sm font-bold text-slate-900 tabular-nums">{row.value}</span>
        </div>
      ))}
    </div>
  )
}

function BayRow({ bay }) {
  const meta = PACKING_STATUS[bay.status] ?? PACKING_STATUS.stopped

  return (
    <div className="flex items-center gap-2 border-b border-dashed border-slate-200 py-5 last:border-b-0">
      <div className="relative flex min-w-0 flex-1 items-center justify-start gap-1 overflow-x-auto">
        <div className="absolute left-[24%] top-1/2 flex w-5 -translate-y-1/2 items-center justify-center">
          <span className="origin-center -rotate-90 text-[11px] font-semibold whitespace-nowrap text-slate-400">
            {bay.label}
          </span>
        </div>

        <div className="ml-[30%] flex shrink-0 items-center">
          <div className="flex shrink-0 flex-col gap-2">
            {bay.belts.map((belt) => (
              <BeltNode key={belt.id} {...belt} />
            ))}
          </div>
          <Bracket color={meta.wire} />
          <Wire color={meta.wire} label={meta.label} pillClass={meta.pill} />
          <GhostNode id={bay.mainBelt} status={bay.status} />
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

/** Packing belts merging into each bay's movement belt, plus shift-wide KPI cards. */
function BayFlowDiagram() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
      <section className={clsx('flex-1 rounded-2xl border border-white/80 bg-white/90 px-5 pt-6 backdrop-blur-md', CARD_SHADOW)}>
        <div className="flex flex-col">
          {packingBays.map((bay) => (
            <BayRow key={bay.id} bay={bay} />
          ))}
        </div>
      </section>

      <div className="grid shrink-0 grid-cols-2 gap-3 lg:w-64 lg:grid-cols-1">
        {packingSummary.map((card) => (
          <SummaryStatCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  )
}

export default BayFlowDiagram
