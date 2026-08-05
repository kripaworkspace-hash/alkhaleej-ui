/**
 * Placeholder analytics data. Swap these exports for API calls
 * (see src/api) once the backend endpoints exist — shapes are the contract.
 *
 * `icon` is a lucide-react name resolved in AnalyticsStatCard; `tone` colors the caption.
 */

export const kpis = [
  {
    id: 'avg-throughput',
    label: 'Avg Throughput',
    value: '238',
    caption: 'Bags / min · 7-day avg',
    icon: 'throughput',
    tone: 'good',
  },
  {
    id: 'utilization',
    label: 'Fleet Utilization',
    value: '86%',
    caption: '+2.1 pts vs last week',
    icon: 'utilization',
    tone: 'good',
  },
  {
    id: 'downtime',
    label: 'Total Downtime',
    value: '14.6h',
    caption: 'Across 4 areas this week',
    icon: 'downtime',
    tone: 'warning',
  },
  {
    id: 'rejection-rate',
    label: 'Rejection Rate',
    value: '1.3%',
    caption: '−0.2 pts vs last week',
    icon: 'rejection',
    tone: 'good',
  },
  {
    id: 'ppe-compliance',
    label: 'PPE Compliance',
    value: '93.4%',
    caption: 'Below 95% target',
    icon: 'ppe',
    tone: 'critical',
  },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Deterministic day labels counting back from Jul 24 so every range preset stays stable. */
function dateLabel(daysAgo) {
  const anchor = new Date(2026, 6, 24)
  anchor.setDate(anchor.getDate() - daysAgo)
  return `${MONTHS[anchor.getMonth()]} ${anchor.getDate()}`
}

/** Bags/min, actual vs shift target, trailing 90 days (newest last). Slice per the range filter. */
export const throughputTrend = Array.from({ length: 90 }, (_, i) => {
  const daysAgo = 89 - i
  const wave = Math.sin(daysAgo / 5) * 9 + Math.sin(daysAgo / 17) * 5
  return { date: dateLabel(daysAgo), actual: Math.round(233 + wave), target: 240 }
})

/** Stoppage minutes summed by area, trailing 7 days. Sorted desc in the chart. */
export const downtimeByArea = [
  { area: 'Packing Bay', hours: 5.8 },
  { area: 'Loading Section', hours: 3.9 },
  { area: 'Movement Section', hours: 2.7 },
  { area: 'Main Bagging Area', hours: 2.2 },
]

/** Stoppage minutes by area, split by event type — part-to-whole. */
export const stoppageBreakdown = [
  { area: 'Packing Bay', stoppedCompletely: 210, movingWithoutSacks: 38 },
  { area: 'Loading Section', stoppedCompletely: 96, movingWithoutSacks: 138 },
  { area: 'Movement Section', stoppedCompletely: 140, movingWithoutSacks: 22 },
  { area: 'Main Bagging Area', stoppedCompletely: 88, movingWithoutSacks: 44 },
]

export const EVENT_STATUS = {
  stoppedCompletely: { label: 'Stopped Completely', className: 'bg-red-50 text-red-600', hex: '#d03b3b' },
  movingWithoutSacks: { label: 'Moving Without Sacks', className: 'bg-amber-50 text-amber-600', hex: '#fab219' },
}

export const recentEvents = [
  { id: 1, area: 'Packing Bay', unit: 'PB5', start: '08:12', end: null, duration: '1h 42m', status: 'stoppedCompletely' },
  { id: 2, area: 'Packing Bay', unit: 'PB6', start: '08:12', end: null, duration: '1h 42m', status: 'stoppedCompletely' },
  { id: 3, area: 'Loading Section', unit: 'LB4', start: '09:40', end: '09:47', duration: '7m', status: 'movingWithoutSacks' },
  { id: 4, area: 'Main Bagging Area', unit: 'MB1', start: '07:55', end: '08:01', duration: '6m', status: 'movingWithoutSacks' },
  { id: 5, area: 'Movement Section', unit: 'MV2', start: '06:30', end: '08:50', duration: '2h 20m', status: 'stoppedCompletely' },
]
