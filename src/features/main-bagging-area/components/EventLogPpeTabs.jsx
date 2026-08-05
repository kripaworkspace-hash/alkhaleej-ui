import { useState } from 'react'
import clsx from 'clsx'
import { EVENT_STATUS, PPE_VIOLATION_STYLE } from '../data/mockBaggingArea'

const TABS = [
  { key: 'events', label: 'Event Log', subtitle: 'Latest belt events' },
  { key: 'ppe', label: 'PPE Compliance', subtitle: 'Packing section only' },
]

function EventLogTable({ events }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center text-sm">
        <thead>
          <tr className="text-slate-400">
            <th className="py-2 px-2 font-medium">Time</th>
            <th className="py-2 px-2 font-medium">Belt</th>
            <th className="py-2 px-2 font-medium">Bay</th>
            <th className="py-2 px-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {events.map((event) => {
            const meta = EVENT_STATUS[event.status] ?? EVENT_STATUS.idle

            return (
              <tr key={event.id}>
                <td className="py-2 px-2 text-slate-500 tabular-nums">{event.time}</td>
                <td className="py-2 px-2 font-medium text-slate-700">{event.belt}</td>
                <td className="py-2 px-2 text-slate-500">{event.bay}</td>
                <td className="py-2 px-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${meta.className}`}>
                    {meta.label}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function PPETable({ violations }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center text-sm">
        <thead>
          <tr className="text-slate-400">
            <th className="py-2 px-2 font-medium">Time</th>
            <th className="py-2 px-2 font-medium">Bay</th>
            <th className="py-2 px-2 font-medium">Violation</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {violations.map((violation) => (
            <tr key={violation.id}>
              <td className="py-2 px-2 text-slate-500 tabular-nums">{violation.time}</td>
              <td className="py-2 px-2 text-slate-500">{violation.bay}</td>
              <td className="py-2 px-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${PPE_VIOLATION_STYLE[violation.violation] ?? 'bg-slate-100 text-slate-600'}`}
                >
                  {violation.violation}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Event Log and PPE Compliance share one card, switched via tabs; Event Log is the default. */
function EventLogPpeTabs({ events, violations }) {
  const [activeTab, setActiveTab] = useState('events')
  const current = TABS.find((tab) => tab.key === activeTab)

  return (
    <section className="flex flex-col rounded-2xl border border-white/80 bg-white/90 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-md">
      <div className="flex border-b border-slate-900/5">
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              aria-selected={isActive}
              className={clsx(
                'flex-1 border-b-2 px-5 py-3 text-center text-base font-semibold transition-colors',
                isActive
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-600',
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <p className="px-5 pt-3 text-center text-xs text-slate-500">{current.subtitle}</p>

      <div className="px-5 py-2">
        {activeTab === 'events' ? <EventLogTable events={events} /> : <PPETable violations={violations} />}
      </div>
    </section>
  )
}

export default EventLogPpeTabs
