import { useState } from 'react'
import SectionTabs from '../features/main-bagging-area/components/SectionTabs'
import PpeSummaryMetrics from '../features/ppe-compliance/components/PpeSummaryMetrics'
import IncidentsList from '../features/ppe-compliance/components/IncidentsList'
import IncidentDetailPanel from '../features/ppe-compliance/components/IncidentDetailPanel'
import { incidents as initialIncidents, summaryMetrics } from '../features/ppe-compliance/data/mockPpeCompliance'

function PpeCompliance() {
  const [incidents, setIncidents] = useState(initialIncidents)
  const [selectedId, setSelectedId] = useState(initialIncidents[0]?.id ?? null)
  const selectedIncident = incidents.find((incident) => incident.id === selectedId) ?? null

  const handleStatusChange = (status) => {
    setIncidents((prev) =>
      prev.map((incident) => (incident.id === selectedId ? { ...incident, status } : incident)),
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Hairnet & Mask (PPE) Compliance</h1>
          <p className="mt-1 text-sm text-slate-600">
            Parallel module · hygiene-controlled areas (Packing Area only)
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SectionTabs />
        </div>
      </div>

      <PpeSummaryMetrics metrics={summaryMetrics} />

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
        <IncidentsList incidents={incidents} selectedId={selectedId} onSelect={setSelectedId} />
        <IncidentDetailPanel
          incident={selectedIncident}
          onStatusChange={handleStatusChange}
          onClose={() => setSelectedId(null)}
        />
      </div>
    </div>
  )
}

export default PpeCompliance
