import { useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import ChartTooltip from './ChartTooltip'
import { EVENT_STATUS } from '../data/mockAnalytics'

const SURFACE = '#fcfcfb'

function formatMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
}

/** Part-to-whole across all areas — one ratio, so a donut with a legend beats a stack. */
function StoppageBreakdownChart({ data }) {
  const slices = useMemo(() => {
    const stoppedCompletely = data.reduce((sum, d) => sum + d.stoppedCompletely, 0)
    const movingWithoutSacks = data.reduce((sum, d) => sum + d.movingWithoutSacks, 0)
    return [
      { key: 'stoppedCompletely', name: EVENT_STATUS.stoppedCompletely.label, value: stoppedCompletely, fill: EVENT_STATUS.stoppedCompletely.hex },
      { key: 'movingWithoutSacks', name: EVENT_STATUS.movingWithoutSacks.label, value: movingWithoutSacks, fill: EVENT_STATUS.movingWithoutSacks.hex },
    ]
  }, [data])

  const total = slices.reduce((sum, s) => sum + s.value, 0)

  return (
    <div className="flex h-full flex-wrap items-center justify-center gap-10 py-2">
      <div className="relative h-56 w-56 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<ChartTooltip unit=" min" />} />
            <Pie
              data={slices}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={64}
              outerRadius={92}
              paddingAngle={3}
              stroke={SURFACE}
              strokeWidth={2}
            >
              {slices.map((slice) => (
                <Cell key={slice.key} fill={slice.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-xl leading-none font-semibold text-slate-900 tabular-nums">{formatMinutes(total)}</p>
          <p className="mt-1 text-xs text-slate-500">total stopped</p>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {slices.map((slice) => (
          <li key={slice.key} className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: slice.fill }} aria-hidden />
            <span className="text-slate-600">{slice.name}</span>
            <span className="ml-1 font-semibold tabular-nums text-slate-900">
              {Math.round((slice.value / total) * 100)}%
            </span>
            <span className="text-slate-400 tabular-nums">· {formatMinutes(slice.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StoppageBreakdownChart
