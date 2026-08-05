import { Camera, Video, VideoOff } from 'lucide-react'
import clsx from 'clsx'

/** Large, single feed viewer — shows whichever camera is selected in Live Camera Monitoring below. */
function CameraFeed({ camera }) {
  const isLive = camera?.status === 'live'

  return (
    <section className="flex flex-1 flex-col rounded-2xl border border-white/80 bg-white/90 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_16px_-6px_rgba(15,23,42,0.12),0_24px_48px_-12px_rgba(15,23,42,0.22)] backdrop-blur-md">
      <header className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-sm font-bold text-slate-900">Camera Feed</h2>
      </header>

      <div className="flex flex-1 p-5">
        {camera ? (
          <div className="relative flex min-h-[26rem] flex-1 flex-col items-center justify-center overflow-hidden rounded-xl bg-slate-950">
            {isLive ? (
              <Video className="h-10 w-10 text-slate-600" aria-hidden />
            ) : (
              <VideoOff className="h-10 w-10 text-slate-700" aria-hidden />
            )}
            <span
              className={clsx(
                'absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-white uppercase',
                isLive ? 'bg-red-600' : 'bg-slate-700',
              )}
            >
              <span className={clsx('h-1.5 w-1.5 rounded-full bg-white', isLive && 'animate-pulse')} aria-hidden />
              {isLive ? 'Live' : 'Offline'}
            </span>
            <div className="absolute bottom-3 left-3">
              <p className="text-sm font-semibold text-white">{camera.name}</p>
              <p className="text-xs text-slate-400">{camera.belts}</p>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[26rem] flex-1 flex-col items-center justify-center gap-3 rounded-xl bg-slate-950">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-500">
              <Camera className="h-6 w-6" aria-hidden />
            </span>
            <p className="text-sm text-slate-400">Select a camera below to view its live feed</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default CameraFeed
