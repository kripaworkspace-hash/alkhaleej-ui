import { Link } from 'react-router-dom'
import clsx from 'clsx'
import BayFlowDiagram from './BayFlowDiagram'

function BayMetrics({ metrics }) {
  return (
    <div className="flex shrink-0 flex-col items-center justify-center divide-y divide-slate-200/70 rounded-xl border border-slate-200 bg-slate-50/70 px-6 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="w-full py-2.5 first:pt-3 last:pb-3">
        <p className="text-[10px] text-slate-400">BPM</p>
        <p className="text-sm font-bold text-slate-900 tabular-nums">{metrics.bpm}</p>
      </div>
      <div className="w-full py-2.5 first:pt-3 last:pb-3">
        <p className="text-[10px] text-slate-400">Utilization</p>
        <p className="text-sm font-bold text-slate-900 tabular-nums">{metrics.utilization}%</p>
      </div>
      <div className="w-full py-2.5 first:pt-3 last:pb-3">
        <p className="text-[10px] text-slate-400">Stops</p>
        <p className="text-sm font-bold text-slate-900 tabular-nums">{metrics.stops}</p>
      </div>
    </div>
  )
}

function BayRow({ bay }) {
  return (
    <div className="py-4">
      <div className="mb-3 flex items-center gap-2">
        <Link
          to={`/bays/${bay.id}`}
          className="w-32 shrink-0 truncate text-sm font-bold whitespace-nowrap text-slate-900 hover:text-[#2098e8] sm:w-36"
        >
          {bay.label}
        </Link>
        <span
          className={clsx(
            'rounded-full px-2 py-0.5 text-[10px] font-semibold',
            bay.truckPresent ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600',
          )}
        >
          TRUCK: {bay.truckPresent ? 'YES' : 'NO'}
        </span>
      </div>

      <div className="flex items-stretch gap-3">
        <div className="flex min-w-0 flex-1 justify-center-safe overflow-x-auto pb-2">
          <BayFlowDiagram bay={bay} linkToDetail />
        </div>
        <BayMetrics metrics={bay.metrics} />
      </div>
    </div>
  )
}

function LoadingBayList({ bays }) {
  return (
    <section className="flex flex-col rounded-2xl border border-white/80 bg-white/90 px-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-md">
      <div className="divide-y divide-slate-100">
        {bays.map((bay) => (
          <BayRow key={bay.id} bay={bay} />
        ))}
      </div>
    </section>
  )
}

export default LoadingBayList
