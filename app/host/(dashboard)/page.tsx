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
import { DUMMY_HOST, DUMMY_HOST_BOOKINGS } from '@/lib/dummy'
import { getHostStage } from '@/lib/host-stage'
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
  const { stage, isVerified, hasBank, pendingDamageClaim: claim } = await getHostStage()
  const { name } = DUMMY_HOST

  if (stage === 'new' || stage === 'setup') {
    return (
      <div className='flex flex-col gap-4 md:gap-6'>
        <PageHeading
          className='mb-0'
          title={`Welcome, ${name}`}
          description={stage === 'new' ? "Here's what's happening. Complete a few steps below to publish your first listing." : "Here's what's happening."}
        />
        {stage === 'setup' && <ListingProgressBanner />}
        <SetupTasks includeListing={stage === 'new'} isVerified={isVerified} hasBank={hasBank} />
        <div className='grid items-start gap-4 md:gap-6 lg:grid-cols-2'>
          <UpcomingCheckins empty />
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

  const nextBooking = DUMMY_HOST_BOOKINGS.find((b) => b.status === 'upcoming')

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

      <StatCards />
      <div className='grid items-start gap-4 md:gap-6 lg:grid-cols-2'>
        <UpcomingCheckins />
        <RecentActivity />
      </div>
      <MyListings />
      <StageSwitcher active={stage} />
    </div>
  )
}
