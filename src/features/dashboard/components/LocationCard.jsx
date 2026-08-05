import { Link } from 'react-router-dom'
import { ArrowRight, CircleGauge, OctagonAlert, Package, SlidersHorizontal } from 'lucide-react'
import BeltStatusStrip from './BeltStatusStrip'
import truckScene from '../../../assets/images/Isometric Production Chain Industry.svg'

/** Locations with a dedicated dashboard route; anything unlisted falls back to the Bays view. */
const DETAIL_ROUTES = {
  'main-bagging-area': '/main-bagging-area',
}

/**
 * Icons are brand-tinted, never status-colored — amber/red stay reserved for
 * the belt strip, so a KPI chip can't be mistaken for an alarm.
 */
const KPI_ICONS = {
  'Bags/Min': Package,
  Utilization: CircleGauge,
  Stoppages: OctagonAlert,
  Rejections: SlidersHorizontal,
}

function LocationCard({ location }) {
  return (
    <article className="flex flex-col rounded-2xl border border-white/80 bg-white/95 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_22px_-6px_rgba(15,23,42,0.16),0_34px_64px_-12px_rgba(15,23,42,0.28)]">
      <header className="border-b border-slate-900/5 px-[clamp(1.1rem,1.4vw,1.9rem)] py-[clamp(0.85rem,1.05vw,1.4rem)]">
        <h3 className="text-[clamp(0.9rem,1.05vw,1.25rem)] font-semibold text-slate-900">
          {location.name}
        </h3>
        <p className="mt-0.5 text-[clamp(0.7rem,0.8vw,0.95rem)] text-slate-500">
          {location.subtitle}
        </p>
      </header>

      {/* Belt status and artwork share one row */}
      <div className="flex flex-1 items-center gap-[clamp(0.75rem,1.2vw,1.75rem)] px-[clamp(1.1rem,1.4vw,1.9rem)] py-[clamp(0.85rem,1.05vw,1.4rem)]">
        <BeltStatusStrip processes={location.processes} />

        {/* Decorative — the card is already titled, so it carries no alt text */}
        <img
          src={truckScene}
          alt=""
          aria-hidden
          className="w-[clamp(6rem,10vw,13rem)] shrink-0 object-contain grayscale drop-shadow-[0_10px_22px_rgba(15,23,42,0.16)]"
        />
      </div>

      <div className="border-t border-slate-900/5 px-[clamp(1.1rem,1.4vw,1.9rem)] pt-[clamp(0.7rem,0.9vw,1.15rem)] pb-[clamp(1rem,1.25vw,1.6rem)]">
        {/* KPI strip: 4 even sections in a line, split by vertical hairlines */}
        <dl className="grid grid-cols-4 divide-x divide-slate-900/[0.08]">
          {location.kpis.map((kpi) => {
            const Icon = KPI_ICONS[kpi.label] ?? Package
            return (
              <div key={kpi.label} className="flex min-w-0 flex-col items-center gap-1 px-1 text-center">
                <Icon
                  className="h-[clamp(0.62rem,0.78vw,0.95rem)] w-[clamp(0.62rem,0.78vw,0.95rem)] shrink-0 text-[#2098e8]"
                  aria-hidden
                />
                <dt className="w-full truncate text-[clamp(0.6rem,0.68vw,0.78rem)] text-slate-500">
                  {kpi.label}
                </dt>
                <dd className="text-[clamp(0.85rem,1vw,1.2rem)] leading-none font-semibold text-slate-900 tabular-nums">
                  {kpi.value}
                </dd>
              </div>
            )
          })}
        </dl>

        <Link
          to={DETAIL_ROUTES[location.id] ?? `/bays?location=${location.id}`}
          className="mt-[clamp(0.7rem,0.9vw,1.15rem)] flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#2098e8] px-4 py-[clamp(0.45rem,0.6vw,0.8rem)] text-[clamp(0.7rem,0.85vw,1rem)] font-medium text-white transition-colors hover:bg-[#1b83c9]"
        >
          View Bay Details
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  )
}

export default LocationCard
