import BayFlowDiagram from '../features/packing-bay/components/BayFlowDiagram'
import EventLog from '../features/packing-bay/components/EventLog'
import RejectionLog from '../features/packing-bay/components/RejectionLog'

function PackingBay() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <BayFlowDiagram />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <EventLog />
        <RejectionLog />
      </div>
    </div>
  )
}

export default PackingBay
