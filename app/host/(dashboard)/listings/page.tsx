import DraftSetup from '@/components/host/listings/draft-setup'
import ListingsManager, { ListingsHeader } from '@/components/host/listings/listings-manager'
import { getHostListings } from '@/lib/host/api'
import { toHostListing } from '@/lib/host/mappers'

export default async function Page() {
  const listings = (await getHostListings()).map(toHostListing)

  // A host with no listings, or only an unfinished draft, gets the setup view instead of the list
  if (!listings.some((l) => l.status !== 'draft') && listings.length <= 1) {
    return (
      <div>
        <ListingsHeader>
          <p className='text-sm md:text-base text-Text-body-text'>Manage and publish your spaces.</p>
        </ListingsHeader>
        <DraftSetup draft={listings[0]} />
      </div>
    )
  }

  return <ListingsManager initialListings={listings} />
}
