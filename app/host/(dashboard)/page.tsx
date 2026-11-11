import { CreditCard, TriangleAlert } from 'lucide-react'
import PageHeading from '@/components/dashboard/page-heading'
import { getBookingAmounts } from '@/components/host/bookings/booking-utils'
import AlertBanner from '@/components/host/overview/alert-banner'
import { ListingProgressBanner, SetupTasks, TipsCard } from '@/components/host/overview/getting-started'
import MyListings from '@/components/host/overview/my-listings'
import RecentActivity from '@/components/host/overview/recent-activity'
import StatCards from '@/components/host/overview/stat-cards'
import UpcomingCheckins from '@/components/host/overview/upcoming-checkins'
import StageSwitcher from '@/components/host/stage-switcher'
import type { HostStage } from '@/lib/dummy'
import { getHostStage } from '@/lib/host-stage'
import { getCurrentUser } from '@/lib/auth/session'
import { getBookingStats, getEarnings, getHostBookings, getHostListings, getOccupancy, getRatingSummary } from '@/lib/host/api'
import { draftHref, TOTAL_STEPS, toHostBooking, toHostListing } from '@/lib/host/mappers'
import { getPayoutMethods } from '@/lib/payout/api'
import { formatNaira } from '@/lib/utils'

const TIME_ZONE = 'Africa/Lagos'

// "Good morning" plus today's date, in Nigerian time
function getGreeting(now: Date) {
  const hour = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone: TIME_ZONE }).format(now))
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const date = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: TIME_ZONE }).format(now)
  return { greeting, date: date.replace(',', '') }
}

export default async function Page() {
  const [user, apiListings, upcoming, earnings, bookingStats, occupancy, ratings, payoutMethods] = await Promise.all([
    getCurrentUser(),
    getHostListings(),
    getHostBookings({ status: 'upcoming', limit: 5 }),
    getEarnings(),
    getBookingStats(),
    getOccupancy(),
    getRatingSummary(),
    getPayoutMethods(),
  ])
  const listings = apiListings.map(toHostListing)
  const upcomingBookings = upcoming.map((b) => toHostBooking(b))

  // No listings yet → new; nothing live yet → setup; otherwise live
  const realStage: HostStage = !listings.length ? 'new' : listings.some((l) => l.status === 'live' || l.status === 'paused') ? 'live' : 'setup'
  const { stage, isVerified, pendingDamageClaim: claim } = await getHostStage(realStage)
  const hasBank = payoutMethods.length > 0
  const name = user?.firstName || user?.name?.split(' ')[0] || 'there'

  // The most recently edited draft drives the "continue setup" prompts
  const draft = listings.find((l) => l.status === 'draft')
  const progress = draft && {
    listingTitle: draft.title,
    stepsComplete: Math.max((draft.draft?.step ?? 1) - 1, 0),
    totalSteps: draft.draft?.totalSteps ?? TOTAL_STEPS,
    href: draftHref(draft.id),
  }

  if (stage === 'new' || stage === 'setup') {
    return (
      <div className='flex flex-col gap-4 md:gap-6'>
        <PageHeading
          className='mb-0'
          title={`Welcome, ${name}`}
          description={stage === 'new' ? "Here's what's happening. Complete a few steps below to publish your first listing." : "Here's what's happening."}
        />
        {stage === 'setup' && progress && <ListingProgressBanner progress={progress} />}
        <SetupTasks includeListing={stage === 'new' || !progress} isVerified={isVerified} hasBank={hasBank} progress={progress} />
        <div className='grid items-start gap-4 md:gap-6 lg:grid-cols-2'>
          <UpcomingCheckins />
          <TipsCard />
        </div>
        <StageSwitcher active={stage} />
      </div>
    )
  }

  const hasAlerts = !!claim || !hasBank
  let heading = { title: `Welcome, ${name}`, description: 'Here is everything happening across your listings today' }
  if (hasAlerts) {
    const { greeting, date } = getGreeting(new Date())
    heading = { title: `${greeting}, ${name}`, description: `${date} · Here is everything happening across your listings today` }
  }

  const nextBooking = upcomingBookings[0]

  return (
    <div className='flex flex-col gap-4 md:gap-6'>
      <PageHeading className='mb-0' {...heading} />

      {claim && (
        <AlertBanner
          variant='danger'
          icon={TriangleAlert}
          title={`Damage claim window closing — ${claim.hoursRemaining} hours remaining`}
          description={`${claim.renter} checked out of ${claim.property} on ${claim.checkedOut}. You have until ${claim.deadline} to submit a damage claim. After that, the ${formatNaira(claim.cautionFee)} caution fee is returned to the renter automatically.`}
          action={{ label: 'Submit damage claim now', href: '/host/damage-claims/new' }}
        />
      )}
      {!hasBank && nextBooking && (
        <AlertBanner
          variant='info'
          icon={CreditCard}
          title='Add your bank account to receive payouts'
          description={`You have ${formatNaira(getBookingAmounts(nextBooking).payout)} due on ${nextBooking.payout.date} when ${nextBooking.renter.name.split(' ')[0]} checks in. Add your bank account now so SpaceFinda releases it automatically on check-in day.`}
          action={{ label: 'Add bank account', href: '/host/payout' }}
        />
      )}

      <StatCards earnings={earnings} bookings={bookingStats} occupancy={occupancy} ratings={ratings} />
      <div className='grid items-start gap-4 md:gap-6 lg:grid-cols-2'>
        <UpcomingCheckins bookings={upcomingBookings} />
        <RecentActivity />
      </div>
      <MyListings listings={listings} />
      <StageSwitcher active={stage} />
    </div>
  )
}
