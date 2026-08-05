import clsx from 'clsx'

const SEVERITY = {
  normal: {
    wrap: 'border-emerald-200 bg-emerald-50/95',
    badge: 'bg-emerald-600',
    text: 'text-emerald-700',
    pulse: false,
    blink: false,
  },
  warning: {
    wrap: 'border-amber-200 bg-amber-50/95',
    badge: 'bg-amber-500',
    text: 'text-amber-700',
    pulse: true,
    blink: false,
  },
  danger: {
    wrap: 'border-red-200 bg-red-50/95',
    badge: 'bg-red-600',
    text: 'text-red-700',
    pulse: true,
    blink: true,
  },
}

/** Single active operational alert — hidden entirely when there's nothing to show. */
function AlertBanner({ alert }) {
  if (!alert) return null

  const meta = SEVERITY[alert.severity] ?? SEVERITY.normal

  return (
    <div
      role="alert"
      className={clsx(
        'flex flex-1 items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-md',
        meta.wrap,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2.5 gap-y-1">
        <span
          className={clsx(
            'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-white uppercase',
            meta.badge,
          )}
        >
          <span className={clsx('h-1.5 w-1.5 rounded-full bg-white', meta.pulse && 'animate-pulse')} aria-hidden />
          Alert
        </span>
        <p className={clsx('text-sm font-bold sm:text-base', meta.text, meta.blink && 'animate-blink')}>
          {alert.message}
        </p>
      </div>
    </div>
  )
}

export default AlertBanner
