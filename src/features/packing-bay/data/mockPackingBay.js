/**
 * Placeholder data for the Packing Bay dashboard. Swap these exports for API
 * calls (see src/api) once the backend endpoints exist — shapes are the
 * contract for BayFlowDiagram/EventLog/RejectionLog.
 */

export const PACKING_STATUS = {
  running: { label: 'Running', pill: 'bg-emerald-50 text-emerald-600', node: 'bg-emerald-500', ghost: 'bg-emerald-100 text-emerald-400', wire: '#10b981' },
  stopped: { label: 'Stopped', pill: 'bg-red-50 text-red-600', node: 'bg-red-500', ghost: 'bg-red-100 text-red-300', wire: '#d03b3b' },
}

export const packingBays = [
  {
    id: 'bay-1',
    label: 'Loading Bay 1',
    status: 'running',
    belts: [
      { id: 'PB1', bpm: 42, status: 'running' },
      { id: 'PB2', bpm: 40, status: 'running' },
    ],
    mainBelt: 'MB1',
    metrics: { sacksCounted: 5210, utilization: 91, openStops: 0 },
  },
  {
    id: 'bay-2',
    label: 'Loading Bay 2',
    status: 'running',
    belts: [
      { id: 'PB3', bpm: 39, status: 'running' },
      { id: 'PB4', bpm: 38, status: 'running' },
    ],
    mainBelt: 'MB2',
    metrics: { sacksCounted: 4870, utilization: 88, openStops: 0 },
  },
  {
    id: 'bay-3',
    label: 'Loading Bay 3',
    status: 'stopped',
    belts: [
      { id: 'PB5', bpm: 0, status: 'stopped' },
      { id: 'PB6', bpm: 0, status: 'stopped' },
    ],
    mainBelt: 'MB3',
    metrics: { sacksCounted: 0, utilization: 0, openStops: 2 },
  },
]

export const packingSummary = [
  { id: 'total-bpm', icon: 'bpm', label: 'All Bays · Total BPM', value: '159', caption: 'Combined packing rate' },
  { id: 'total-sacks', icon: 'sacks', label: 'All Bays · Total Sacks', value: '10,080', caption: 'Shift total' },
  { id: 'internal-rejection', icon: 'rejection', label: 'Internal Rejection', value: '106', caption: 'Packing – Loading', tone: 'warning' },
  { id: 'active-belts', icon: 'belts', label: 'Active Belts', value: '4/6', caption: 'PB belts running' },
]

export const EVENT_STATUS = {
  stoppedCompletely: { label: 'Stopped Completely', className: 'bg-red-50 text-red-600' },
  movingWithoutSacks: { label: 'Moving Without Sacks', className: 'bg-amber-50 text-amber-600' },
}

export const packingEventLog = [
  { id: 1, bay: 'Loading Bay 3', belt: 'PB5', start: '08:12', end: null, duration: '1h 42m', status: 'stoppedCompletely' },
  { id: 2, bay: 'Loading Bay 3', belt: 'PB6', start: '08:12', end: null, duration: '1h 42m', status: 'stoppedCompletely' },
  { id: 3, bay: 'Loading Bay 2', belt: 'PB4', start: '09:40', end: '09:47', duration: '7m', status: 'movingWithoutSacks' },
  { id: 4, bay: 'Loading Bay 1', belt: 'PB1', start: '07:55', end: '08:01', duration: '6m', status: 'movingWithoutSacks' },
]

export const packingRejectionLog = [
  { id: 1, bay: 'Loading Bay 1', packingSacks: 5210, loadingSacks: 5148, internalRejection: 62 },
  { id: 2, bay: 'Loading Bay 2', packingSacks: 4870, loadingSacks: 4826, internalRejection: 44 },
  { id: 3, bay: 'Loading Bay 3', packingSacks: 0, loadingSacks: 0, internalRejection: null },
]
