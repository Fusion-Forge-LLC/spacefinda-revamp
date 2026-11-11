import { notFound } from 'next/navigation'
import EditListing from '@/components/host/listings/edit-listing'
import { getListing } from '@/lib/host/api'
import { listingToDraft } from '@/lib/host/mappers'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const listing = await getListing(id)

  if (!listing) notFound()

  return <EditListing listing={listingToDraft(listing)} />
}
