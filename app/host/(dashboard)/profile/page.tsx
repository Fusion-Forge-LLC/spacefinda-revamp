import PageHeading from '@/components/dashboard/page-heading'
import InfoRow from '@/components/dashboard/personal-details/info-row'
import IdentityVerification from '@/components/host/profile/identity-verification'
import ProfileCard from '@/components/host/profile/profile-card'
import { getHostStage } from '@/lib/host-stage'
import { DUMMY_HOST, DUMMY_HOST_PROFILE, DUMMY_HOST_STATS } from '@/lib/dummy'

const p = DUMMY_HOST_PROFILE

const SECTIONS = [
  {
    title: 'Your name',
    description: 'Renters receive your first name only until a booking is confirmed.',
    rows: [{ label: 'Name', placeholder: 'Let us know what to call you', defaultValue: p.name }],
  },
  {
    title: 'Contact details',
    description: 'Changing your email or phone number requires a verification code to confirm the change.',
    rows: [
      { label: 'Email address', placeholder: 'you@example.com', type: 'email', defaultValue: p.email },
      { label: 'Phone number', placeholder: '+234 xxx xxx xxxx', type: 'tel', defaultValue: p.phone },
    ],
  },
  {
    title: 'Additional information',
    description: 'Optional. Helps build trust with renters and enriches your profile.',
    rows: [
      { label: 'Date of birth', placeholder: 'Fill the day you were born', type: 'date', defaultValue: p.dateOfBirth },
      { label: 'Residential address', placeholder: 'Let us know where you live', defaultValue: p.address },
    ],
  },
]

export default async function Page() {
  const { hasLiveListing, isVerified } = await getHostStage()
  const stats = [
    { label: 'Listing', value: hasLiveListing ? DUMMY_HOST_STATS.listingCount : 0 },
    { label: 'Bookings', value: hasLiveListing ? DUMMY_HOST_STATS.totalBookings : 0 },
    { label: 'Rating', value: hasLiveListing ? DUMMY_HOST_STATS.averageRating : '—' },
  ]

  return (
    <div className='max-w-5xl'>
      <PageHeading title='Profile' description='Manage your public owner profile.' />

      <div className='flex flex-col gap-6 md:flex-row md:items-start md:gap-10'>
        <div className='w-full md:w-60 md:shrink-0'>
          <ProfileCard name={p.name} avatar={DUMMY_HOST.avatar} location={p.location} stats={stats} />
        </div>

        <div className='min-w-0 flex-1'>
          <h2 className='text-lg md:text-xl font-medium text-Text-dark'>Personal information</h2>
          <p className='mt-1 text-sm text-Text-body-text'>Your private account information. Used for bookings and identity verification.</p>

          {SECTIONS.map((section) => (
            <section key={section.title} className='border-b border-light-Grey pt-6'>
              <h3 className='text-base md:text-lg font-medium text-Text-dark'>{section.title}</h3>
              <p className='mt-1 text-sm text-Text-body-text'>{section.description}</p>
              {section.rows.map((row) => (
                <InfoRow key={row.label} {...row} />
              ))}
            </section>
          ))}

          <div className='mt-8'>
            <IdentityVerification isVerified={isVerified} />
          </div>
        </div>
      </div>
    </div>
  )
}
