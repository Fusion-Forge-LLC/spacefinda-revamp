import { cn, formatNaira } from '@/lib/utils'
import React from 'react'
import type { BookingQuote } from '@/lib/apartments/mappers'

function BookingSummary({ pricePerNight, quote, className }: { pricePerNight: number; quote: BookingQuote; className?: string }) {
    return (
        <ul className={cn(className, 'space-y-2.5')}>
            <li className='flex items-center justify-between leading-[150%]'>
                <span className='text-Body-Text'>{formatNaira(pricePerNight)} x {quote.nights} {quote.nights === 1 ? 'night' : 'nights'}</span>
                <span className='text-Text-dark'>{formatNaira(quote.subtotal)}</span>
            </li>
            {quote.discount > 0 && (
                <li className='flex items-center justify-between leading-[150%]'>
                    <span className='text-Body-Text'>Launch discount</span>
                    <span className='text-green-600'>- {formatNaira(quote.discount)}</span>
                </li>
            )}
            <li className='flex items-center justify-between leading-[150%]'>
                <span className='text-Body-Text'>Caution fee (refundable)</span>
                <span className='text-Text-dark'>{formatNaira(quote.cautionFee)}</span>
            </li>
            <li className='bg-[#E9E9E9] h-px' />
            <li className='flex items-center justify-between leading-[150%]'>
                <span className='text-Body-Text'>Total</span>
                <span className='text-Text-dark'>{formatNaira(quote.total)}</span>
            </li>
        </ul>
    )
}

export default BookingSummary
