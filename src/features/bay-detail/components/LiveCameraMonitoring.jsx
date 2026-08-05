import CameraThumbnail from './CameraThumbnail'

function CameraZone({ zone, selectedCameraId, onSelectCamera }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="h-3.5 w-1 shrink-0 rounded-full bg-[#2098e8]" aria-hidden />
        <h3 className="text-xs font-bold tracking-wide text-slate-900 uppercase">{zone.label}</h3>
      </div>
      <div className="flex flex-col gap-3">
        {zone.cameras.map((camera) => (
          <CameraThumbnail
            key={camera.id}
            camera={camera}
            isSelected={camera.id === selectedCameraId}
            onSelect={onSelectCamera}
          />
        ))}
      </div>
    </div>
  )
}

/** One column per belt zone (packing/movement/loading), each holding that zone's cameras. */
function LiveCameraMonitoring({ zones, selectedCameraId, onSelectCamera }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-bold text-slate-900">Live Camera Monitoring</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {zones.map((zone) => (
          <CameraZone key={zone.id} zone={zone} selectedCameraId={selectedCameraId} onSelectCamera={onSelectCamera} />
        ))}
      </div>
    </section>
  )
}

export default LiveCameraMonitoring
