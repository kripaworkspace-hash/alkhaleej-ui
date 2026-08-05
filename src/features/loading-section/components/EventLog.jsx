import { EVENT_STATUS, loadingEventLog } from '../data/mockLoadingSection'

/** Reportable loading-belt events: fully stopped, or moving without sacks. */
function EventLog() {
  return (
    <section className="flex flex-col rounded-2xl border border-white/80 bg-white/90 px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-md">
      <h2 className="text-sm font-bold text-slate-900">Loading Section — Event Log</h2>
      <p className="mt-1 text-xs text-slate-500">
        Reportable events for loading belts only: belt stopped completely, or belt moving without sacks.
      </p>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-400">
              <th className="py-2 pr-2 font-medium">Bay</th>
              <th className="py-2 pr-2 font-medium">Belt</th>
              <th className="py-2 pr-2 font-medium">Start</th>
              <th className="py-2 pr-2 font-medium">End</th>
              <th className="py-2 pr-2 font-medium">Duration</th>
              <th className="py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loadingEventLog.map((event) => {
              const meta = EVENT_STATUS[event.status]

              return (
                <tr key={event.id}>
                  <td className="py-2 pr-2 text-slate-500">{event.bay}</td>
                  <td className="py-2 pr-2 font-medium text-slate-700">{event.belt}</td>
                  <td className="py-2 pr-2 text-slate-500 tabular-nums">{event.start}</td>
                  <td className="py-2 pr-2 tabular-nums">
                    {event.end ?? <span className="font-semibold text-red-500">ONGOING</span>}
                  </td>
                  <td className="py-2 pr-2 text-slate-500 tabular-nums">{event.duration}</td>
                  <td className="py-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${meta.className}`}>
                      {meta.label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default EventLog
