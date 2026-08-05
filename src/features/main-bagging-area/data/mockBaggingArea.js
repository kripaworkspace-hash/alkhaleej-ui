/**
 * Placeholder data for the Main Bagging Area dashboard. Swap these exports
 * for API calls (see src/api) once the backend endpoints exist — shapes are
 * the contract for SummaryCard/AlertBanner/LoadingBayList/EventLog/PPECompliance.
 */

export const summaryCards = [
  { id: 'bags-per-minute', label: 'Bags / Min', value: '245', icon: 'bags' },
  { id: 'utilization', label: 'Utilization', value: '87%', icon: 'utilization' },
  { id: 'open-stoppages', label: 'Open Stoppages', value: '3', icon: 'stoppages' },
  { id: 'trucks-active', label: 'Trucks Active', value: '2', icon: 'trucks' },
]

/**
 * Cycled by AlertBanner's showcase loop (one severity, 5s apart) so all three
 * states are easy to demo. severity: 'normal' | 'warning' | 'danger'
 */
export const alertShowcase = [
  { id: 'alert-normal', severity: 'normal', message: 'All Bays running normally' },
  { id: 'alert-warning', severity: 'warning', message: 'Loading Bay 2 - Truck Dispatched' },
  { id: 'alert-danger', severity: 'danger', message: 'Loading Bay 3 - Packing Area Stopped' },
]

export const FLOW_STATUS = {
  running: '#10b981',
  warning: '#fab219',
  fault: '#ef4444',
  idle: '#94a3b8',
}

/**
 * Each bay's flow: packing feeds two belts that merge into one line through
 * movement, upper deck and lower deck, ending at dispatch.
 */
export const loadingBays = [
  {
    id: 'bay-1',
    label: 'Loading Bay 1',
    truckPresent: true,
    status: 'running',
    packing: [
      { id: 'PB1', status: 'running' },
      { id: 'PB2', status: 'running' },
    ],
    stages: [
      {
        name: 'Movement Bay',
        units: [
          { id: 'MB1', status: 'running' },
          { id: 'SB1', status: 'running' },
        ],
      },
      {
        name: 'Upper Deck',
        units: [
          { id: 'UB1', status: 'running' },
          { id: 'UB4', status: 'running' },
        ],
      },
      {
        name: 'Lower Deck',
        units: [
          { id: 'SB4', status: 'running' },
          { id: 'LB1', status: 'running' },
        ],
      },
    ],
    metrics: { bpm: 82, utilization: 91, stops: 1 },
  },
  {
    id: 'bay-2',
    label: 'Loading Bay 2',
    truckPresent: true,
    status: 'warning',
    packing: [
      { id: 'PB3', status: 'running' },
      { id: 'PB4', status: 'running' },
    ],
    stages: [
      {
        name: 'Movement Bay',
        units: [
          { id: 'MB2', status: 'warning' },
          { id: 'SB2', status: 'warning' },
        ],
      },
      {
        name: 'Upper Deck',
        units: [
          { id: 'UB2', status: 'running' },
          { id: 'UB5', status: 'running' },
        ],
      },
      {
        name: 'Lower Deck',
        units: [
          { id: 'SB5', status: 'running' },
          { id: 'LB2', status: 'running' },
        ],
      },
    ],
    metrics: { bpm: 78, utilization: 88, stops: 0 },
  },
  {
    id: 'bay-3',
    label: 'Loading Bay 3',
    truckPresent: false,
    status: 'fault',
    packing: [
      { id: 'PB5', status: 'fault' },
      { id: 'PB6', status: 'fault' },
    ],
    stages: [
      {
        name: 'Movement Bay',
        units: [
          { id: 'MB3', status: 'fault' },
          { id: 'SB3', status: 'fault' },
        ],
      },
      {
        name: 'Upper Deck',
        units: [
          { id: 'UB3', status: 'fault' },
          { id: 'UB6', status: 'fault' },
        ],
      },
      {
        name: 'Lower Deck',
        units: [
          { id: 'SB6', status: 'fault' },
          { id: 'LB3', status: 'fault' },
        ],
      },
    ],
    metrics: { bpm: 0, utilization: 0, stops: 2 },
  },
]

export const EVENT_STATUS = {
  running: { label: 'Running', className: 'bg-emerald-50 text-emerald-600' },
  idle: { label: 'Idle', className: 'bg-amber-50 text-amber-600' },
  stopped: { label: 'Stopped', className: 'bg-red-50 text-red-600' },
}

export const eventLog = [
  { id: 1, time: '10:42', belt: 'PB5', bay: 'Bay 3', status: 'stopped' },
  { id: 2, time: '10:42', belt: 'PB6', bay: 'Bay 3', status: 'stopped' },
  { id: 3, time: '10:41', belt: 'MB3', bay: 'Bay 3', status: 'stopped' },
  { id: 4, time: '10:41', belt: 'SB3', bay: 'Bay 3', status: 'stopped' },
  { id: 5, time: '10:37', belt: 'MB2', bay: 'Bay 2', status: 'idle' },
  { id: 6, time: '10:37', belt: 'SB2', bay: 'Bay 2', status: 'idle' },
  { id: 7, time: '10:35', belt: 'LB3', bay: 'Bay 3', status: 'stopped' },
  { id: 8, time: '10:35', belt: 'SB6', bay: 'Bay 3', status: 'stopped' },
  { id: 9, time: '10:34', belt: 'UB3', bay: 'Bay 3', status: 'stopped' },
  { id: 10, time: '10:34', belt: 'UB6', bay: 'Bay 3', status: 'stopped' },
  { id: 11, time: '10:31', belt: 'PB1', bay: 'Bay 1', status: 'running' },
  { id: 12, time: '10:31', belt: 'PB2', bay: 'Bay 1', status: 'running' },
  { id: 13, time: '10:29', belt: 'MB1', bay: 'Bay 1', status: 'running' },
  { id: 14, time: '10:27', belt: 'PB3', bay: 'Bay 2', status: 'idle' },
  { id: 15, time: '10:26', belt: 'PB4', bay: 'Bay 2', status: 'idle' },

]

export const PPE_VIOLATION_STYLE = {
  'No Mask': 'bg-red-50 text-red-600',
  'No Hairnet': 'bg-amber-50 text-amber-600',
}

export const ppeViolations = [
  { id: 1, time: '10:44', bay: 'Bay 1', violation: 'No Mask' },
  { id: 2, time: '10:39', bay: 'Bay 2', violation: 'No Hairnet' },
  { id: 3, time: '10:33', bay: 'Bay 3', violation: 'No Mask' },
  { id: 4, time: '10:28', bay: 'Bay 2', violation: 'No Hairnet' },
  { id: 5, time: '10:20', bay: 'Bay 1', violation: 'No Hairnet' },
  { id: 6, time: '10:44', bay: 'Bay 1', violation: 'No Mask' },
  { id: 7, time: '10:39', bay: 'Bay 2', violation: 'No Hairnet' },
  { id: 8, time: '10:33', bay: 'Bay 3', violation: 'No Mask' },
  { id: 9, time: '10:18', bay: 'Bay 1', violation: 'No Mask' },
  { id: 10, time: '10:14', bay: 'Bay 3', violation: 'No Hairnet' },
  { id: 11, time: '10:09', bay: 'Bay 2', violation: 'No Mask' },
  { id: 12, time: '10:05', bay: 'Bay 1', violation: 'No Hairnet' },
  { id: 13, time: '09:58', bay: 'Bay 3', violation: 'No Mask' },
  { id: 14, time: '09:52', bay: 'Bay 2', violation: 'No Hairnet' },
  { id: 15, time: '09:47', bay: 'Bay 1', violation: 'No Mask' },
]
