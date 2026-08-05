import { useState } from 'react'
import clsx from 'clsx'
import { bagsPerTruckRecord } from '../data/mockLoadingSection'

/** Bags loaded are counted automatically; external rejected bags are typed in per truck and saved locally. */
function BagsRecord() {
  const [rows, setRows] = useState(
    bagsPerTruckRecord.map((row) => ({ ...row, draft: String(row.externalRejected) })),
  )

  function handleDraftChange(id, value) {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, draft: value } : row)))
  }

  function handleSave(id) {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, externalRejected: Number(row.draft) || 0 } : row)),
    )
  }

  return (
    <section className="flex flex-col rounded-2xl border border-white/80 bg-white/90 px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-md">
      <h2 className="text-sm font-bold text-slate-900">Bags per Truck — Record</h2>
      <p className="mt-1 text-xs text-slate-500">
        Bags loaded are counted automatically at the loading belt. External rejected bags are entered manually per
        truck, then saved.
      </p>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-400">
              <th className="py-2 pr-2 font-medium">Truck ID</th>
              <th className="py-2 pr-2 font-medium">Bay</th>
              <th className="py-2 pr-2 font-medium">Window</th>
              <th className="py-2 pr-2 font-medium">Bags Loaded</th>
              <th className="py-2 pr-2 font-medium">External Rejected</th>
              <th className="py-2 font-medium">Net Bags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => {
              const netBags = row.bagsLoaded - row.externalRejected

              return (
                <tr key={row.id}>
                  <td className="py-2 pr-2 font-medium text-slate-700">
                    {row.truckId}
                    {row.ongoing && <span className="ml-1.5 text-[10px] font-semibold text-red-500">ONGOING</span>}
                  </td>
                  <td className="py-2 pr-2 text-slate-500">{row.bay}</td>
                  <td className="py-2 pr-2 text-slate-500 tabular-nums">{row.window}</td>
                  <td className="py-2 pr-2 text-slate-500 tabular-nums">{row.bagsLoaded.toLocaleString()}</td>
                  <td className="py-2 pr-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={row.draft}
                        onChange={(e) => handleDraftChange(row.id, e.target.value)}
                        className={clsx(
                          'w-16 rounded-md border border-slate-200 px-2 py-1 text-xs tabular-nums text-slate-700',
                          'focus:border-[#2098e8] focus:outline-none',
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => handleSave(row.id)}
                        className="rounded-md bg-[#2098e8]/10 px-2.5 py-1 text-[11px] font-semibold text-[#2098e8] hover:bg-[#2098e8]/15"
                      >
                        Save
                      </button>
                    </div>
                  </td>
                  <td className="py-2 font-bold text-slate-900 tabular-nums">{netBags.toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default BagsRecord
