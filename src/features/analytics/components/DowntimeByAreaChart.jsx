import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartTooltip from './ChartTooltip'

const BLUE = '#2a78d6'

/** Magnitude comparison across areas — one hue, sorted high to low. */
function DowntimeByAreaChart({ data }) {
  const sorted = [...data].sort((a, b) => b.hours - a.hours)

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={sorted} layout="vertical" margin={{ top: 4, right: 28, left: 8, bottom: 0 }} barSize={20}>
        <CartesianGrid horizontal={false} stroke="#e1e0d9" />
        <XAxis type="number" tick={{ fill: '#898781', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis
          type="category"
          dataKey="area"
          tick={{ fill: '#52514e', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={128}
        />
        <Tooltip content={<ChartTooltip unit="h" />} cursor={{ fill: '#e1e0d9', fillOpacity: 0.4 }} />
        <Bar dataKey="hours" name="Downtime" fill={BLUE} radius={[0, 4, 4, 0]}>
          <LabelList
            dataKey="hours"
            position="right"
            formatter={(value) => `${value}h`}
            style={{ fill: '#0b0b0b', fontSize: 11, fontWeight: 600 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default DowntimeByAreaChart
