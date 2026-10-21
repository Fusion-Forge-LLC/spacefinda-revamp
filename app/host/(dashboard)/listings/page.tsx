import DraftSetup from '@/components/host/listings/draft-setup'
import ListingsManager, { ListingsHeader } from '@/components/host/listings/listings-manager'
import { DUMMY_HOST_LISTINGS } from '@/lib/dummy'

export default function Page() {
  // A host whose only listing is an unfinished draft gets the setup view instead of the list
  if (!DUMMY_HOST_LISTINGS.some((l) => l.status !== 'draft')) {
    return (
      <div>
        <ListingsHeader>
          <p className='text-sm md:text-base text-Text-body-text'>Manage and publish your spaces.</p>
        </ListingsHeader>
        <DraftSetup />
      </div>
    )
  }

  return <ListingsManager initialListings={DUMMY_HOST_LISTINGS} />
}
