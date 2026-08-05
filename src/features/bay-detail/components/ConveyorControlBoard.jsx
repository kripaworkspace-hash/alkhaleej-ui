import clsx from 'clsx'
import BayFlowDiagram from '../../main-bagging-area/components/BayFlowDiagram'
import BayMetrics from './BayMetrics'
import TruckImage from '../../../components/ui/TruckImage'

const TRUCK_STATUS = {
  activeLoading: { text: 'Truck Present · Active Loading', className: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
  present: { text: 'Truck Present · Idle', className: 'border-amber-200 bg-amber-50 text-amber-700' },
  none: { text: 'No Truck · Idle', className: 'border-slate-200 bg-slate-50 text-slate-500' },
}

function truckStatusKey(truckPresent, status) {
  if (!truckPresent) return 'none'
  return status === 'running' ? 'activeLoading' : 'present'
}

function ConveyorControlBoard({ flow, metrics, truckPresent, status }) {
  const truckMeta = TRUCK_STATUS[truckStatusKey(truckPresent, status)]

  return (
    <section className="flex flex-1 flex-col rounded-2xl border border-white/80 bg-white/90 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-md">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-4">
        <h2 className="text-sm font-bold text-slate-900">{flow.label} Conveyor Control Board</h2>
        <span
          className={clsx(
            'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold',
            truckMeta.className,
          )}
        >
          <TruckImage className="h-6 w-6 object-contain" />
          {truckMeta.text}
        </span>
      </header>

      <div className="flex flex-1 items-center overflow-x-auto px-5 py-4">
        <BayFlowDiagram bay={flow} />
      </div>

      <div className="border-t border-slate-100 px-5 py-4">
        <BayMetrics metrics={metrics} />
      </div>
    </section>
  )
}

export default ConveyorControlBoard
