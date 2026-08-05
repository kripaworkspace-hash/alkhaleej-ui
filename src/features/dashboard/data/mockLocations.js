/**
 * Locations shown on the operations dashboard. Each location runs the same three
 * processes; `units` are the individual belts/divisions within a process and
 * drive the "Belt status across bay" strip. `kpis` are the four in-card figures.
 */

export const BELT_STATUS = {
  running: { label: 'Running', color: '#0ca30c' },
  warning: { label: 'Attention', color: '#fab219' },
  fault: { label: 'Fault', color: '#d03b3b' },
  idle: { label: 'Idle', color: '#94a3b8' },
}

export const locations = [
  {
    id: 'main-bagging-area',
    name: 'Main Bagging Area',
    subtitle: 'Packing · Movement · Loading',
    processes: [
      {
        id: 'packing',
        name: 'Packing',
        units: [
          { id: 'PK-1', status: 'running' },
          { id: 'PK-2', status: 'running' },
          { id: 'PK-3', status: 'running' },
          { id: 'PK-4', status: 'warning' },
        ],
      },
      {
        id: 'movement',
        name: 'Movement',
        units: [
          { id: 'MV-1', status: 'running' },
          { id: 'MV-2', status: 'running' },
          { id: 'MV-3', status: 'running' },
        ],
      },
      {
        id: 'loading',
        name: 'Loading',
        units: [
          { id: 'LD-1', status: 'running' },
          { id: 'LD-2', status: 'idle' },
          { id: 'LD-3', status: 'running' },
        ],
      },
    ],
    kpis: [
      { label: 'Bags/Min', value: '128' },
      { label: 'Utilization', value: '91%' },
      { label: 'Stoppages', value: '1' },
      { label: 'Rejections', value: '0.8%' },
    ],
  },
  {
    id: 'raw-sugar-packing',
    name: 'Raw Sugar Packing',
    subtitle: 'Packing · Movement · Loading',
    processes: [
      {
        id: 'packing',
        name: 'Packing',
        units: [
          { id: 'PK-1', status: 'running' },
          { id: 'PK-2', status: 'fault' },
          { id: 'PK-3', status: 'running' },
        ],
      },
      {
        id: 'movement',
        name: 'Movement',
        units: [
          { id: 'MV-1', status: 'running' },
          { id: 'MV-2', status: 'running' },
          { id: 'MV-3', status: 'warning' },
        ],
      },
      {
        id: 'loading',
        name: 'Loading',
        units: [
          { id: 'LD-1', status: 'idle' },
          { id: 'LD-2', status: 'running' },
        ],
      },
    ],
    kpis: [
      { label: 'Bags/Min', value: '74' },
      { label: 'Utilization', value: '68%' },
      { label: 'Stoppages', value: '2' },
      { label: 'Rejections', value: '1.6%' },
    ],
  },
  {
    id: 'seaside-bagging',
    name: 'Seaside Bagging',
    subtitle: 'Packing · Movement · Loading',
    processes: [
      {
        id: 'packing',
        name: 'Packing',
        units: [
          { id: 'PK-1', status: 'running' },
          { id: 'PK-2', status: 'running' },
        ],
      },
      {
        id: 'movement',
        name: 'Movement',
        units: [
          { id: 'MV-1', status: 'running' },
          { id: 'MV-2', status: 'running' },
          { id: 'MV-3', status: 'running' },
        ],
      },
      {
        id: 'loading',
        name: 'Loading',
        units: [
          { id: 'LD-1', status: 'warning' },
          { id: 'LD-2', status: 'running' },
          { id: 'LD-3', status: 'running' },
        ],
      },
    ],
    kpis: [
      { label: 'Bags/Min', value: '43' },
      { label: 'Utilization', value: '80%' },
      { label: 'Stoppages', value: '0' },
      { label: 'Rejections', value: '1.1%' },
    ],
  },
]
