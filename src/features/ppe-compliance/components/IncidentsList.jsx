import clsx from 'clsx'
import { INCIDENT_STATUS } from '../data/mockPpeCompliance'

function IncidentRow({ incident, isSelected, onSelect }) {
  const statusMeta = INCIDENT_STATUS[incident.status] ?? INCIDENT_STATUS.open

  return (
    <button
      type="button"
      onClick={() => onSelect(incident.id)}
      aria-pressed={isSelected}
      className={clsx(
        'flex w-full items-start justify-between gap-3 border-b border-l-4 border-slate-100 py-3 pr-4 text-left transition-colors',
        isSelected ? 'border-l-[#2098e8] bg-[#2098e8]/5 pl-3' : 'border-l-transparent pl-4 hover:bg-slate-50',
      )}
    >
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-900 tabular-nums">{incident.time}</p>
        <p className="mt-0.5 truncate text-xs font-medium text-slate-700">
          {incident.area} · {incident.section} · {incident.bay}
        </p>
        <p className="mt-0.5 text-[11px] text-slate-500">
          Violation: {incident.durationLabel} <span className="text-slate-300">|</span> Camera: {incident.camera}
        </p>
      </div>
      <span
        className={clsx(
          'shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase',
          statusMeta.badge,
        )}
      >
        {statusMeta.label}
      </span>
    </button>
  )
}

/** Left rail — selecting a row drives the IncidentDetailPanel on the right. */
function IncidentsList({ incidents, selectedId, onSelect }) {
  return (
    <section className="flex flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-md">
      <header className="bg-[#2098e8] px-4 py-3">
        <h2 className="text-sm font-bold text-white">Incidents — today</h2>
      </header>
      <div className="flex max-h-[38rem] flex-col overflow-y-auto">
        {incidents.map((incident) => (
          <IncidentRow
            key={incident.id}
            incident={incident}
            isSelected={incident.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  )
}

export default IncidentsList
