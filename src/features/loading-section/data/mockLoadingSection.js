/**
 * Placeholder data for the Loading Section dashboard. Swap these exports for
 * API calls (see src/api) once the backend endpoints exist — shapes are the
 * contract for BayFlowDiagram/BagsRecord/EventLog.
 */

export const LOADING_STATUS = {
  loading: {
    label: 'Truck • Loading',
    pill: 'bg-emerald-50 text-emerald-600',
    node: 'bg-emerald-500',
    wire: '#10b981',
    rate: 'text-slate-900',
    truckColor: 'text-emerald-500',
  },
  noTruck: {
    label: 'No Truck Present',
    pill: 'text-slate-400',
    node: 'bg-red-500',
    wire: '#ef4444',
    rate: 'text-red-500',
    truckColor: 'text-red-500',
  },
}

export const loadingBays = [
  {
    id: 'bay-1',
    label: 'Loading Bay 1',
    status: 'loading',
    rate: 82,
    belts: [{ id: 'UB1' }, { id: 'UB4' }, { id: 'SB4' }, { id: 'LB1' }],
    metrics: { totalBags: 5210, truckPresent: true, externalRejected: 3 },
  },
  {
    id: 'bay-2',
    label: 'Loading Bay 2',
    status: 'loading',
    rate: 78,
    belts: [{ id: 'UB2' }, { id: 'UB5' }, { id: 'SB5' }, { id: 'LB2' }],
    metrics: { totalBags: 4870, truckPresent: true, externalRejected: 1 },
  },
  {
    id: 'bay-3',
    label: 'Loading Bay 3',
    status: 'noTruck',
    rate: 0,
    belts: [{ id: 'UB3' }, { id: 'UB6' }, { id: 'SB6' }, { id: 'LB3' }],
    metrics: { totalBags: 0, truckPresent: false, externalRejected: 0 },
  },
]

export const loadingSummary = [
  { id: 'total-bpm', icon: 'bpm', label: 'All Bays · Total BPM', value: '160', caption: 'Combined loading rate' },
  { id: 'bags-loaded', icon: 'bags', label: 'All Bays · Bags Loaded', value: '8,693', caption: 'Shift total' },
  { id: 'external-rejected', icon: 'rejected', label: 'External Rejected', value: '0', caption: 'Manually entered today', tone: 'warning' },
  { id: 'trucks-at-bay', icon: 'trucks', label: 'Trucks at Bay', value: '2/3', caption: 'Currently loading' },
]

export const EVENT_STATUS = {
  stoppedCompletely: { label: 'Stopped Completely', className: 'bg-red-50 text-red-600' },
  movingWithoutSacks: { label: 'Moving Without Sacks', className: 'bg-amber-50 text-amber-600' },
}

export const loadingEventLog = [
  { id: 1, bay: 'Loading Bay 3', belt: 'SB6', start: '08:12', end: null, duration: '1h 42m', status: 'stoppedCompletely' },
  { id: 2, bay: 'Loading Bay 3', belt: 'LB3', start: '08:12', end: null, duration: '1h 42m', status: 'stoppedCompletely' },
  { id: 3, bay: 'Loading Bay 2', belt: 'LB2', start: '07:30', end: '07:34', duration: '4m', status: 'movingWithoutSacks' },
]

export const bagsPerTruckRecord = [
  { id: 1, truckId: 'TRK-2291', bay: 'Loading Bay 1', window: 'Jul 23, 06:40 – 07:55', bagsLoaded: 1840, externalRejected: 0, ongoing: false },
  { id: 2, truckId: 'TRK-2292', bay: 'Loading Bay 2', window: 'Jul 23, 08:05 – 09:20', bagsLoaded: 1705, externalRejected: 0, ongoing: false },
  { id: 3, truckId: 'TRK-2293', bay: 'Loading Bay 1', window: 'Jul 23, 08:00 – ongoing', bagsLoaded: 5148, externalRejected: 0, ongoing: true },
]
