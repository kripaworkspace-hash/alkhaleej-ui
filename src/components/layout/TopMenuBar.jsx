import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import clsx from 'clsx'
import Logo from './Logo'
import LiveClock from '../../features/main-bagging-area/components/LiveClock'
import { NAV_ITEMS } from './navItems'

function navLinkClass({ isActive }) {
  return clsx(
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-[#2098e8]/12 text-[#2098e8]'
      : 'text-[#2098e8]/75 hover:bg-[#2098e8]/8 hover:text-[#2098e8]',
  )
}

/** Pathname-only match — good enough to light up "Bays" while on one of its query-param children. */
function isChildActive(item, pathname) {
  return item.children?.some((child) => pathname === child.to.split('?')[0]) ?? false
}

function TopMenuBar() {
  const [open, setOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [openMobileGroup, setOpenMobileGroup] = useState(null)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-[1800px] items-center justify-between gap-4 px-3 sm:px-5">
        {/* Left: logo + platform title */}
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo className="h-8 w-auto shrink-0" />
          <span className="text-[13px] font-semibold tracking-[0.16em] text-[#2098e8] uppercase sm:text-sm">
            Conveyor Intelligence
          </span>
        </NavLink>

        {/* Right: menu items + clock, grouped so they stay flush against the right edge together */}
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown((v) => (v === item.label ? null : v))}
                >
                  <button
                    type="button"
                    onClick={() => setOpenDropdown((v) => (v === item.label ? null : item.label))}
                    aria-expanded={openDropdown === item.label}
                    className={clsx(
                      navLinkClass({ isActive: isChildActive(item, location.pathname) }),
                      'flex items-center gap-1',
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                  </button>

                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-1">
                      <div className="min-w-[13rem] rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            onClick={() => setOpenDropdown(null)}
                            className={({ isActive }) =>
                              clsx(
                                'block px-3 py-2 text-sm',
                                isActive
                                  ? 'bg-[#2098e8]/10 font-medium text-[#2098e8]'
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-[#2098e8]',
                              )
                            }
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink key={item.to} to={item.to} end={item.to === '/'} className={navLinkClass}>
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <LiveClock />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-[#2098e8] hover:bg-[#2098e8]/10 lg:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-slate-200 px-4 pb-3 lg:hidden" aria-label="Main (mobile)">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.label} className="mt-1">
                <button
                  type="button"
                  onClick={() => setOpenMobileGroup((v) => (v === item.label ? null : item.label))}
                  aria-expanded={openMobileGroup === item.label}
                  className={clsx(
                    'flex w-full items-center justify-between',
                    navLinkClass({ isActive: isChildActive(item, location.pathname) }),
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={clsx(
                      'h-4 w-4 transition-transform',
                      openMobileGroup === item.label && 'rotate-180',
                    )}
                    aria-hidden
                  />
                </button>

                {openMobileGroup === item.label && (
                  <div className="mt-1 ml-3 flex flex-col gap-0.5 border-l border-slate-200 pl-3">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={() => {
                          setOpen(false)
                          setOpenMobileGroup(null)
                        }}
                        className={({ isActive }) =>
                          clsx(
                            'rounded-md px-3 py-1.5 text-sm',
                            isActive ? 'font-medium text-[#2098e8]' : 'text-slate-600',
                          )
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) => clsx('mt-1 block', navLinkClass({ isActive }))}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
      )}
    </header>
  )
}

export default TopMenuBar
