import BayFlowDiagram from '../features/movement-section/components/BayFlowDiagram'
import EventLog from '../features/movement-section/components/EventLog'

function MovementSection() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <BayFlowDiagram />
      <EventLog />
    </div>
  )
}

export default MovementSection
