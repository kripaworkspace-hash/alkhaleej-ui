import { Outlet, useLocation } from 'react-router-dom'
import SectionTabs from './SectionTabs'

/** Title/subtitle per section tab route — falls back to the Main Bagging Area
 * heading for routes with no entry here (Loading Bay, PPE Compliance). */
const PAGE_HEADINGS = {
  '/packing-bay': { title: 'Packing Section', subtitle: 'Packing Bay Metrics • All Loading Bays • Live' },
  '/movement-section': { title: 'Movement Section', subtitle: 'Movement Bay Metrics • All Loading Bays • Live' },
  '/loading-section': { title: 'Loading Section', subtitle: 'Loading Belt & Dispatch Metrics • All Loading Bays • Live' },
}

const DEFAULT_HEADING = { title: 'Main Bagging Area', subtitle: 'Loading Bay Overview · Live Operations Status' }

/** Shared title/tabs bar for every page a section tab links to, so switching
 * tabs (Loading Bay, Packing Section, ...) feels like one area, not separate pages. */
function BaggingAreaLayout() {
  const { pathname } = useLocation()
  const heading = PAGE_HEADINGS[pathname] ?? DEFAULT_HEADING

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{heading.title}</h1>
          <p className="mt-1 text-sm text-slate-600">{heading.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <SectionTabs />
        </div>
      </div>

      <Outlet />
    </div>
  )
}

export default BaggingAreaLayout
