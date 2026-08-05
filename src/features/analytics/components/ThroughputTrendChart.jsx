import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartTooltip from './ChartTooltip'

const BLUE = '#2a78d6'
const SURFACE = '#fcfcfb'

/** Single series (no legend needed): actual bags/min vs the shift target baseline. */
function ThroughputTrendChart({ data, target }) {
  const lastIndex = data.length - 1
  const tickInterval = Math.max(0, Math.ceil(data.length / 7) - 1)

  const renderDot = (props) => {
    const { cx, cy, index, payload } = props
    const isLast = index === lastIndex

    return (
      <g key={`dot-${index}`}>
        <circle cx={cx} cy={cy} r={4} fill={BLUE} stroke={SURFACE} strokeWidth={2} />
        {isLast && (
          <text x={cx} y={cy - 12} textAnchor="middle" className="fill-slate-900 text-[11px] font-semibold">
            {payload.actual}
          </text>
        )}
      </g>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 16, right: 12, left: -12, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#e1e0d9" />
        <XAxis
          dataKey="date"
          tick={{ fill: '#898781', fontSize: 11 }}
          axisLine={{ stroke: '#c3c2b7' }}
          tickLine={false}
          interval={tickInterval}
        />
        <YAxis
          tick={{ fill: '#898781', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={40}
          domain={['dataMin - 15', 'dataMax + 15']}
        />
        <ReferenceLine
          y={target}
          stroke="#c3c2b7"
          strokeDasharray="4 4"
          label={{ value: `Target ${target}`, position: 'insideBottomLeft', fill: '#52514e', fontSize: 11 }}
        />
        <Tooltip content={<ChartTooltip unit=" bpm" />} cursor={{ stroke: '#c3c2b7', strokeWidth: 1 }} />
        <Area
          type="monotone"
          dataKey="actual"
          name="Actual"
          stroke={BLUE}
          strokeWidth={2}
          fill={BLUE}
          fillOpacity={0.1}
          dot={renderDot}
          activeDot={{ r: 5, fill: BLUE, stroke: SURFACE, strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default ThroughputTrendChart
