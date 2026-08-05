import conveyorScene from '../../../assets/images/conveyor-scene.svg'
import StatTile from './StatTile'
import { kpis, shiftSummary } from '../data/mockOperations'

const TICKS = 24

/** Segmented meter — the shift's completion, read as filled ticks. */
function TickMeter({ percent }) {
  const filled = Math.round((percent / 100) * TICKS)

  return (
    <div
      className="flex gap-[0.35%]"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Shift completion"
    >
      {Array.from({ length: TICKS }, (_, i) => (
        <span
          key={i}
          className={`h-[clamp(0.6rem,0.9vw,1.1rem)] w-[clamp(0.25rem,0.35vw,0.4rem)] rounded-sm ${
            i < filled ? 'bg-[#2098e8]' : 'bg-slate-900/12'
          }`}
        />
      ))}
    </div>
  )
}

function HeroBand() {
  return (
    <section className="relative flex flex-1 overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-b from-[#cfe8fa] via-[#e9f4fd] to-white sm:rounded-3xl">
      {/* Full-bleed scene, weighted right — content sits directly on it */}
      <div
        className="absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: `url(${conveyorScene})` }}
        aria-hidden
      />
      {/* Scrim keeps the headline legible over the artwork — vertical on
          mobile where the copy sits above the art, horizontal from lg up */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/25 to-transparent lg:bg-gradient-to-r lg:from-white/50 lg:via-white/15 lg:to-transparent"
        aria-hidden
      />
      {/* Fades the band to near-white at its foot, so the overlapping cards'
          shadows land on a light plane and their projection reads. */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent via-white/70 to-white"
        aria-hidden
      />

      <div className="relative grid w-full items-center gap-5 px-4 pt-5 pb-14 sm:px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 lg:pb-16">
        <div className="max-w-xl">
          <h1 className="text-[clamp(1.1rem,1.6vw,1.9rem)] leading-[1.2] font-semibold tracking-tight text-slate-900 uppercase">
            {shiftSummary.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-3 max-w-md text-[clamp(0.75rem,0.85vw,1rem)] text-slate-600">
            {shiftSummary.blurb}
          </p>

          <div className="mt-4 lg:mt-6">
            <TickMeter percent={shiftSummary.completion} />
          </div>

          <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-2.5 py-1 text-[clamp(0.65rem,0.75vw,0.85rem)] text-slate-600 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0ca30c]" aria-hidden />
            Live · updated 17:42
          </span>

          {/* <dl className="mt-4 flex flex-wrap gap-x-[clamp(1.5rem,3vw,3.5rem)] gap-y-3">
            {shiftSummary.figures.map((figure) => (
              <div key={figure.label}>
                <dd className="flex items-baseline gap-1">
                  <span className="text-[clamp(0.95rem,1.15vw,1.45rem)] leading-none font-semibold text-slate-900 tabular-nums">
                    {figure.value}
                  </span>
                  <span className="text-[clamp(0.65rem,0.75vw,0.85rem)] text-slate-500">
                    {figure.unit}
                  </span>
                </dd>
                <dt className="mt-1 text-[clamp(0.65rem,0.75vw,0.85rem)] text-slate-500">
                  {figure.label}
                </dt>
              </div>
            ))}
          </dl> */}
        </div>

        {/* KPIs float over the image, compact and glassy */}
        <div className="flex flex-col gap-3 lg:justify-self-end">
          <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
            {kpis.map((kpi) => (
              <StatTile key={kpi.id} {...kpi} variant="glass" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBand
