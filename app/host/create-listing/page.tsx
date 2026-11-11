import { notFound } from 'next/navigation'
import CreateListingFlow from '@/components/create-listing/create-listing-flow'
import { getListing } from '@/lib/host/api'
import { listingToDraft, stepFromNumber } from '@/lib/host/mappers'

// ?draft=<id> resumes a saved draft at the step the host stopped on
export default async function Page({ searchParams }: { searchParams: Promise<{ draft?: string }> }) {
  const { draft: draftId } = await searchParams
  if (!draftId) return <CreateListingFlow />

  const listing = await getListing(draftId)
  if (!listing || listing.status !== 'draft') notFound()

  return <CreateListingFlow listingId={listing._id} initialDraft={listingToDraft(listing)} initialStep={stepFromNumber(listing.currentStep)} />
}
