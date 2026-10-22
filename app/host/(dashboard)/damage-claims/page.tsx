import Link from 'next/link'
import { ChevronRight, ClipboardPlus, TriangleAlert } from 'lucide-react'
import PageHeading from '@/components/dashboard/page-heading'
import ClaimCard from '@/components/host/damage-claims/claim-card'
import EmptyState from '@/components/host/empty-state'
import LinkTabs from '@/components/host/link-tabs'
import { DUMMY_DAMAGE_CLAIMS } from '@/lib/dummy'

const TABS = ['active', 'raise', 'resolved'] as const
type Tab = (typeof TABS)[number]

export default async function Page({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab } = await searchParams
  const active: Tab = TABS.includes(tab as Tab) ? (tab as Tab) : 'active'

  const claims = DUMMY_DAMAGE_CLAIMS
  const open = claims.filter((c) => c.status === 'review')
  const resolved = claims.filter((c) => c.status !== 'review')
  const heading = (
    <PageHeading className='mb-6' title='Damage claims' description='Track active claims, view resolved outcomes, or raise a new claim against a booking.' />
  )

  if (claims.length === 0) {
    return (
      <div>
        {heading}
        <EmptyState
          icon={TriangleAlert}
          className='py-16'
          title='No damage claims yet'
          description='After every guest checkout, you have a 48-hour window to report any property damage. If no damage is reported, the caution fee is returned to the renter automatically.'
        />
      </div>
    )
  }

  const visible = active === 'active' ? open : resolved

  return (
    <div>
      {heading}
      <LinkTabs
        basePath='/host/damage-claims'
        active={active}
        tabs={[
          { value: 'active', label: 'Active', count: open.length },
          { value: 'raise', label: 'Raise a claim' },
          { value: 'resolved', label: 'Resolved', count: resolved.length },
        ]}
      />

      {active === 'raise' ? (
        <Link
          href='/host/damage-claims/new'
          className='flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 md:p-5 hover:bg-gray-50'
        >
          <div className='flex size-10 items-center justify-center rounded-lg bg-primary-containers text-primary'>
            <ClipboardPlus className='size-5' strokeWidth={1.5} />
          </div>
          <div className='flex-1'>
            <p className='text-sm md:text-base font-medium text-Text-dark'>Raise a new damage claim</p>
            <p className='mt-0.5 text-xs md:text-sm text-Text-body-text'>Report damage and submit evidence for review</p>
          </div>
          <ChevronRight className='size-5 text-Text-body-text' />
        </Link>
      ) : visible.length === 0 ? (
        <EmptyState
          icon={TriangleAlert}
          className='py-16'
          title={active === 'active' ? 'No active claims' : 'No resolved claims'}
          description={active === 'active' ? 'Claims you raise will show here while SpaceFinda reviews them.' : 'Claims SpaceFinda has decided on will show here.'}
        />
      ) : (
        <div className='flex flex-col gap-4'>
          {visible.map((claim) => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      )}
    </div>
  )
}
