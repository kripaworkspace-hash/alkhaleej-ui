import { useEffect, useState } from 'react'

function formatTime(date) {
  return date.toLocaleTimeString('en-GB', { hour12: false })
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/** Ticks every second — local browser time, no server sync. */
function LiveClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <p className="shrink-0 text-sm font-semibold text-slate-900 tabular-nums sm:text-base">
      {formatTime(now)} <span className="text-slate-300">|</span> {formatDate(now)}
    </p>
  )
}

export default LiveClock
