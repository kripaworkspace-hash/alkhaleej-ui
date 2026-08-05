import clsx from 'clsx'

const RANGES = [
  { id: '7d', label: '7 days' },
  { id: '30d', label: '30 days' },
  { id: '90d', label: '90 days' },
]

/** Scopes every stat, chart and table below it — date range first, presets over a calendar. */
function RangeFilter({ value, onChange }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/90 p-1 shadow-[0_1px_2px_rgba(15,23,42,0.06)] backdrop-blur-md">
      {RANGES.map((range) => (
        <button
          key={range.id}
          type="button"
          onClick={() => onChange(range.id)}
          aria-pressed={value === range.id}
          className={clsx(
            'rounded-full px-3 py-1 text-xs font-medium transition-colors',
            value === range.id ? 'bg-[#2098e8] text-white' : 'text-slate-500 hover:bg-slate-100',
          )}
        >
          {range.label}
        </button>
      ))}
    </div>
  )
}

export default RangeFilter
