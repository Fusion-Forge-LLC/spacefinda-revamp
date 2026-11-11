import { notFound } from 'next/navigation'
import PropertyGrid from '@/components/home/PropertyGrid'
import BookingCard from '@/components/property-detail/booking-card'
import BookingMobile from '@/components/property-detail/booking-mobile'
import Details from '@/components/property-detail/details'
import Header from '@/components/property-detail/header'
import PropertyGallery from '@/components/property-detail/images'
import Wrapper from '@/components/wrapper/wrapper'
import { getApartment, searchApartments } from '@/lib/apartments/api'
import { imageUrl, toPropertyCard } from '@/lib/apartments/mappers'

// The [slug] segment is the apartment's id
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const apartment = await getApartment(slug)
    if (!apartment) notFound()

    const city = apartment.address?.city
    const title = apartment.title ?? 'Untitled space'
    const images = (apartment.images ?? []).map(imageUrl).filter(Boolean)
    const { apartments: nearby } = await searchApartments({ city, limit: 9 })

    return (
        <div>
            <Header title={title} city={city} image={images[0] ?? ''} id={apartment._id} />
            <PropertyGallery images={images} title={title} id={apartment._id} />
            <main className="pb-8" >
                <Wrapper className='md:grid grid-cols-12 gap-5'>
                    <Details apartment={apartment} />
                    <BookingCard apartment={apartment} />
                </Wrapper>
                <PropertyGrid 
                    title="You might also like" 
                    subtitle={`Other verified spaces${city ? ` in ${city}` : ''}`} 
                    mb='mb-0'
                    properties={nearby.filter((a) => a._id !== apartment._id).slice(0, 8).map(toPropertyCard)}
                />
                <BookingMobile apartment={apartment} />
            </main>
        </div>
    )
}
