/**
 * Placeholder operations data. Swap these exports for API calls
 * (see src/api) once the backend endpoints exist — shapes are the contract.
 *
 * `icon` is a lucide-react name resolved in StatTile; `tone` colors the caption.
 */

export const kpis = [
  {
    id: 'bags-per-minute',
    label: 'Bags Per Minute',
    value: '245',
    caption: 'Current Throughput',
    icon: 'bags',
    tone: 'good',
  },
  {
    id: 'utilization',
    label: 'Utilization',
    value: '87%',
    caption: 'System Healthy',
    icon: 'utilization',
    tone: 'good',
  },
  {
    id: 'open-stoppages',
    label: 'Open Stoppages',
    value: '3',
    caption: '2 Active',
    icon: 'stoppages',
    tone: 'neutral',
  },
  {
    id: 'adjusted-bags',
    label: 'Adjusted Bags/Min',
    value: '232',
    caption: 'After Rejections',
    icon: 'adjusted',
    tone: 'good',
  },
]

/** Headline band: shift progress + the three inline figures under it. */
export const shiftSummary = {
  headline: ['Conveyor', 'Intelligence'],
  blurb:
    'Live packing, movement and loading across every bagging line — one view of throughput, stoppages and shift progress.',
  completion: 78,
  figures: [
    { label: 'Shift target', value: '150,000', unit: 'bags' },
    { label: 'Bagged so far', value: '117,340', unit: 'bags' },
    { label: 'Degree of completion', value: '78.2', unit: '%' },
  ],
}
