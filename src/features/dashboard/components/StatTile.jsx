import { CircleGauge, OctagonAlert, Package } from 'lucide-react'
import clsx from 'clsx'
import TruckImage from '../../../components/ui/TruckImage'

const ICONS = {
  bags: Package,
  utilization: CircleGauge,
  stoppages: OctagonAlert,
  adjusted: TruckImage,
}

const TONES = {
  good: 'text-emerald-600',
  neutral: 'text-slate-500',
  warning: 'text-amber-600',
  critical: 'text-red-600',
}

/**
 * Headline number — no plot, so no hover layer.
 * `glass` is the compact variant that floats over the hero image.
 */
function StatTile({ label, value, caption, icon, tone = 'neutral', variant = 'card' }) {
  const Icon = ICONS[icon] ?? Package
  const glass = variant === 'glass'

  return (
    <div
      className={clsx(
        'rounded-xl border backdrop-blur-xl',
        glass
          ? 'border-white/60 bg-white/55 px-[clamp(0.75rem,1.1vw,1.5rem)] py-[clamp(0.6rem,0.9vw,1.25rem)] shadow-[0_1px_2px_rgba(15,23,42,0.05),0_6px_14px_-4px_rgba(15,23,42,0.12),0_18px_36px_-10px_rgba(15,23,42,0.20)]'
          : 'border-white/70 bg-white/90 px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)]',
      )}
    >
      <div className={clsx('flex items-center', glass ? 'gap-2' : 'gap-2.5')}>
        <span
          className={clsx(
            'flex shrink-0 items-center justify-center rounded-full border border-slate-900/10 text-slate-500',
            glass ? 'h-[clamp(1.35rem,1.7vw,2.1rem)] w-[clamp(1.35rem,1.7vw,2.1rem)]' : 'h-7 w-7',
          )}
        >
          <Icon
            className={clsx(
              'object-contain',
              glass ? 'h-[clamp(0.7rem,0.9vw,1.1rem)] w-[clamp(0.7rem,0.9vw,1.1rem)]' : 'h-3.5 w-3.5',
            )}
            aria-hidden
          />
        </span>
        <span
          className={clsx(
            'truncate text-slate-600',
            glass ? 'text-[clamp(0.7rem,0.8vw,0.95rem)] font-medium' : 'text-sm text-slate-500',
          )}
        >
          {label}
        </span>
      </div>

      <p
        className={clsx(
          'leading-none font-semibold text-slate-900 tabular-nums',
          glass ? 'mt-1.5 text-[clamp(1.05rem,1.3vw,1.65rem)]' : 'mt-3 text-3xl',
        )}
      >
        {value}
      </p>

      <p
        className={clsx(
          TONES[tone] ?? TONES.neutral,
          glass ? 'mt-1.5 text-[clamp(0.65rem,0.75vw,0.9rem)]' : 'mt-3 text-sm',
        )}
      >
        {caption}
      </p>
    </div>
  )
}

export default StatTile
