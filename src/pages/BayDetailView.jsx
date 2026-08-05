import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import clsx from 'clsx'
import ConveyorControlBoard from '../features/bay-detail/components/ConveyorControlBoard'
import CameraFeed from '../features/bay-detail/components/CameraFeed'
import LiveCameraMonitoring from '../features/bay-detail/components/LiveCameraMonitoring'
import { BAY_STATUS, getBayDetail } from '../features/bay-detail/data/mockBayDetail'

function BayDetailView() {
  const { bayId } = useParams()
  const bay = getBayDetail(bayId)
  const statusMeta = BAY_STATUS[bay.status] ?? BAY_STATUS.idle
  const [selectedCameraId, setSelectedCameraId] = useState(null)
  const allCameras = bay.cameraZones.flatMap((zone) => zone.cameras)
  const selectedCamera = allCameras.find((camera) => camera.id === selectedCameraId) ?? null

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            to="/main-bagging-area"
            className="mb-1 inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Back to Main Bagging Area
          </Link>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-semibold text-slate-900">{bay.label}</h1>
            <span className={clsx('rounded-full px-2 py-0.5 text-[10px] font-semibold', statusMeta.badge)}>
              {statusMeta.label}
            </span>
            <span
              className={clsx(
                'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                bay.truckPresent ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600',
              )}
            >
              TRUCK: {bay.truckPresent ? 'YES' : 'NO'}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600">Bay Detail · Live Operations Status</p>
        </div>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,8fr)_minmax(0,5fr)]">
        <ConveyorControlBoard flow={bay.flow} metrics={bay.metrics} truckPresent={bay.truckPresent} status={bay.status} />
        <CameraFeed camera={selectedCamera} />
      </div>

      <LiveCameraMonitoring
        zones={bay.cameraZones}
        selectedCameraId={selectedCameraId}
        onSelectCamera={(camera) => setSelectedCameraId(camera.id)}
      />
    </div>
  )
}

export default BayDetailView
