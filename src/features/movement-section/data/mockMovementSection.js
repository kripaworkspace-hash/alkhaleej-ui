/**
 * Placeholder data for the Movement Section dashboard. Swap these exports for
 * API calls (see src/api) once the backend endpoints exist — shapes are the
 * contract for BayFlowDiagram/EventLog.
 */

export const MOVEMENT_STATUS = {
  running: {
    label: 'Running',
    pill: 'bg-emerald-50 text-emerald-600',
    node: 'bg-emerald-500',
    ghost: 'bg-emerald-100 text-emerald-400',
    line: '#10b981',
    activity: 'text-emerald-600',
  },
  warning: {
    label: 'Moving, No Sacks',
    pill: 'bg-amber-50 text-amber-600',
    node: 'bg-amber-500',
    ghost: 'bg-emerald-100 text-emerald-400',
    line: '#f59e0b',
    activity: 'text-amber-600',
  },
  stopped: {
    label: 'Stopped',
    pill: 'bg-red-50 text-red-600',
    node: 'bg-red-500',
    ghost: 'bg-red-100 text-red-300',
    line: '#ef4444',
    activity: 'text-red-600',
  },
}

export const movementBays = [
  {
    id: 'bay-1',
    label: 'Loading Bay 1',
    status: 'running',
    belts: [
      { id: 'MB1', status: 'running' },
      { id: 'SB1', status: 'running' },
    ],
    upperBelt: 'UB1',
    metrics: { beltActivity: 'Active', utilization: 91, openStops: 0 },
  },
  {
    id: 'bay-2',
    label: 'Loading Bay 2',
    status: 'warning',
    belts: [
      { id: 'MB2', status: 'warning' },
      { id: 'SB2', status: 'warning' },
    ],
    upperBelt: 'UB2',
    metrics: { beltActivity: 'Empty Run', utilization: 72, openStops: 0 },
  },
  {
    id: 'bay-3',
    label: 'Loading Bay 3',
    status: 'stopped',
    belts: [
      { id: 'MB3', status: 'stopped' },
      { id: 'SB3', status: 'stopped' },
    ],
    upperBelt: 'UB3',
    metrics: { beltActivity: 'Stopped', utilization: 0, openStops: 2 },
  },
]

export const movementSummary = [
  { id: 'active-belts', icon: 'belts', label: 'Active Belts', value: '4/6', caption: 'MB / SB belts running' },
  { id: 'open-stoppages', icon: 'stoppages', label: 'Open Stoppages', value: '2', caption: 'Currently ongoing', tone: 'danger' },
  { id: 'moving-no-sacks', icon: 'warning', label: 'Moving Without Sacks', value: '2', caption: 'MB2 • SB2 empty run', tone: 'warning' },
  { id: 'stopped-bays', icon: 'stopped', label: 'Stopped Bays', value: '1', caption: 'Loading Bay 3', tone: 'danger' },
]

export const EVENT_STATUS = {
  stoppedCompletely: { label: 'Stopped Completely', className: 'bg-red-50 text-red-600' },
  movingWithoutSacks: { label: 'Moving Without Sacks', className: 'bg-amber-50 text-amber-600' },
}

export const movementEventLog = [
  { id: 1, bay: 'Loading Bay 3', belt: 'MB3', start: '08:12', end: null, duration: '1h 42m', status: 'stoppedCompletely' },
  { id: 2, bay: 'Loading Bay 3', belt: 'SB3', start: '08:12', end: null, duration: '1h 42m', status: 'stoppedCompletely' },
  { id: 3, bay: 'Loading Bay 2', belt: 'MB2', start: '10:15', end: null, duration: '39m', status: 'movingWithoutSacks' },
  { id: 4, bay: 'Loading Bay 2', belt: 'SB2', start: '10:15', end: null, duration: '39m', status: 'movingWithoutSacks' },
]
