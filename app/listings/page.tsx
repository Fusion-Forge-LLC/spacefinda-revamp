import Link from 'next/link'
import PropertyCard from '@/components/home/PropertyCard'
import Wrapper from '@/components/wrapper/wrapper'
import { searchApartments } from '@/lib/apartments/api'
import { toPropertyCard } from '@/lib/apartments/mappers'

type SearchParams = { city?: string; guests?: string; checkIn?: string; checkOut?: string; minPrice?: string; maxPrice?: string; page?: string }

const toNumber = (value?: string) => (value && !Number.isNaN(Number(value)) ? Number(value) : undefined)

// Filters come from the URL, e.g. /listings?city=Ibadan&guests=2&checkIn=2026-12-01&checkOut=2026-12-05
export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const page = Math.max(toNumber(params.page) ?? 1, 1)
  const { apartments, pagination } = await searchApartments({
    city: params.city,
    guests: toNumber(params.guests),
    minPrice: toNumber(params.minPrice),
    maxPrice: toNumber(params.maxPrice),
    // The API only filters by dates when both are given
    ...(params.checkIn && params.checkOut && { checkIn: params.checkIn, checkOut: params.checkOut }),
    page,
    limit: 12,
  })

  const pageHref = (n: number) => `/listings?${new URLSearchParams({ ...params, page: String(n) } as Record<string, string>)}`

  return (
    <main className='py-10 md:py-16'>
      <Wrapper className='max-md:px-4'>
        <h1 className='text-2xl md:text-3xl font-bold text-[#333333]'>{params.city ? `Spaces in ${params.city}` : 'All spaces'}</h1>
        <p className='mt-2 text-[#666666]'>
          {pagination.total} {pagination.total === 1 ? 'space' : 'spaces'} available. Every listing is reviewed and verified by SpaceFinda.
        </p>

        {apartments.length === 0 ? (
          <p className='mt-10 text-[#666666]'>No spaces match your search yet. Try different dates or another city.</p>
        ) : (
          <ul className='mt-8 flex flex-wrap gap-y-8 max-md:flex-col max-md:gap-6'>
            {apartments.map((apartment) => (
              <PropertyCard key={apartment._id} {...toPropertyCard(apartment)} />
            ))}
          </ul>
        )}

        {pagination.pages > 1 && (
          <nav className='mt-10 flex items-center justify-center gap-4 text-sm' aria-label='Pagination'>
            {page > 1 && (
              <Link href={pageHref(page - 1)} className='rounded-lg border border-gray-200 px-4 py-2 hover:bg-gray-50'>
                Previous
              </Link>
            )}
            <span className='text-[#666666]'>
              Page {page} of {pagination.pages}
            </span>
            {page < pagination.pages && (
              <Link href={pageHref(page + 1)} className='rounded-lg border border-gray-200 px-4 py-2 hover:bg-gray-50'>
                Next
              </Link>
            )}
          </nav>
        )}
      </Wrapper>
    </main>
  )
}
