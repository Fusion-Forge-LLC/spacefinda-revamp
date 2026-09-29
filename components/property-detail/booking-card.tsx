import { formatNaira } from '@/lib/utils'
import { Button } from '../ui/button'
import { Check } from 'lucide-react'
import { InfoCircle } from 'iconsax-reactjs'
import Link from "next/link"
import CheckInComponent from './check-in-component'
import BookingSummary from './booking-summary'
import BookingNote from './booking-note'

const amount = 120000

function BookingCard() {
    return (
        <aside className='py-5 pl-5 col-span-5 hidden md:block'>
            <div className='p-6 space-y-2 bg-white rounded-xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] outline-1 -outline-offset-1 gap-4 w-full'>
                <form action="" className='space-y-3 border-b border-b-text-Grey-Muted pb-4'>
                    <header className='space-y-3'>
                        <h4 className='text-Text-dark text-2xl font-["Inter"]'>
                            <span className="font-semibold">{formatNaira(amount)} /</span>
                            <span className="text-Text-body-text text-base font-normal font-['Geist'] leading-6">{" "}night</span>
                        </h4>
                        <p className="justify-start text-Text-body-text text-base font-normal font-['Geist'] leading-6">
                            Refundable caution fee of ₦10,000 applies
                        </p>
                    </header>

                    <CheckInComponent />                    
                    
                    <div className='flex items-center justify-center text-sm leading-[150%] text-[#888]'>
                        <Check color='#888' size={14}/>
                        <span>Your payment is held securely until check-in day</span>
                    </div>
                </form>

                <BookingSummary amount={amount} />

                <BookingNote />

                <p className='text-Body-Text text-center'>
                    Something feels off? <Link href='/report-lsting' className='text-primary underline'>Report this listings</Link>
                </p>
            </div> 
        </aside>
    )
}

export default BookingCard