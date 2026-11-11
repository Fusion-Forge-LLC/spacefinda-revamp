import { formatNaira } from '@/lib/utils'
import React from 'react'
import { MobileDrawer } from '../ui/drawer/mobile-drawer';
import { Button } from '../ui/button';
import CheckInComponent from './check-in-component';
import type { ApiApartment } from '@/lib/api/types';

function BookingMobile({ apartment }: { apartment: ApiApartment }) {
    return (
        <div className='md:hidden'>
            <p className='text-Body-Text text-center pb-6 border-b border-b-grey-200'>
                Something feels off? <a href={`mailto:support@spacefinda.com?subject=${encodeURIComponent(`Report listing ${apartment._id}`)}`} className='text-primary underline'>Report this listing</a>
            </p>
            <div className='space-y-2 px-4 pt-6'>
                <h4 className='text-Text-dark text-xl font-["Inter"]'>
                    <span className="font-semibold">{formatNaira(apartment.pricePerNight ?? 0)} /</span>
                    <span className="text-Text-body-text text-base font-normal font-['Geist'] leading-6">{" "}night</span>
                </h4>
                {!!apartment.cautionFee && (
                    <p className="justify-start text-Text-body-text text-base font-normal font-['Geist'] leading-6">
                        Refundable caution fee of {formatNaira(apartment.cautionFee)} applies
                    </p>
                )}

                <MobileDrawer 
                    title='Reserve your stay'
                    triggerBtn={
                        <Button className='w-full h-12 roundded-xl' size={"lg"}>
                            Book now
                        </Button>
                    }
                >
                    <div className='space-y-2'>
                        <span>Your dates</span>
                        <CheckInComponent apartment={apartment} />
                    </div>
                </MobileDrawer>
            </div>
        </div>
    )
}

export default BookingMobile