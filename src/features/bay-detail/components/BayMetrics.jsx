import { BarChart3, Gauge, Package, Timer } from 'lucide-react'

const METRIC_CONFIG = [
  { key: 'packedBags', label: 'Packed Bags', icon: Package, format: (v) => v.toLocaleString() },
  { key: 'packingRate', label: 'Packing Rate', icon: Timer, format: (v) => `${v} BPM` },
  { key: 'loadingRate', label: 'Loading Rate', icon: Gauge, format: (v) => `${v} BPM` },
  { key: 'shiftThroughput', label: 'Shift Throughput', icon: BarChart3, format: (v) => v.toLocaleString() },
]

function BayMetrics({ metrics }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-bold text-slate-900">Bay Metrics</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {METRIC_CONFIG.map(({ key, label, icon: Icon, format }) => (
          <div
            key={key}
            className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white/95 px-4 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-md"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-900/10 text-slate-500">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs text-slate-500">{label}</p>
              <p className="text-lg leading-tight font-bold text-slate-900 tabular-nums">{format(metrics[key])}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BayMetrics
