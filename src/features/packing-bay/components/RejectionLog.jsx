import { packingRejectionLog } from '../data/mockPackingBay'

/** Internal rejection = sacks counted at Packing minus sacks counted at Loading, per bay. */
function RejectionLog() {
  return (
    <section className="flex flex-col rounded-2xl border border-white/80 bg-white/90 px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-md">
      <h2 className="text-sm font-bold text-slate-900">Packing Section — Rejection Log</h2>
      <p className="mt-1 text-xs text-slate-500">
        Internal rejection = sacks counted at Packing − sacks counted at Loading, for the same bay.
      </p>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-400">
              <th className="py-2 pr-2 font-medium">Bay</th>
              <th className="py-2 pr-2 font-medium">Packing Sacks</th>
              <th className="py-2 pr-2 font-medium">Loading Sacks</th>
              <th className="py-2 font-medium">Internal Rejection</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {packingRejectionLog.map((row) => (
              <tr key={row.id}>
                <td className="py-2 pr-2 font-medium text-slate-700">{row.bay}</td>
                <td className="py-2 pr-2 text-slate-500 tabular-nums">{row.packingSacks.toLocaleString()}</td>
                <td className="py-2 pr-2 text-slate-500 tabular-nums">{row.loadingSacks.toLocaleString()}</td>
                <td className="py-2">
                  {row.internalRejection == null ? (
                    <span className="text-slate-300">—</span>
                  ) : (
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600 tabular-nums">
                      {row.internalRejection}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default RejectionLog
