import { loadingBays } from '../../main-bagging-area/data/mockBaggingArea'

/**
 * Placeholder data for the Bay Detail view. Swap `getBayDetail` for an API
 * call (see src/api) once the backend endpoint exists — the shape is the
 * contract for BayMetrics/ConveyorControlBoard/LiveCameraMonitoring. Camera
 * zones mirror the flow's belt groupings (packing/movement/loading).
 */

export const BAY_STATUS = {
  running: { label: 'Running', badge: 'bg-emerald-50 text-emerald-600' },
  warning: { label: 'Warning', badge: 'bg-amber-50 text-amber-600' },
  fault: { label: 'Fault', badge: 'bg-red-50 text-red-600' },
  idle: { label: 'Idle', badge: 'bg-slate-100 text-slate-500' },
}

const bayDetails = {
  'bay-1': {
    id: 'bay-1',
    label: 'Loading Bay 1',
    status: 'running',
    truckPresent: true,
    metrics: { packedBags: 5842, packingRate: 84, loadingRate: 81, shiftThroughput: 42118 },
    cameraZones: [
      {
        id: 'packing-bay',
        label: 'Packing Bay Live',
        cameras: [{ id: 'bay-1-tc1', name: 'TC1', belts: 'PB1 & PB2', status: 'live' }],
      },
      {
        id: 'movement-bay',
        label: 'Movement Bay Live',
        cameras: [{ id: 'bay-1-tc4', name: 'TC4', belts: 'MB1 & SB1', status: 'live' }],
      },
      {
        id: 'loading-bay',
        label: 'Loading Bay Live',
        cameras: [
          { id: 'bay-1-tc7', name: 'TC7', belts: 'UB1 & UB4', status: 'live' },
          { id: 'bay-1-tc12', name: 'TC12', belts: 'SB4 & LB1', status: 'live' },
        ],
      },
    ],
  },
  'bay-2': {
    id: 'bay-2',
    label: 'Loading Bay 2',
    status: 'warning',
    truckPresent: true,
    metrics: { packedBags: 4210, packingRate: 78, loadingRate: 74, shiftThroughput: 35870 },
    cameraZones: [
      {
        id: 'packing-bay',
        label: 'Packing Bay Live',
        cameras: [{ id: 'bay-2-tc2', name: 'TC2', belts: 'PB3 & PB4', status: 'live' }],
      },
      {
        id: 'movement-bay',
        label: 'Movement Bay Live',
        cameras: [{ id: 'bay-2-tc5', name: 'TC5', belts: 'MB2 & SB2', status: 'live' }],
      },
      {
        id: 'loading-bay',
        label: 'Loading Bay Live',
        cameras: [
          { id: 'bay-2-tc8', name: 'TC8', belts: 'UB2 & UB5', status: 'live' },
          { id: 'bay-2-tc13', name: 'TC13', belts: 'SB5 & LB2', status: 'offline' },
        ],
      },
    ],
  },
  'bay-3': {
    id: 'bay-3',
    label: 'Loading Bay 3',
    status: 'fault',
    truckPresent: false,
    metrics: { packedBags: 3120, packingRate: 0, loadingRate: 0, shiftThroughput: 21540 },
    cameraZones: [
      {
        id: 'packing-bay',
        label: 'Packing Bay Live',
        cameras: [{ id: 'bay-3-tc3', name: 'TC3', belts: 'PB5 & PB6', status: 'offline' }],
      },
      {
        id: 'movement-bay',
        label: 'Movement Bay Live',
        cameras: [{ id: 'bay-3-tc6', name: 'TC6', belts: 'MB3 & SB3', status: 'offline' }],
      },
      {
        id: 'loading-bay',
        label: 'Loading Bay Live',
        cameras: [
          { id: 'bay-3-tc9', name: 'TC9', belts: 'UB3 & UB6', status: 'live' },
          { id: 'bay-3-tc14', name: 'TC14', belts: 'SB6 & LB3', status: 'offline' },
        ],
      },
    ],
  },
}

/** Flow (packing/stages/status) is the same data the Main Bagging Area bay list renders. */
export function getBayDetail(bayId) {
  const detail = bayDetails[bayId] ?? bayDetails['bay-1']
  const flow = loadingBays.find((bay) => bay.id === detail.id) ?? loadingBays[0]

  return { ...detail, flow }
}
