import { cn, formatNaira } from '@/lib/utils'
import React from 'react'

function BookingSummary({amount, className}:{amount: number, className?: string}) {
    return (
        <ul className={cn(className, 'space-y-2.5')}>
            <li className='flex items-center justify-between leading-[150%]'>
                <span className='text-Body-Text'>{formatNaira(amount)} x 1 nights</span>
                <span className='text-Text-dark'>{formatNaira(amount)}</span>
            </li>
            <li className='flex items-center justify-between leading-[150%]'>
                <span className='text-Body-Text'>Caution fee</span>
                <span className='text-Text-dark'>{formatNaira(10000)}</span>
            </li>
            <li className='bg-[#E9E9E9] h-px' />
            <li className='flex items-center justify-between leading-[150%]'>
                <span className='text-Body-Text'>Total</span>
                <span className='text-Text-dark'>{formatNaira(130000)}</span>
            </li>
        </ul>
    )
}

export default BookingSummary