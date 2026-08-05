import HeroBand from '../features/dashboard/components/HeroBand'
import LocationCard from '../features/dashboard/components/LocationCard'
import { locations } from '../features/dashboard/data/mockLocations'

function OperationsDashboard() {
  return (
    <div className="flex flex-1 flex-col">
      {/* The band absorbs leftover height so the page fills tall screens */}
      <HeroBand />

      {/* Pulled up so the location cards overlap the band's lower edge */}
      <div className="relative z-10 -mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:-mt-10 lg:grid-cols-3 lg:gap-4">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </div>
  )
}

export default OperationsDashboard
