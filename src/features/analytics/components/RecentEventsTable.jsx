import { EVENT_STATUS, recentEvents } from '../data/mockAnalytics'

/** Cross-area reportable events, most recent first — the table view behind every chart above. */
function RecentEventsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="text-slate-400">
            <th className="py-2 pr-2 font-medium">Area</th>
            <th className="py-2 pr-2 font-medium">Unit</th>
            <th className="py-2 pr-2 font-medium">Start</th>
            <th className="py-2 pr-2 font-medium">End</th>
            <th className="py-2 pr-2 font-medium">Duration</th>
            <th className="py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {recentEvents.map((event) => {
            const meta = EVENT_STATUS[event.status]

            return (
              <tr key={event.id}>
                <td className="py-2 pr-2 text-slate-500">{event.area}</td>
                <td className="py-2 pr-2 font-medium text-slate-700">{event.unit}</td>
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
  )
}

export default RecentEventsTable
