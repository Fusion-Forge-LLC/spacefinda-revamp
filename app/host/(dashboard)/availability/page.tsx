import { Info } from 'lucide-react'
import PageHeading from '@/components/dashboard/page-heading'
import AvailabilityCalendar from '@/components/host/availability/availability-calendar'
import ListingSelect from '@/components/host/availability/listing-select'
import PricingRules from '@/components/host/availability/pricing-rules'
import { DUMMY_HOST_LISTINGS } from '@/lib/dummy'

export default function Page() {
  const isLive = DUMMY_HOST_LISTINGS.some((l) => l.status === 'live')

  return (
    <div className='flex flex-col gap-4 md:gap-6'>
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <PageHeading className='mb-0' title='Availability' description='Tap a date to block or unblock it. Booked dates cannot be changed while a booking is active.' />
        {isLive && <ListingSelect />}
      </div>

      {!isLive && (
        <p className='-mt-4 flex gap-2 rounded-lg border border-primary/40 bg-primary-containers px-3 py-2.5 text-xs md:text-sm text-primary'>
          <Info className='mt-0.5 size-3.5 shrink-0' />
          Your listing isn&apos;t live yet. Once published, this calendar will show your availability and bookings. You can also block dates to prevent reservations.
        </p>
      )}

      <AvailabilityCalendar isLive={isLive} />
      {isLive && <PricingRules />}
    </div>
  )
}
