import { useMemo, useState } from 'react'
import AnalyticsStatCard from '../features/analytics/components/AnalyticsStatCard'
import ChartCard from '../features/analytics/components/ChartCard'
import RangeFilter from '../features/analytics/components/RangeFilter'
import ThroughputTrendChart from '../features/analytics/components/ThroughputTrendChart'
import DowntimeByAreaChart from '../features/analytics/components/DowntimeByAreaChart'
import StoppageBreakdownChart from '../features/analytics/components/StoppageBreakdownChart'
import RecentEventsTable from '../features/analytics/components/RecentEventsTable'
import { kpis, throughputTrend, downtimeByArea, stoppageBreakdown } from '../features/analytics/data/mockAnalytics'

const RANGE_DAYS = { '7d': 7, '30d': 30, '90d': 90 }

function Analytics() {
  const [range, setRange] = useState('7d')
  const days = RANGE_DAYS[range]

  const throughputSlice = useMemo(() => throughputTrend.slice(-days), [days])

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Analytics</h1>
          <p className="mt-1 text-sm text-slate-600">
            Throughput, downtime, rejections and PPE compliance across every area.
          </p>
        </div>
        <RangeFilter value={range} onChange={setRange} />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {kpis.map((kpi) => (
          <AnalyticsStatCard key={kpi.id} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ChartCard title="Stoppage breakdown" subtitle="Minutes by event type, all areas combined · this week">
            <StoppageBreakdownChart data={stoppageBreakdown} />
          </ChartCard>
        </div>

        <div className="lg:col-span-2">
          <ChartCard title="Recent events" subtitle="Most recent reportable stoppages across all areas">
            <RecentEventsTable />
          </ChartCard>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Throughput trend" subtitle={`Bags/min · actual vs shift target · last ${days} days`}>
          <ThroughputTrendChart data={throughputSlice} target={240} />
        </ChartCard>

        <ChartCard title="Downtime by area" subtitle="Stoppage hours · this week">
          <DowntimeByAreaChart data={downtimeByArea} />
        </ChartCard>
      </div>
    </div>
  )
}

export default Analytics
