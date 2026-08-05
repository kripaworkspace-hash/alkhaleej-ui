import BayFlowDiagram from '../features/loading-section/components/BayFlowDiagram'
import BagsRecord from '../features/loading-section/components/BagsRecord'
import EventLog from '../features/loading-section/components/EventLog'

function LoadingSection() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <BayFlowDiagram />
      <BagsRecord />
      <EventLog />
    </div>
  )
}

export default LoadingSection
