import PropertyGrid from '@/components/home/PropertyGrid'
import BookingCard from '@/components/property-detail/booking-card'
import BookingMobile from '@/components/property-detail/booking-mobile'
import Details from '@/components/property-detail/details'
import Header from '@/components/property-detail/header'
import PropertyGallery from '@/components/property-detail/images'
import Wrapper from '@/components/wrapper/wrapper'
import React from 'react'

function Page() {
    return (
        <div>
            <Header />
            <PropertyGallery />
            <main className="pb-8" >
                <Wrapper className='md:grid grid-cols-12 gap-5'>
                    <Details />
                    <BookingCard />
                </Wrapper>
                <PropertyGrid 
                    title="You might also like" 
                    subtitle="Other verified spaces in Ibadan" 
                    mb='mb-0'
                />
                <BookingMobile />
            </main>
        </div>
    )
}

export default Page