import { Video, VideoOff } from 'lucide-react'
import clsx from 'clsx'

/** Clickable camera card — selecting one shows it in the CameraFeed panel above. */
function CameraThumbnail({ camera, isSelected, onSelect }) {
  const isLive = camera.status === 'live'

  return (
    <button
      type="button"
      onClick={() => onSelect(camera)}
      aria-pressed={isSelected}
      className={clsx(
        'flex flex-col overflow-hidden rounded-xl border bg-white text-left shadow-[0_1px_2px_rgba(15,23,42,0.06),0_4px_8px_-4px_rgba(15,23,42,0.1)] transition-colors',
        isSelected ? 'border-[#2098e8] ring-2 ring-[#2098e8]/40' : 'border-slate-200/70 hover:border-slate-300',
      )}
    >
      <div className="flex aspect-[2/1] items-center justify-center bg-slate-900">
        {isLive ? (
          <Video className="h-7 w-7 text-slate-600" aria-hidden />
        ) : (
          <VideoOff className="h-7 w-7 text-slate-700" aria-hidden />
        )}
      </div>
      <div className="flex flex-col gap-1.5 px-4 py-3">
        <p className="text-sm font-bold text-slate-900">{camera.name}</p>
        <p className="text-xs text-slate-500">{camera.belts}</p>
        <span
          className={clsx(
            'inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-white uppercase',
            isLive ? 'bg-emerald-500' : 'bg-slate-400',
          )}
        >
          {isLive ? 'Live' : 'Offline'}
        </span>
      </div>
    </button>
  )
}

export default CameraThumbnail
