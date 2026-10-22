import { CalendarCheck, CalendarClock, CalendarDays, CalendarX } from 'lucide-react'
import PageHeading from '@/components/dashboard/page-heading'
import BookingRow from '@/components/host/bookings/booking-row'
import { BOOKING_STATUS, BOOKING_TABS } from '@/components/host/bookings/booking-status'
import EmptyState from '@/components/host/empty-state'
import LinkTabs from '@/components/host/link-tabs'
import { DUMMY_HOST, DUMMY_HOST_BOOKINGS, HostBookingStatus } from '@/lib/dummy'

// Empty state per tab. Upcoming keeps the "no bookings yet" copy from the design while the listing isn't live
const EMPTY_STATES: Record<HostBookingStatus, { icon: typeof CalendarDays; title: string; description: string }> = {
  upcoming: {
    icon: CalendarDays,
    title: 'No upcoming bookings',
    description: "New bookings from renters will show here. You'll receive an instant notification for every new booking.",
  },
  active: {
    icon: CalendarClock,
    title: 'No active stays',
    description: 'When a renter checks in, their stay shows here until checkout, along with your payout and caution fee status.',
  },
  completed: {
    icon: CalendarCheck,
    title: 'No completed stays yet',
    description: 'Finished stays show here after checkout, with your payout, the caution fee outcome and any review from the renter.',
  },
  cancelled: {
    icon: CalendarX,
    title: 'No cancelled bookings',
    description: 'If a renter cancels, the booking shows here with the refund and payout outcome under your cancellation policy.',
  },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab } = await searchParams
  const active: HostBookingStatus = BOOKING_TABS.includes(tab as HostBookingStatus) ? (tab as HostBookingStatus) : 'upcoming'

  const bookings = DUMMY_HOST_BOOKINGS
  const visible = bookings.filter((b) => b.status === active)

  return (
    <div>
      <PageHeading className='mb-6' title='Bookings' description='All bookings across your listings. Click any booking to view full details.' />

      <LinkTabs
        basePath='/host/bookings'
        active={active}
        tabs={BOOKING_TABS.map((status) => ({
          value: status,
          label: BOOKING_STATUS[status].label,
          count: bookings.filter((b) => b.status === status).length,
        }))}
      />

      {visible.length === 0 ? (
        bookings.length === 0 && active === 'upcoming' ? (
          <EmptyState
            icon={CalendarDays}
            className='py-16'
            title='No bookings yet'
            description={`Once your ${DUMMY_HOST.setup.listingTitle} listing goes live, bookings from renters across Ibadan will appear here. You'll receive instant notifications for every new booking.`}
            action={{ label: 'Complete your listings', href: '/host/create-listing' }}
          />
        ) : (
          <EmptyState className='py-16' {...EMPTY_STATES[active]} />
        )
      ) : (
        <div className='divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white p-4 md:p-6'>
          {visible.map((booking) => (
            <BookingRow key={booking.ref} booking={booking} />
          ))}
        </div>
      )}
    </div>
  )
}
