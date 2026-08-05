import { BELT_STATUS } from '../data/mockLocations'

/**
 * One row per process, one dot per belt unit — status rides on color plus a
 * title tooltip, so it never depends on color alone.
 */
function BeltStatusStrip({ processes }) {
  return (
    <div className="min-w-0">
      <p className="text-[clamp(0.62rem,0.72vw,0.8rem)] font-semibold tracking-wide text-[#2098e8] uppercase">
        Belt status across bay
      </p>

      <ul className="mt-2.5 flex flex-col gap-[clamp(0.45rem,0.6vw,0.7rem)]">
        {processes.map((process) => (
          <li key={process.id} className="flex items-center gap-2.5">
            <span className="w-[clamp(3.4rem,4.4vw,5.2rem)] shrink-0 truncate text-[clamp(0.58rem,0.82vw,0.95rem)] font-medium text-slate-700">
              {process.name}
            </span>
            <span className="flex flex-wrap items-center gap-[clamp(0.3rem,0.4vw,0.45rem)]">
              {process.units.map((unit) => {
                const meta = BELT_STATUS[unit.status] ?? BELT_STATUS.idle
                return (
                  <span
                    key={unit.id}
                    className="h-[clamp(0.5rem,0.62vw,0.7rem)] w-[clamp(0.5rem,0.62vw,0.7rem)] shrink-0 rounded-full"
                    style={{ backgroundColor: meta.color }}
                    title={`${unit.id} — ${meta.label}`}
                  />
                )
              })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BeltStatusStrip
