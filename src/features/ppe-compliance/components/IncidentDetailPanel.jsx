import { Camera, X } from 'lucide-react'
import clsx from 'clsx'
import { DETECTION_STYLE, INCIDENT_STATUS } from '../data/mockPpeCompliance'

const STATUS_KEYS = ['open', 'reviewed', 'closed']

function DetectionTag({ detection }) {
  return (
    <span
      className={clsx(
        'rounded-md border px-3 py-1 text-[11px] font-bold tracking-wide uppercase',
        DETECTION_STYLE[detection.variant],
      )}
    >
      {detection.label}
    </span>
  )
}

function InfoRow({ label, value, valueClassName }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-dashed border-slate-200 py-2.5 last:border-b-0">
      <span className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">{label}</span>
      <span className={clsx('text-sm font-bold text-slate-900', valueClassName)}>{value}</span>
    </div>
  )
}

/** Right panel — footage viewer + status tabs, and incident/camera info for whichever row is selected. */
function IncidentDetailPanel({ incident, onStatusChange, onClose }) {
  if (!incident) {
    return (
      <section className="flex flex-1 items-center justify-center rounded-2xl border border-white/80 bg-white/90 p-10 text-sm text-slate-500 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-md">
        Select an incident to view details
      </section>
    )
  }

  return (
    <section className="flex flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-md">
      <header className="flex items-center justify-between gap-3 bg-[#2098e8] px-5 py-3">
        <h2 className="text-sm font-bold text-white">
          Incident · {incident.time} · {incident.area} · {incident.section}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close incident detail"
          className="text-white/70 transition-colors hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </header>

      <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="flex flex-col gap-4">
          <div className="relative flex min-h-[22rem] flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-slate-950">
            <span className="absolute top-3 left-3 rounded bg-black/60 px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
              Footage
            </span>
            <Camera className="h-8 w-8 text-slate-700" aria-hidden />
            <div className="flex flex-wrap items-center justify-center gap-2 px-6">
              {incident.detections.map((detection) => (
                <DetectionTag key={detection.label} detection={detection} />
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {STATUS_KEYS.map((status) => {
              const meta = INCIDENT_STATUS[status]
              const isActive = incident.status === status

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => onStatusChange(status)}
                  aria-pressed={isActive}
                  className={clsx(
                    'flex-1 rounded-full border px-4 py-2 text-xs font-bold transition-colors',
                    isActive ? meta.activeButton : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                  )}
                >
                  {meta.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-slate-200/70 bg-white/95 p-4">
            <h3 className="text-xs font-extrabold tracking-wide text-slate-900 uppercase">Incident Information</h3>
            <div className="mt-2">
              <InfoRow label="Violation Type" value={incident.violationType} valueClassName="text-red-600" />
              <InfoRow label="Incident Time" value={`${incident.time}:00`} />
              <InfoRow label="Loading Bay" value={incident.bay} />
              <InfoRow label="Confidence" value={`${incident.confidence}%`} />
              <InfoRow label="Status" value={INCIDENT_STATUS[incident.status].label} />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-white/95 p-4">
            <h3 className="text-xs font-extrabold tracking-wide text-slate-900 uppercase">Camera Information</h3>
            <div className="mt-2">
              <InfoRow label="Camera Name" value={incident.camera} />
              <InfoRow label="Area" value={incident.area} />
              <InfoRow label="Section" value={incident.section} />
              <InfoRow label="Last Signal" value={incident.lastSignal} />
            </div>
          </div>

          <button
            type="button"
            className="w-fit rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
          >
            Download Report
          </button>
        </div>
      </div>
    </section>
  )
}

export default IncidentDetailPanel
