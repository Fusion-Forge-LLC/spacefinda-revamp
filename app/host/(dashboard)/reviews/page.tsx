import Link from 'next/link'
import { Star } from 'lucide-react'
import PageHeading from '@/components/dashboard/page-heading'
import EmptyState from '@/components/host/empty-state'
import RatingSummary from '@/components/host/reviews/rating-summary'
import ReviewCard from '@/components/host/reviews/review-card'
import { DUMMY_LISTING_REVIEWS, DUMMY_REVIEWED_LISTINGS } from '@/lib/dummy'
import { cn } from '@/lib/utils'

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

export default async function Page({ searchParams }: { searchParams: Promise<{ listing?: string }> }) {
  const { listing } = await searchParams
  const listings = DUMMY_REVIEWED_LISTINGS
  const selected = listings.find((l) => l.id === listing)

  const heading = (
    <PageHeading className='mb-6' title='Reviews' description='All reviews across your listings. Reply publicly to build trust with future renters.' />
  )

  if (listings.length === 0) {
    return (
      <div>
        {heading}
        <EmptyState
          icon={Star}
          className='py-16'
          title='No reviews yet'
          description='Renters can review your space after their stay is completed. Your rating and replies show on your listing and help future renters decide.'
        />
      </div>
    )
  }

  // "All listings" adds up the star counts of every listing
  const distribution = selected?.distribution ?? listings.reduce((sum, l) => sum.map((n, i) => n + l.distribution[i]), [0, 0, 0, 0, 0])
  const total = distribution.reduce((sum, n) => sum + n, 0)
  const caption = selected ? plural(total, 'review') : `${plural(total, 'review')} across ${plural(listings.length, 'listing')}`
  const reviews = selected ? DUMMY_LISTING_REVIEWS.filter((r) => r.listingId === selected.id) : DUMMY_LISTING_REVIEWS

  const filters = [{ id: undefined, label: 'All listings' }, ...listings]

  return (
    <div>
      {heading}

      <section className='rounded-2xl border border-gray-100 bg-white p-4 md:p-5'>
        <nav className='flex gap-2 overflow-x-auto pb-1'>
          {filters.map(({ id, label }) => {
            const isActive = id === selected?.id
            return (
              <Link
                key={label}
                href={id ? `/host/reviews?listing=${id}` : '/host/reviews'}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'shrink-0 rounded-full border px-3 py-1.5 text-xs md:text-sm whitespace-nowrap transition-colors',
                  isActive ? 'border-primary bg-primary text-white' : 'border-gray-100 text-Text-body-text hover:bg-gray-50'
                )}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <div className='mt-4 border-y border-gray-100 py-5'>
          <RatingSummary distribution={distribution} caption={caption} />
        </div>

        {reviews.length === 0 ? (
          <EmptyState icon={Star} title='No written reviews yet' description='Reviews renters write for this listing will show here.' />
        ) : (
          <div className='divide-y divide-gray-100 pt-5'>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
