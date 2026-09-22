import { formatNaira } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const amount = 120000;

function BookingMobile() {
    return (
        <div className='md:hidden'>
            <p className='text-Body-Text text-center pb-6 border-b border-b-grey-200'>
                Something feels off? <Link href='/report-lsting' className='text-primary underline'>Report this listings</Link>
            </p>
            <div className='space-y-2 px-4 pt-6'>
                <h4 className='text-Text-dark text-xl font-["Inter"]'>
                    <span className="font-semibold">{formatNaira(amount)} /</span>
                    <span className="text-Text-body-text text-base font-normal font-['Geist'] leading-6">{" "}night</span>
                </h4>
                <p className="justify-start text-Text-body-text text-base font-normal font-['Geist'] leading-6">
                    Refundable caution fee of ₦10,000 applies
                </p>
            </div>
        </div>
    )
}

export default BookingMobile