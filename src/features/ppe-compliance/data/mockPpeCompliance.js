/**
 * Placeholder data for the PPE Compliance page. Swap these exports for API
 * calls (see src/api) once the backend endpoints exist — shapes are the
 * contract for PpeSummaryMetrics/IncidentsList/IncidentDetailPanel.
 */

export const summaryMetrics = [
  { id: 'compliance', label: 'Compliance', value: '96.4%', icon: 'compliance' },
  { id: 'violations', label: 'Violations', value: '7', icon: 'violations' },
  { id: 'open', label: 'Open', value: '2', icon: 'open' },
  { id: 'repeat', label: 'Repeat', value: '1', icon: 'repeat' },
]

export const INCIDENT_STATUS = {
  open: {
    label: 'Open',
    badge: 'bg-amber-50 text-amber-600',
    activeButton: 'border-slate-900 bg-slate-900 text-white',
  },
  reviewed: {
    label: 'Reviewed',
    badge: 'bg-violet-50 text-violet-600',
    activeButton: 'border-violet-500 bg-violet-50 text-violet-700',
  },
  closed: {
    label: 'Closed',
    badge: 'bg-emerald-50 text-emerald-600',
    activeButton: 'border-emerald-400 bg-emerald-50 text-emerald-700',
  },
}

export const DETECTION_STYLE = {
  violation: 'border-red-500 bg-red-500/10 text-red-400',
  ok: 'border-white/60 bg-white/5 text-white',
}

export const incidents = [
  {
    id: 1,
    time: '12:41',
    area: 'Main Bagging Area',
    section: 'Packing',
    bay: 'Loading Bay 1',
    durationLabel: '38 sec',
    camera: 'P-CAM-01',
    status: 'open',
    violationType: 'Hairnet Missing',
    confidence: 94.6,
    detections: [
      { label: 'Hairnet Missing', variant: 'violation' },
      { label: 'Mask Detected', variant: 'ok' },
    ],
    lastSignal: '12:41:45',
  },
  {
    id: 2,
    time: '11:56',
    area: 'Seaside Bagging',
    section: 'Movement',
    bay: 'Loading Bay 2',
    durationLabel: '1m 12s',
    camera: 'P-CAM-02',
    status: 'open',
    violationType: 'Mask Missing',
    confidence: 91.2,
    detections: [
      { label: 'Hairnet Detected', variant: 'ok' },
      { label: 'Mask Missing', variant: 'violation' },
    ],
    lastSignal: '11:57:04',
  },
  {
    id: 3,
    time: '11:15',
    area: 'Raw Sugar Bagging',
    section: 'Loading',
    bay: 'Loading Bay 3',
    durationLabel: '44 sec',
    camera: 'P-CAM-05',
    status: 'reviewed',
    violationType: 'Hairnet Missing',
    confidence: 88.9,
    detections: [
      { label: 'Hairnet Missing', variant: 'violation' },
      { label: 'Mask Detected', variant: 'ok' },
    ],
    lastSignal: '11:15:44',
  },
  {
    id: 4,
    time: '10:22',
    area: 'Main Bagging Area',
    section: 'Movement',
    bay: 'Loading Bay 2',
    durationLabel: '21 sec',
    camera: 'P-CAM-03',
    status: 'reviewed',
    violationType: 'Hairnet & Mask Missing',
    confidence: 96.1,
    detections: [
      { label: 'Hairnet Missing', variant: 'violation' },
      { label: 'Mask Missing', variant: 'violation' },
    ],
    lastSignal: '10:22:21',
  },
  {
    id: 5,
    time: '09:40',
    area: 'Main Bagging Area',
    section: 'Packing',
    bay: 'Loading Bay 1',
    durationLabel: '57 sec',
    camera: 'P-CAM-01',
    status: 'closed',
    violationType: 'Mask Missing',
    confidence: 90.4,
    detections: [
      { label: 'Hairnet Detected', variant: 'ok' },
      { label: 'Mask Missing', variant: 'violation' },
    ],
    lastSignal: '09:41:02',
  },
  {
    id: 6,
    time: '09:05',
    area: 'Raw Sugar Bagging',
    section: 'Loading',
    bay: 'Loading Bay 3',
    durationLabel: '44 sec',
    camera: 'P-CAM-05',
    status: 'closed',
    violationType: 'Hairnet Missing',
    confidence: 87.5,
    detections: [
      { label: 'Hairnet Missing', variant: 'violation' },
      { label: 'Mask Detected', variant: 'ok' },
    ],
    lastSignal: '09:05:44',
  },
  {
    id: 7,
    time: '08:48',
    area: 'Seaside Bagging',
    section: 'Packing',
    bay: 'Loading Bay 2',
    durationLabel: '36 sec',
    camera: 'P-CAM-02',
    status: 'closed',
    violationType: 'Hairnet Missing',
    confidence: 92.3,
    detections: [
      { label: 'Hairnet Missing', variant: 'violation' },
      { label: 'Mask Detected', variant: 'ok' },
    ],
    lastSignal: '08:48:36',
  },
  {
    id: 8,
    time: '08:30',
    area: 'Seaside Bagging',
    section: 'Loading',
    bay: 'Loading Bay 2',
    durationLabel: '16 sec',
    camera: 'P-CAM-02',
    status: 'closed',
    violationType: 'Mask Missing',
    confidence: 85.7,
    detections: [
      { label: 'Hairnet Detected', variant: 'ok' },
      { label: 'Mask Missing', variant: 'violation' },
    ],
    lastSignal: '08:30:16',
  },
]
