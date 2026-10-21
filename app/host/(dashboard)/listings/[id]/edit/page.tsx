import { notFound } from 'next/navigation'
import EditListing from '@/components/host/listings/edit-listing'
import { DUMMY_HOST_LISTINGS, DUMMY_LISTING_DRAFT } from '@/lib/dummy'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const listing = DUMMY_HOST_LISTINGS.find((l) => l.id === id)

  if (!listing) notFound()

  // Every listing opens the same dummy draft until there's a listings API
  return <EditListing listing={{ ...DUMMY_LISTING_DRAFT, title: listing.title, price: listing.pricePerNight }} />
}
