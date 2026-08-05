import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { FLOW_STATUS } from '../data/mockBaggingArea'
import TruckImage from '../../../components/ui/TruckImage'

/** Worst state present, so a connector shows the state it's actually carrying. */
const SEVERITY_ORDER = ['fault', 'warning', 'idle', 'running']

/** Height of the tallest node stack (packing's 2 stacked belts) — every column's
 * node area is pinned to this so labels stay on one row and connectors line up.
 * Fixed size, matching the belt-node boxes used across Movement/Packing/Loading
 * sections — keep in sync with FlowNode/MergeConnector/DispatchTruck. */
const NODE_AREA = 'h-[120px]'

function worstStatus(units) {
  return SEVERITY_ORDER.find((s) => units.some((u) => u.status === s)) ?? 'running'
}

/** Straight wire with an arrowhead at the destination end only, showing flow direction. */
function Wire({ status, className }) {
  const color = FLOW_STATUS[status] ?? FLOW_STATUS.idle

  return (
    <span className={clsx('flex shrink-0 items-center', className)} aria-hidden>
      <span className="h-[2px] flex-1" style={{ backgroundColor: color }} />
      <span
        className="h-0 w-0 shrink-0 border-y-[4px] border-l-[6px] border-y-transparent"
        style={{ borderLeftColor: color }}
      />
    </span>
  )
}

/** Wire between two sections (Packing/Movement/Upper/Lower/Dispatch) — carries the same
 * invisible header line the columns have, so it lands at node height, and a dashed
 * divider centered on the line marks the section boundary. */
function StageWire({ status, className }) {
  const color = FLOW_STATUS[status] ?? FLOW_STATUS.idle

  return (
    <div className="flex shrink-0 flex-col items-center gap-2" aria-hidden>
      <span className="invisible text-[10px] whitespace-nowrap">&nbsp;</span>
      <div className={clsx('flex items-center', NODE_AREA, className)}>
        <span className="h-[2px] flex-1" style={{ backgroundColor: color }} />
        <span className="mx-[3px] h-24 w-px shrink-0 border-l border-dashed border-slate-300" />
        <span className="h-[2px] flex-1" style={{ backgroundColor: color }} />
        <span
          className="h-0 w-0 shrink-0 border-y-[4px] border-l-[6px] border-y-transparent"
          style={{ borderLeftColor: color }}
        />
      </div>
    </div>
  )
}

/** Joins PB1's and PB2's lines into the single line that feeds the next stage, drawn as a
 * right-angle bracket colored to match the arrow it feeds into. Geometry matches the
 * fixed 120px NODE_AREA / h-14 FlowNode sizing exactly. */
function MergeConnector({ color }) {
  return (
    <svg width="44" height="120" viewBox="0 0 44 120" className="shrink-0" aria-hidden>
      <path
        d="M0,28 L16,28 L16,60 M0,92 L16,92 L16,60 M16,60 L44,60"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
    </svg>
  )
}

/** Each belt box links to its bay's detail page when `bayId` is provided (list view);
 * plain, non-interactive when omitted (Bay Detail's own control board, to avoid a self-link). */
function FlowNode({ id, status, bayId }) {
  const className = clsx(
    'flex h-14 w-24 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white shadow-sm',
    bayId && 'transition hover:brightness-110',
  )
  const style = { backgroundColor: FLOW_STATUS[status] ?? FLOW_STATUS.idle }

  if (bayId) {
    return (
      <Link to={`/bays/${bayId}`} className={className} style={style}>
        {id}
      </Link>
    )
  }

  return (
    <span className={className} style={style}>
      {id}
    </span>
  )
}

/** Two packing belts merging into the single line that runs through the rest of the bay. */
function PackingStack({ units, bayId }) {
  return (
    <div className="relative flex shrink-0 flex-col items-start gap-2">
      <span className="invisible text-[10px] whitespace-nowrap">&nbsp;</span>
      <div className="absolute top-0 left-0 flex items-baseline gap-1.5 whitespace-nowrap">
        <span className="text-[10px] font-semibold tracking-wide text-black uppercase">Packing Bay</span>
        <span className="text-[10px] text-slate-400">{units.map((u) => u.id).join(' · ')}</span>
      </div>
      <div className={clsx('flex items-stretch', NODE_AREA)}>
        <div className="flex flex-col gap-2">
          {units.map((unit) => (
            <FlowNode key={unit.id} {...unit} bayId={bayId} />
          ))}
        </div>
        <MergeConnector color={FLOW_STATUS[worstStatus(units)] ?? FLOW_STATUS.idle} />
      </div>
    </div>
  )
}

function StageGroup({ name, units, bayId }) {
  return (
    <div className="relative flex shrink-0 flex-col items-center gap-2">
      <span className="invisible text-[10px] whitespace-nowrap">&nbsp;</span>
      <div className="absolute top-0 left-1/2 flex -translate-x-1/2 items-baseline gap-1.5 whitespace-nowrap">
        <span className="text-[10px] font-semibold tracking-wide text-black uppercase">{name}</span>
        <span className="text-[10px] text-slate-400">{units.map((u) => u.id).join(' · ')}</span>
      </div>
      <div className={clsx('flex items-center', NODE_AREA)}>
        {units.map((unit, i) => (
          <div key={unit.id} className="flex items-center">
            <FlowNode {...unit} bayId={bayId} />
            {i < units.length - 1 && <Wire status={unit.status} className="w-5 lg:w-6" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function DispatchTruck({ truckPresent }) {
  return (
    <div className="relative flex shrink-0 flex-col items-center gap-2">
      <span className="invisible text-[10px] whitespace-nowrap">&nbsp;</span>
      <div className="absolute top-0 left-1/2 flex -translate-x-1/2 items-baseline gap-1.5 whitespace-nowrap">
        <span className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase">Dispatch</span>
        <span className="text-[10px] text-slate-400">Truck</span>
      </div>
      <div className={clsx('flex items-center justify-center', NODE_AREA)}>
        <span className="flex h-20 w-20 items-center justify-center rounded-md">
          <TruckImage
            className="h-full w-full object-contain"
            tint={truckPresent ? FLOW_STATUS.running : FLOW_STATUS.idle}
          />
        </span>
      </div>
    </div>
  )
}

/** Packing → movement/upper/lower stages → dispatch, colored by belt status. Shared by
 * the Main Bagging Area bay list and the Bay Detail control board so both stay in sync.
 * Pass `linkToDetail` on the list view so each belt box links to `/bays/:bayId`; leave it
 * off on the Bay Detail control board, where the boxes already are that bay's page. */
function BayFlowDiagram({ bay, linkToDetail = false }) {
  const lastStage = bay.stages[bay.stages.length - 1]
  const bayId = linkToDetail ? bay.id : undefined

  return (
    <div className="flex shrink-0 items-center">
      <PackingStack units={bay.packing} bayId={bayId} />
      <StageWire status={worstStatus(bay.packing)} className="w-8 sm:w-9 lg:w-9" />
      {bay.stages.map((stage, i) => (
        <div key={stage.name} className="flex items-center">
          <StageGroup name={stage.name} units={stage.units} bayId={bayId} />
          {i < bay.stages.length - 1 && (
            <StageWire status={worstStatus(stage.units)} className="w-8 sm:w-9 lg:w-9" />
          )}
        </div>
      ))}
      <StageWire status={worstStatus(lastStage.units)} className="w-8 sm:w-9 lg:w-9" />
      <DispatchTruck truckPresent={bay.truckPresent} />
    </div>
  )
}

export default BayFlowDiagram
