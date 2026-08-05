import { useEffect, useState } from 'react'
import SummaryCard from '../features/main-bagging-area/components/SummaryCard'
import AlertBanner from '../features/main-bagging-area/components/AlertBanner'
import LoadingBayList from '../features/main-bagging-area/components/LoadingBayList'
import EventLogPpeTabs from '../features/main-bagging-area/components/EventLogPpeTabs'
import {
  summaryCards,
  alertShowcase,
  loadingBays,
  eventLog,
  ppeViolations,
} from '../features/main-bagging-area/data/mockBaggingArea'

const ALERT_INTERVAL_MS = 5000

function MainBaggingArea() {
  const [alertIndex, setAlertIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setAlertIndex((i) => (i + 1) % alertShowcase.length)
    }, ALERT_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:flex lg:shrink-0">
          {summaryCards.map((card) => (
            <SummaryCard key={card.id} {...card} />
          ))}
        </div>
        <AlertBanner alert={alertShowcase[alertIndex]} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
        <LoadingBayList bays={loadingBays} />
        <EventLogPpeTabs events={eventLog} violations={ppeViolations} />
      </div>
    </div>
  )
}

export default MainBaggingArea
