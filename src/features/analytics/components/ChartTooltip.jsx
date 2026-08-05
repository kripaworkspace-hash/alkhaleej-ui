/**
 * Shared recharts tooltip content: value leads (bold), series name follows
 * (secondary), each row keyed with a short line stroke rather than a filled
 * box. Works for line/area/bar charts alike.
 */
function ChartTooltip({ active, label, payload, unit = '' }) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-slate-900/10 bg-white/95 px-3 py-2 text-xs shadow-[0_4px_12px_rgba(15,23,42,0.18)] backdrop-blur-xl">
      {label ? <p className="mb-1.5 font-medium text-slate-500">{label}</p> : null}
      <div className="flex flex-col gap-1">
        {payload.map((entry) => (
          <div key={entry.dataKey ?? entry.name} className="flex items-center gap-2">
            <span className="h-[2px] w-3 shrink-0 rounded-full" style={{ backgroundColor: entry.color }} aria-hidden />
            <span className="text-slate-500">{entry.name}</span>
            <span className="ml-auto pl-3 font-semibold tabular-nums text-slate-900">
              {entry.value}
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChartTooltip
