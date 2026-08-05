import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'

/** Tabs with a `to` navigate to their own page; the rest stay local visual selectors. */
const TABS = [
  { label: 'Loading Bay', to: '/main-bagging-area' },
  { label: 'Packing Section', to: '/packing-bay' },
  { label: 'Movement Section', to: '/movement-section' },
  { label: 'Loading Section', to: '/loading-section' },
  { label: 'PPE Compliance', to: '/ppe-compliance' },
]

function SectionTabs() {
  const [localActive, setLocalActive] = useState(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // A route change (routed tab click, browser nav, etc.) always wins over a
  // stale visual-only selection from a tab that has no page of its own.
  useEffect(() => {
    setLocalActive(null)
  }, [pathname])

  const routeTab = TABS.find((tab) => tab.to === pathname)
  const activeLabel = localActive ?? routeTab?.label ?? TABS[0].label

  return (
    <div role="tablist" aria-label="Bay sections" className="flex flex-wrap items-center gap-2">
      {TABS.map((tab) => {
        const isActive = tab.label === activeLabel

        return (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => (tab.to ? navigate(tab.to) : setLocalActive(tab.label))}
            className={clsx(
              'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm',
              isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80',
            )}
          >
            <span
              className={clsx('h-1.5 w-1.5 shrink-0 rounded-full', isActive ? 'bg-white' : 'bg-slate-400')}
              aria-hidden
            />
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default SectionTabs
