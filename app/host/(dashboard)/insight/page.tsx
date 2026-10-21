import { BarChart3, ShieldCheck } from 'lucide-react'
import PageHeading from '@/components/dashboard/page-heading'
import EmptyState from '@/components/host/empty-state'
import BookingDemand from '@/components/host/insights/booking-demand'
import BookingFunnel from '@/components/host/insights/booking-funnel'
import EarningsChart from '@/components/host/insights/earnings-chart'
import ExportReportButton from '@/components/host/insights/export-report-button'
import ListingPerformance from '@/components/host/insights/listing-performance'
import OccupancyHeatmap from '@/components/host/insights/occupancy-heatmap'
import PeriodTabs, { PERIOD_LABELS } from '@/components/host/insights/period-tabs'
import ResponsePerformance from '@/components/host/insights/response-performance'
import ReviewTrend from '@/components/host/insights/review-trend'
import InsightStatCards from '@/components/host/insights/stat-cards'
import {
  DUMMY_HOST_INSIGHTS,
  DUMMY_HOST_LISTINGS,
  DUMMY_IBADAN_DEMAND,
  DUMMY_INSIGHT_TIP,
  DUMMY_RESPONSE_PERFORMANCE,
  INSIGHT_PERIODS,
  InsightPeriod,
} from '@/lib/dummy'

export default async function Page({ searchParams }: { searchParams: Promise<{ period?: string }> }) {
  const { period: param } = await searchParams
  const period = INSIGHT_PERIODS.includes(param as InsightPeriod) ? (param as InsightPeriod) : 'month'
  const periodLabel = PERIOD_LABELS[period]
  const insights = DUMMY_HOST_INSIGHTS[period]
  // The empty state shows until at least one listing is live
  const hasLiveListing = insights.listings.some((l) => l.status === 'live')

  const header = (
    <div className='flex flex-wrap items-start justify-between gap-4'>
      <PageHeading className='mb-0' title='Insights' description='Performance data across your listings. Updated daily.' />
      <div className='flex max-w-full flex-wrap items-center gap-3'>
        <PeriodTabs active={period} />
        <ExportReportButton rows={hasLiveListing ? insights.listings : []} periodLabel={periodLabel} />
      </div>
    </div>
  )

  if (!hasLiveListing) {
    return (
      <div className='flex flex-col gap-4 md:gap-6'>
        {header}
        <EmptyState
          icon={BarChart3}
          className='py-16'
          title='No data to show yet'
          description='Your insights dashboard will populate once your listing is live and receiving views. You will see booking conversion rates, revenue trends, occupancy rates, and how your listings compare to similar spaces in Ibadan.'
          action={{ label: 'Get your listing live', href: '/host/create-listing' }}
        />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 md:gap-6'>
      {header}
      <InsightStatCards stats={insights.stats} revenueLabel={`Revenue ${periodLabel.toLowerCase()}`} />
      <EarningsChart earnings={insights.earnings} label={insights.chartLabel} />
      <ListingPerformance rows={insights.listings} />
      <div className='grid gap-4 md:gap-6 lg:grid-cols-2'>
        <BookingFunnel funnel={insights.funnel} />
        <ResponsePerformance response={DUMMY_RESPONSE_PERFORMANCE} />
      </div>
      <OccupancyHeatmap
        listing={DUMMY_HOST_LISTINGS[0].title}
        range={insights.occupancyRange}
        months={insights.occupancy}
        note={insights.occupancyNote}
      />
      <BookingDemand months={DUMMY_IBADAN_DEMAND} />
      <ReviewTrend months={insights.reviewTrend} />

      <aside className='flex gap-3 rounded-2xl bg-navy p-4 text-white md:p-5'>
        <span className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-primary'>
          <ShieldCheck className='size-4.5' strokeWidth={1.5} />
        </span>
        <div>
          <p className='text-sm md:text-base font-medium'>SpaceFinda insight</p>
          <p className='mt-1 text-xs md:text-sm leading-5 opacity-80'>{DUMMY_INSIGHT_TIP}</p>
        </div>
      </aside>
    </div>
  )
}
